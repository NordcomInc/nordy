import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        discordId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
const model = mongoose.model('users', schema);

export { schema, model };
