import type { NextFunction, Request, Response } from 'express';

import { Logger } from '@/utils/logger';

export const MeasurePerformanceMiddleware = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const builtin = res.json;

    try {
        res.json = ((data: any) => {
            res.json = builtin;
            return builtin.call(res, {
                ...(data || {}),

                metrics: {
                    ...((req.id && { request: req.id }) || {}),
                    elapsed: performance.now() - start
                }
            });
        }) as any;
    } catch (error) {
        return next(error);
    }

    return next();
};
