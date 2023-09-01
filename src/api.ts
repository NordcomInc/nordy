import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import type { Express } from 'express';
import type { Logger } from 'tslog';
import type Nordy from '@/nordy';
import { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { expressMiddleware as graphql } from '@apollo/server/express4';
import http from 'http';
import { schema } from '@/api/schema';

export default class API {
    private readonly logger: Logger<any>;
    private readonly nordy: Nordy;
    private readonly app: Express;
    private readonly apollo: ApolloServer;

    private server?: Server;

    constructor({ logger, nordy }: { logger: Logger<any>; nordy: Nordy }) {
        this.nordy = nordy;
        this.logger = logger;

        this.logger.debug(`Initializing API...`);
        this.app = express().use(express.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);

        this.logger.debug(`Initializing apollo...`);
        this.apollo = new ApolloServer({
            schema: schema,
            plugins: [ApolloServerPluginInlineTrace({}), ApolloServerPluginDrainHttpServer({ httpServer: this.server })]
        });
    }

    public async initializeRoutes() {
        this.logger.trace(`Initializing routes...`);
        this.app
            .use(cors())
            .use(bodyParser.json())
            .use('/', (req, res, next) => {
                if (req.path !== '/') return next();

                return res.status(200).json({
                    message: 'nordy'
                });
            })
            .use('/heartbeat', (req, res) => res.status(200).json({ status: 200 }));

        this.logger.trace(`Configuring graphql routes...`);
        await this.apollo.start();
        this.app.use('/graphql', graphql(this.apollo));

        this.logger.trace(`Configuring error routes...`);
        this.app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));
    }

    public async start({ port }: { port: number }) {
        this.server = this.app.listen(port);
        this.logger.info(`API started on port ${port}!`);
    }

    public async destroy() {
        await this.apollo.stop();
        this.server?.close();
    }
}
