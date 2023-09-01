import type { NextFunction, Request, Response } from 'express';

import type { Logger } from '@/utils/logger';
import { v1 as uuid } from 'uuid';

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

export const RequestUIDMiddleware = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const uid = uuid();

    res.setHeader('X-Request-ID', uid);
    (req as any)['id'] = uid;

    return next();
};
