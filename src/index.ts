import 'dotenv/config';

import Logger from '@/utils/logger';
import Nordy from './bot';

const nordy = new Nordy({ logger: Logger.child({ name: 'Nordy' }) });

await nordy.initializeHandlers();
await nordy.login();

const exit = async () => {
    await nordy.destroy();
    process.exit();
};

process.on('SIGINT', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
