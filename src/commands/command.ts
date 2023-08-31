import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type CommandHandleCommandProps = { interaction: CommandInteraction };

export abstract class Command {
    abstract enabled(): boolean;

    abstract data(): SlashCommandBuilder[];

    abstract handle({ interaction }: CommandHandleCommandProps): Promise<void>;
}
