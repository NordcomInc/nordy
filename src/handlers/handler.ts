import type { Client, Interaction } from 'discord.js';

export type HandlerRegisterProps = { client: Client };
export type HandlerHandleProps = { interaction: Interaction };

export abstract class Handler {
    register?({ client }: HandlerRegisterProps): Promise<void>;
    handle?({ interaction }: HandlerHandleProps): Promise<void>;
}
