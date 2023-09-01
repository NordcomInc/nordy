import type { Express } from 'express';
import type { Logger } from 'tslog';
import type Nordy from '@/nordy';
import { Server } from 'http';
import express from 'express';
import { createHandler as graphql } from 'graphql-http/lib/use/express';
import { schema } from '@/api/schema';

export default class API {
    private readonly logger: Logger<any>;
    private readonly nordy: Nordy;
    private readonly app: Express;

    private server?: Server;

    constructor({ logger, nordy }: { logger: Logger<any>; nordy: Nordy }) {
        this.nordy = nordy;
        this.logger = logger;

        this.logger.debug(`Initializing API...`);
        this.app = express().use(express.urlencoded({ extended: true }));

        this.logger.trace(`Configuring routes...`);
        this.app
            .use(express.json())
            .use('/', (req, res, next) => {
                if (req.path !== '/') return next();

                return res.status(200).json({
                    message: 'nordy'
                });
            })
            .use('/heartbeat', (req, res) => res.status(200).json({ status: 'ok' }));

        this.logger.trace(`Configuring graphql...`);
        this.app.use('/graphql', graphql({ schema }));

        this.logger.trace(`Configuring error routes...`);
        this.app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));
    }

    async start({ port }: { port: number }) {
        this.server = this.app.listen(port);
        this.logger.info(`API started on port ${port}!`);
    }

    async destroy() {
        this.server?.close();
    }
}
