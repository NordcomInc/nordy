import { Logger } from '@/utils/logger';
import { Router } from 'express';

export const AuthRouter = async ({ logger }: { logger: Logger }) => {
    const router = Router({});
    logger.trace(`Configuring AuthRouter routes...`);

    router.use('/', (req, res) => res.status(200).json({ message: 'todo' }));

    // Wrap all routes inside of an /auth route
    return Router({}).use('/auth', router);
};
