import { SlashCommandBuilder } from 'discord.js';
import { Command } from './command';
import type { CommandHandleCommandProps } from './command';

export class AboutCommand extends Command {
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
