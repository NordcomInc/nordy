import mongoose from 'mongoose';

const schema = new mongoose.Schema({}, { timestamps: true });
const model = mongoose.model('repositories', schema);

export { schema, model };
