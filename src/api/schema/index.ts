import RepositoryResolvers from '@/api/schema/repository/resolvers';
import RepositorySchema from '@/api/schema/repository/schema';
import { buildSubgraphSchema } from '@apollo/subgraph';

export const schema = buildSubgraphSchema([
    {
        typeDefs: RepositorySchema,
        resolvers: RepositoryResolvers
    }
]);
