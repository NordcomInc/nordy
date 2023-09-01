import 'dotenv/config';

import API from '@/api';
import Logger from '@/utils/logger';
import Nordy from '@/nordy';
import { config } from '@/utils/config';

const nordy = new Nordy({ logger: Logger.getSubLogger({ name: Nordy.name }) });
await nordy.initializeHandlers();

const dashboard = new API({ logger: Logger.getSubLogger({ name: API.name }), nordy });
await dashboard.start({ port: config.api.port });

await nordy.login();

const exit = async () => {
    await dashboard.destroy();
    await nordy.destroy();
    process.exit();
};

process.on('SIGINT', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
