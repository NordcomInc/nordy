import * as Handlers from '@/handlers';

import Discord, { ActivityType, Client, Events, GatewayIntentBits, Partials } from 'discord.js';

import { DISCORD_TOKEN } from '@/utils/config';
import type { Interaction } from 'discord.js';
import type { Handler } from '@/handlers/handler';
import type { Logger } from 'tslog';

const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.login(DISCORD_TOKEN);

export default class Nordy extends Client {
    private readonly logger: Logger<any>;
    private handlers: Handler[] = [];

    constructor({ logger }: { logger: Logger<any> }) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions
            ],
            partials: [Partials.User, Partials.Message, Partials.Reaction],
            allowedMentions: {
                repliedUser: false
            },
            closeTimeout: 20000
        });
        this.logger = logger;

        this.logger.debug(`Initializing Nordy...`);

        this.on(
            Events.ClientReady,
            (() => {
                if (!this.user) {
                    this.logger.warn('Client ready event fired but user is undefined');
                    return;
                }

                this.handlers.forEach((handler) => handler.register?.({ client }));
                this.logger.debug(`Registered ${this.handlers.length} handler(s)!`);

                this.user.setPresence({
                    status: 'online',
                    activities: [
                        {
                            type: ActivityType.Custom,
                            name: "I'm a bot! beep boop"
                        }
                    ]
                });

                this.logger.info(`Authenticated as "@${this.user.tag}" and ready!`);
            }).bind(this)
        );

        this.on(
            Events.Error,
            ((error: any) => {
                this.logger.error(error);
            }).bind(this)
        );

        this.on(
            Events.InteractionCreate,
            (async (interaction: Interaction) => {
                this.handlers.forEach((handler) => handler.handle?.({ interaction }));
            }).bind(this)
        );
    }

    public async initializeHandlers() {
        this.handlers = Object.values(Handlers).map(
            (Handler) => new Handler({ logger: this.logger.getSubLogger({ name: Handler.name }) })
        );
        this.logger.trace(`Initialized ${this.handlers.length} handler(s)!`);
    }

    public override async login(): Promise<string> {
        super.login(DISCORD_TOKEN);
        return ''; // We don't want to return the token.
    }

    public getHandlers(): Handler[] {
        return this.handlers;
    }
}
