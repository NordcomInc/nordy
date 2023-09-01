const resolvers = {
    Query: {
        async repositories() {
            throw new Error('Not implemented');
        },
        async repository() {
            throw new Error('Not implemented');
        }
    },
    Mutation: {
        async connectRepository() {
            throw new Error('Not implemented');
        }
    }
};

export default resolvers;
