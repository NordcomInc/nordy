import RepositoryResolvers from '@/api/schemas/repository/resolvers';
import RepositorySchema from '@/api/schemas/repository/schema';
import { buildSubgraphSchema } from '@apollo/subgraph';

export const schema = buildSubgraphSchema([
    {
        typeDefs: RepositorySchema,
        resolvers: RepositoryResolvers
    }
]);
