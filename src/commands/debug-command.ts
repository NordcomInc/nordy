import { SlashCommandBuilder } from 'discord.js';
import { Command } from './command';
import type { CommandHandleCommandProps } from './command';

export class DebugCommand extends Command {
    override enabled() {
        return process.env.NODE_ENV !== 'production';
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
