import Discord, { ActivityType, Events, GatewayIntentBits, Partials } from 'discord.js';

import { DISCORD_TOKEN } from './utils/config';
import dotenv from 'dotenv';

dotenv.config();

const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once(Events.ClientReady, () => {
    if (!client.user) return;

    client.user.setPresence({
        status: 'online',
        activities: [
            {
                type: ActivityType.Custom,
                name: "I'm a bot! beep boop"
            }
        ]
    });
});

client.login(DISCORD_TOKEN);
