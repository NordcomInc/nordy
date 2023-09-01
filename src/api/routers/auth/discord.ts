import type API from '@/api/api';
import { Logger } from '@/utils/logger';
import { Router } from 'express';

export const DiscordRouter = async ({ logger, api }: { logger: Logger; api: API }) => {
    const router = Router({});
    logger.trace(`Configuring Discord routes...`);

    router.route('/callback').get((req, res) => res.status(200).json({ message: 'todo' }));

    // Wrap all routes inside of an /auth route
    return Router({}).use('/discord', router);
};
