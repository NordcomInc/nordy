import type API from '@/api/api';
import { Logger } from '@/utils/logger';
import { Router } from 'express';
import { getRegisteredRoutes } from '@/utils/express';

export const DebugRouter = async ({ logger, api }: { logger: Logger; api: API }) => {
    const router = Router({});
    logger.trace(`Configuring DebugRouter routes...`);

    router.route('/').get((req, res) =>
        res.status(200).json({
            uptime: process.uptime(),
            bot: {
                ready: api.getBot().isReady(),
                servers: api.getBot().guilds.cache.map((guild) => guild.name)
            },
            api: {
                routes: getRegisteredRoutes(api.getApp()._router)
            }
        })
    );

    // Wrap all routes inside of a /debug route
    return Router({}).use('/debug', router);
};
