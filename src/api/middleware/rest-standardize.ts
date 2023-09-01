import type { NextFunction, Request, Response } from 'express';

import { Logger } from '@/utils/logger';

export const RestStandardizeMiddleware = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const builtin = res.json;

    try {
        res.json = ((data: any) => {
            (async () => {
                let object: {} = {
                    status: res.statusCode
                };

                if (data) {
                    // Handle promises
                    if (data instanceof Promise) data = await data;

                    object = {
                        ...object,
                        data
                    };
                }

                res.json = builtin;
                return builtin.call(res, object);
            })();
        }) as any;
    } catch (error) {
        next(error);
    }

    next();
};
