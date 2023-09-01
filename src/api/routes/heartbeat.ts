import type { NextFunction, Request, Response } from 'express';

import type { Logger } from '@/utils/logger';
import { Router } from 'express';

const HeartbeatRoute = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({});
};

export const HeartbeatRoutes = ['/heartbeat', '/status'];
export const HeartbeatRouteMethods = ['get', 'post'];

// Isn't really a router, more like a quick and dirty way to show the HeartbeatRoute on multiple paths.
export const CommonHeartbeatRouter = async ({ logger }: { logger: Logger }) => {
    const router = Router({});

    HeartbeatRoutes.map((route) =>
        HeartbeatRouteMethods.map((method) => (router as any)[method](route, HeartbeatRoute(logger)))
    );

    return router;
};

export default HeartbeatRoute;
