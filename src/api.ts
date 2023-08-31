import type { Express } from 'express';
import type { Logger } from 'tslog';
import type Nordy from './nordy';
import { Server } from 'http';
import express from 'express';

export default class API {
    private readonly logger: Logger<any>;
    private readonly nordy: Nordy;
    private readonly app: Express;

    private server?: Server;

    constructor({ logger, nordy }: { logger: Logger<any>; nordy: Nordy }) {
        this.nordy = nordy;
        this.logger = logger;

        this.logger.debug(`Initializing API...`);
        this.app = express();

        this.logger.trace(`Configuring routes...`);
        this.app.use(express.json()).use(express.urlencoded({ extended: true }));
    }

    async start({ port }: { port: number }) {
        this.server = this.app.listen(port);
        this.logger.info(`API started on port ${port}!`);
    }

    async destroy() {
        this.server?.close();
    }
}
