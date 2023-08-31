import * as Handlers from './handlers';

import Discord, { ActivityType, Events, GatewayIntentBits, Partials } from 'discord.js';

import { DISCORD_TOKEN } from './utils/config';
import type { Interaction } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const handlers = Object.values(Handlers).map((Handler) => new Handler());

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

    handlers.forEach((handler) => handler.register?.({ client }));
});

client.on(Events.Error, (error) => {
    // FIXME: Use a real logger.
    console.error(error);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    handlers.forEach((handler) => handler.handle?.({ interaction }));
});

client.login(DISCORD_TOKEN);
