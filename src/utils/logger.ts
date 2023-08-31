import { LOG_LEVEL, PRODUCTION } from './config';

import { Logger } from 'tslog';

export default new Logger({
    type: (PRODUCTION && 'json') || 'pretty',
    minLevel: 0,
    prettyLogTemplate: '[{{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}}]\t[{{name}}]: ',
    prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}',
    prettyErrorStackTemplate: '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
    prettyErrorParentNamesSeparator: ':',
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
    //minLevel: LOG_LEVEL
});
