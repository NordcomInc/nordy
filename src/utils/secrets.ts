const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
if (!DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set');

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('MONGODB_URI is not set');

export { DISCORD_TOKEN, MONGODB_URI };
