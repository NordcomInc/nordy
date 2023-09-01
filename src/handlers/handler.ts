import type { Client, Interaction } from 'discord.js';

import type { Logger } from '@/utils/logger';

export type HandlerConstructorProps = { logger: Logger };
export type HandlerRegisterProps = { client: Client };
export type HandlerHandleProps = { interaction: Interaction };

export abstract class Handler {
    constructor({ logger }: HandlerConstructorProps) {}
    register?({ client }: HandlerRegisterProps): Promise<void>;
    handle?({ interaction }: HandlerHandleProps): Promise<void>;
}
