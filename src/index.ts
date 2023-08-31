import * as Handlers from './handlers';

import Discord, { ActivityType, Events, GatewayIntentBits, Partials } from 'discord.js';

import { DISCORD_TOKEN } from './utils/config';
import type { Interaction } from 'discord.js';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

const handlers = Object.values(Handlers).map((Handler) => new Handler());

const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once(Events.ClientReady, () => {
    if (!client.user) throw new Error('Client user is undefined!');

    handlers.forEach((handler) => handler.register?.({ client }));
    logger.debug(`Registered ${handlers.length} handler(s)`);

    client.user.setPresence({
        status: 'online',
        activities: [
            {
                type: ActivityType.Custom,
                name: "I'm a bot! beep boop"
            }
        ]
    });

    logger.info(`Authenticated as "@${client.user.tag}" and ready!`);
});

client.on(Events.Error, (error) => {
    logger.error(error);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    handlers.forEach((handler) => handler.handle?.({ interaction }));
});

client.login(DISCORD_TOKEN);
