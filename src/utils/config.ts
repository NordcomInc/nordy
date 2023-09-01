import type { LogLevel } from './logger';

const production = process.env.NODE_ENV === 'production';

export const config = {
    production: production,
    log_level: (process.env.LOG_LEVEL || (production && 'info') || 'debug') as LogLevel,

    api: {
        graphql: {
            route: '/graphql'
        },
        port: Number.parseInt(process.env.PORT || (production && '80') || '3000')
    }
};
