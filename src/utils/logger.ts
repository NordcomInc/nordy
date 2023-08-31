import { LOG_LEVEL } from './config';
import { pino } from 'pino';

export default pino({
    level: LOG_LEVEL
});
