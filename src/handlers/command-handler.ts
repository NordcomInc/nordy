import * as Commands from '../commands/index';

import type { HandlerHandleProps, HandlerRegisterProps } from './handler';

import { Command } from '../commands/command';
import { Handler } from './handler';
import { InteractionType } from 'discord.js';
import logger from '../utils/logger';

export class CommandHandler extends Handler {
    private readonly commands: Map<string[], Command>;

    private getKeyFromCommandName(commandName: string): string[] {
        for (const [names] of this.commands.entries()) {
            for (const name of names) {
                if (name.toLowerCase() !== commandName.toLowerCase()) continue;

                return names;
            }
        }

        throw new Error('Command not found');
    }

    constructor() {
        super();

        this.commands = new Map(
            Object.values(Commands)
                .map((Command) => new Command())
                .filter((command) => command.enabled())
                .map((command) => {
                    const data = command.data();
                    const variants = data.map((variant) => variant.name);

                    logger.trace(
                        `Registering command "${command.constructor.name}", variants: "${variants.join(', ')}"`
                    );

                    return [variants, command];
                })
        );

        logger.debug(`Registered ${this.commands.size} command(s)`);
    }

    async register({ client }: HandlerRegisterProps): Promise<void> {
        if (!client.application) throw new Error('Client application is not available');

        await client.application.commands.set(
            Array.from(this.commands.values())
                .map((command) => command.data())
                .flat()
        );
    }

    async handle({ interaction }: HandlerHandleProps): Promise<void> {
        logger.trace(
            `Handling interaction of type "${InteractionType[interaction.type]}" from "@${interaction.user.tag}"`
        );

        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                await this.commands.get(this.getKeyFromCommandName(interaction.commandName))!.handle({ interaction });
                break;
            default:
                logger.debug(`Unhandled interaction type: ${interaction.type}`);
                break;
        }
    }
}
