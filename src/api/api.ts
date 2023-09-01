import * as Routers from '@/api/routers';

import { MeasurePerformanceMiddleware, RequestUIDMiddleware, RestStandardizeMiddleware } from '@/api/middleware';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import type Bot from '@/bot/bot';
import type { Express } from 'express';
import type { Logger } from '@/utils/logger';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { config } from '@/utils/config';
import cors from 'cors';
import express from 'express';
import { expressMiddleware as graphql } from '@apollo/server/express4';
import http from 'http';
import { schema } from '@/api/schemas';

export default class API {
    private readonly logger: Logger;
    private readonly bot: Bot;
    private readonly app: Express;
    private readonly apollo: ApolloServer;

    private server?: Server;

    constructor({ logger, bot }: { logger: Logger; bot: Bot }) {
        this.bot = bot;
        this.logger = logger;
        const middlewaresLogger = this.logger.getSubLogger({ name: 'Middlewares' });

        this.logger.debug(`Starting the API subsystem...`);
        this.app = express()
            .use(express.urlencoded({ extended: true }))
            .use(bodyParser.json())
            .use(
                MeasurePerformanceMiddleware(
                    middlewaresLogger.getSubLogger({ name: MeasurePerformanceMiddleware.name })
                )
            )
            .use(RequestUIDMiddleware(middlewaresLogger.getSubLogger({ name: RequestUIDMiddleware.name })))
            .use(RestStandardizeMiddleware(middlewaresLogger.getSubLogger({ name: RestStandardizeMiddleware.name })));

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

            .use('/', (req, res, next) => {
                if (req.path !== '/') return next();

                return res.status(200).json({
                    message: 'nordy',
                    github: 'https://github.com/NordcomInc/nordy/',
                    documentation: 'https://docs.nordy.nordcom.io/',
                    graphql: `${req.protocol}://${req.get('host')}${config.api.graphql.route}`
                });
            })
            .use('/heartbeat', (req, res) => res.status(200).json({}));

        this.logger.debug(`Configuring graphql routes...`);
        await this.apollo.start();
        this.app.use(config.api.graphql.route, graphql(this.apollo));

        this.logger.debug(`Configuring routers...`);
        const routersLogger = this.logger.getSubLogger({ name: 'Routers' });
        const routers = await Promise.all(
            Object.values(Routers).map((router) =>
                router({ logger: routersLogger.getSubLogger({ name: router.name }) })
            )
        );
        routers.forEach((router) => this.app.use(router));

        this.logger.debug(`Configuring error routes...`);
        this.app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));
    }

    public async listen() {
        this.server = this.app.listen(config.api.port);
        this.logger.info(`API started on port ${config.api.port}!`);
    }

    public async destroy() {
        await this.apollo.stop();
        this.server?.close();
    }
}
