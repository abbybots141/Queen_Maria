let antiCallMessage = process.env.ANTICALL_MESSAGE || `
Hii this is Queen_Maria, a Personal Assistant!!

Sorry for now, we cannot receive calls, whether in a group or personal. 
If you need help or request features, please chat with the owner.

Powered by Queen_Maria Chatbot
`;

let antiCallCountries = [];
let antiCallUsers = {};
let bots = false;

const { smd, send, bot_ } = require('./lib'); // Adjust the path to your actual file structure

// Command to enable or disable the anti-call feature
smd({ 
    pattern: 'anticall', 
    desc: 'Detects calls and decline them.', 
    category: 'owner', 
    use: '*anticall <on | off>', 
    filename: __filename 
}, async (message, command) => {
    const userId = message.user;
    let botConfig = await bot_.findOne({ id: 'bot_' + userId }) || await bot_.findOne({ id: 'bot_' + userId });

    const commandLower = command ? command.toLowerCase().trim() : '';
    if (commandLower === 'off' || commandLower === 'disable') {
        if (botConfig.anticall === 'false') {
            return await message.send('*anticall Already Disabled In Current Chat!*');
        }
        await bot_.updateOne({ id: 'bot_' + userId }, { anticall: 'false' });
        return await message.send('*anticall Disable Successfully!*');
    } else {
        if (!command) {
            return await message.send(`Current status: ${botConfig.anticall === 'false' ? 'Disabled' : 'Enabled'}`);
        }
        let countries = commandLower === 'all' ? 'all' : command ? command.split(',').map(Number).filter(num => !isNaN(num)).join(',') : '';
        
        if (!countries) {
            return await message.send('*Please provide a country code to block calls*\n*Example: anticall all,212,91,231*');
        } else {
            await bot_.updateOne({ id: 'bot_' + userId }, { anticall: countries });
            return await message.send(`*anticall Successfully set to "${countries}"*`);
        }
    }
});

// Call event handler
smd({ call: 'call' }, async callMessage => {
    try {
        if (!bots) {
            bots = await bot_.findOne({ id: 'bot_' + callMessage.user });
        }
        if (callMessage.isGroup || !bots || !bots.anticall || bots.anticall === 'false') return;

        if (!antiCallCountries || !antiCallCountries[0]) {
            antiCallCountries = bots.anticall?.split(',') || [];
            antiCallCountries = antiCallCountries.filter(code => code.trim() !== '');
        }
        
        let userCountryCode = callMessage.from?.countryCode || '';
        let shouldDecline = antiCallCountries.includes(userCountryCode) || antiCallCountries.includes('all');
        
        if (shouldDecline) {
            if (!antiCallUsers[callMessage.from]) {
                antiCallUsers[callMessage.from] = { warn: 0 };
            }
            if (antiCallUsers[callMessage.from].warn < 2) {
                await callMessage.send(antiCallMessage);
                antiCallUsers[callMessage.from].warn++;
                await callMessage.send(`Warning #${antiCallUsers[callMessage.from].warn} for user @${callMessage.from}`);
            }
            await callMessage.reject();
        }
    } catch (error) {
        console.error(error);
    }
});