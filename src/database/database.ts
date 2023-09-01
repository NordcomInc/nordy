import type { Logger } from '@/utils/logger';
import { MONGODB_URI } from '@/utils/secrets';
import mongoose from 'mongoose';

export default class Database {
    private readonly logger: Logger;

    constructor({ logger }: { logger: Logger }) {
        this.logger = logger;

        this.logger.debug(`Initializing Database...`);
        mongoose.set('strictQuery', true);
    }

    public async connect() {
        await mongoose.connect(MONGODB_URI);
        this.logger.info(`Connected to mongodb!`);
    }

    public async destroy() {
        await mongoose.disconnect();
    }
}
