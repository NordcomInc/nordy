import type { Express } from 'express';
import type { Logger } from 'tslog';
import type Nordy from './nordy';
import { Server } from 'http';
import express from 'express';

export default class Admin {
    private readonly logger: Logger<any>;
    private readonly nordy: Nordy;
    private readonly app: Express;

    private server?: Server;

    constructor({ logger, nordy }: { logger: Logger<any>; nordy: Nordy }) {
        this.nordy = nordy;
        this.logger = logger;

        this.logger.debug(`Initializing Admin...`);
        this.app = express();

        this.logger.trace(`Configuring routes...`);
        this.app
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .use(express.static('dashboard'));
    }

    async start({ port }: { port: number }) {
        this.server = this.app.listen(port);
        this.logger.info(`Admin started on port ${port}!`);
    }

    async destroy() {
        this.server?.close();
    }
}
