import { SlashCommandBuilder } from 'discord.js';
import { Command } from './command';
import type { CommandConstructorProps, CommandHandleCommandProps } from './command';
import type { Logger } from 'tslog';

export class AboutCommand extends Command {
    private readonly logger: Logger<any>;

    constructor({ logger }: CommandConstructorProps) {
        super({ logger });
        this.logger = logger;

        this.logger.debug(`Initializing AboutCommand...`);
    }

    override enabled() {
        return true;
    }

    override data() {
        return [new SlashCommandBuilder().setName('about').setDescription('Learn more about nordy')];
    }

    override async handle({ interaction }: CommandHandleCommandProps) {
        await interaction.reply({
            content: 'Hello world!',
            ephemeral: true
        });
    }
}
