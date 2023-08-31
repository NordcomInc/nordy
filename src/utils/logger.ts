import { LOG_LEVEL } from './config';
import { pino } from 'pino';

const Logger = pino({
    level: LOG_LEVEL
});

export default Logger;
