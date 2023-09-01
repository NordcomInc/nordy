import type API from '@/api/api';
import { DiscordRouter } from '@/api/routers/auth/discord';
import { Logger } from '@/utils/logger';
import { Router } from 'express';

export const AuthRouter = async ({ logger, api }: { logger: Logger; api: API }) => {
    const router = Router({});
    logger.trace(`Configuring AuthRouter routes...`);

    router.use(
        await DiscordRouter({
            logger: logger.getSubLogger({ name: DiscordRouter.name }),
            api
        })
    );

    // Wrap all routes inside of an /auth route
    return Router({}).use('/auth', router);
};
