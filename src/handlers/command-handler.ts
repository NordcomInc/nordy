import * as Commands from '../commands/index';

import type { HandlerHandleProps, HandlerRegisterProps } from './handler';

import { Command } from 'src/commands/command';
import { Handler } from './handler';
import { InteractionType } from 'discord.js';

export class CommandHandler extends Handler {
    private readonly commands: Map<string[], Command>;

    private getKeyFromCommandName(commandName: string): string[] {
        for (const [names, command] of this.commands.entries()) {
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

                    return [data.map((entry) => entry.name), command];
                })
        );
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
        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                await this.commands.get(this.getKeyFromCommandName(interaction.commandName))!.handle({ interaction });
                break;
            default:
                // TODO
                break;
        }
    }
}
