import 'dotenv/config';

import Logger from '@/utils/logger';
import Nordy from './nordy';

const nordy = new Nordy({ logger: Logger.getSubLogger({ name: Nordy.name }) });

await nordy.initializeHandlers();
await nordy.login();

const exit = async () => {
    await nordy.destroy();
    process.exit();
};

process.on('SIGINT', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
