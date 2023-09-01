import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import type { Logger } from '@/utils/logger';

export type CommandConstructorProps = { logger: Logger };
export type CommandHandleCommandProps = { interaction: CommandInteraction };

export abstract class Command {
    constructor({ logger }: CommandConstructorProps) {}
    abstract enabled(): boolean;
    abstract data(): SlashCommandBuilder[];
    abstract handle({ interaction }: CommandHandleCommandProps): Promise<void>;
}
