import { Logger as Log } from 'tslog';
import { config } from '@/utils/config';

export type Logger = Log<any>;

export type LogLevel = 'silly' | 'tracer' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export const LogLevelToNumeric = (level: LogLevel): 0 | 1 | 2 | 3 | 4 | 5 | 6 => {
    switch (level) {
        case 'silly':
            return 0;
        case 'tracer':
            return 1;
        case 'debug':
            return 2;
        case 'warn':
            return 4;
        case 'error':
            return 5;
        case 'fatal':
            return 6;

        case 'info':
        default:
            return 3;
    }
};

const prettyConfig = {
    prettyLogTemplate: '[{{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}}]\t[{{name}}]: ',
    prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}',
    prettyErrorStackTemplate: '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
    prettyErrorParentNamesSeparator: '.',
    prettyErrorLoggerNameDelimiter: '\t',
    stylePrettyLogs: true,
    prettyLogTimeZone: 'UTC',
    prettyLogStyles: {
        logLevelName: {
            '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
            SILLY: ['bold', 'white'],
            TRACE: ['bold', 'whiteBright'],
            DEBUG: ['bold', 'green'],
            INFO: ['bold', 'blue'],
            WARN: ['bold', 'yellow'],
            ERROR: ['bold', 'red'],
            FATAL: ['bold', 'redBright']
        },
        dateIsoStr: 'white',
        filePathWithLine: 'white',
        name: ['white', 'bold'],
        nameWithDelimiterPrefix: ['white', 'bold'],
        nameWithDelimiterSuffix: ['white', 'bold'],
        errorName: ['bold', 'bgRedBright', 'whiteBright'],
        fileName: ['yellow']
    }
};

export default new Log({
    name: 'Nordy',
    type: (config.production && 'json') || 'pretty',
    minLevel: LogLevelToNumeric(config.log_level),

    ...(((config.production && {}) || prettyConfig) as any)
});
