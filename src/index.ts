import 'dotenv/config';

import Dashboard from './admin';
import { HTTP_PORT } from './utils/config';
import Logger from '@/utils/logger';
import Nordy from './nordy';

const nordy = new Nordy({ logger: Logger.getSubLogger({ name: Nordy.name }) });
await nordy.initializeHandlers();

const dashboard = new Dashboard({ logger: Logger.getSubLogger({ name: Dashboard.name }), nordy });
await dashboard.start({ port: HTTP_PORT });

await nordy.login();

const exit = async () => {
    await dashboard.destroy();
    await nordy.destroy();
    process.exit();
};

process.on('SIGINT', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
