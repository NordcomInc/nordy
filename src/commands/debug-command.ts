import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/command';
import type { CommandConstructorProps, CommandHandleCommandProps } from '@/commands/command';
import { config } from '@/utils/config';
import type { Logger } from '@/utils/logger';

export class DebugCommand extends Command {
    private readonly logger: Logger;

    constructor({ logger }: CommandConstructorProps) {
        super({ logger });
        this.logger = logger;

        this.logger.debug(`Initializing DebugCommand...`);
    }

    override enabled() {
        return !config.production;
    }

    override data() {
        return [new SlashCommandBuilder().setName('debug').setDescription('Print debug info')];
    }

    override async handle({ interaction }: CommandHandleCommandProps) {
        await interaction.reply({
            content: 'Stub, TODO: Print whatever useful debug info here',
            ephemeral: true
        });
    }
}
