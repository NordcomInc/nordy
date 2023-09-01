import 'dotenv/config';

import API from '@/api/api';
import Bot from '@/bot/bot';
import Database from '@/database/database';
import Logger from '@/utils/logger';
import { config } from '@/utils/config';
import { onShutdown } from '@/utils/shutdown';

Logger.info('Starting Nordy...');
const database = new Database({ logger: Logger.getSubLogger({ name: Database.name }) });
await database.connect();

const bot = new Bot({ logger: Logger.getSubLogger({ name: Bot.name }) });
await bot.initializeHandlers();

const dashboard = new API({ logger: Logger.getSubLogger({ name: API.name }), bot });
await dashboard.initializeRoutes();
await dashboard.listen();

onShutdown(async () => {
    Logger.info('Shutting down...');

    await dashboard.destroy();
    await bot.destroy();
    await database.destroy();

    // FIXME: Respect original exit code.
    process.exit(0);
});

await bot.login();
