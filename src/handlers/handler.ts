import type { Client, Interaction } from 'discord.js';

import type { Logger } from 'tslog';

export type HandlerConstructorProps = { logger: Logger<any> };
export type HandlerRegisterProps = { client: Client };
export type HandlerHandleProps = { interaction: Interaction };

export abstract class Handler {
    constructor({ logger }: HandlerConstructorProps) {}
    register?({ client }: HandlerRegisterProps): Promise<void>;
    handle?({ interaction }: HandlerHandleProps): Promise<void>;
}
