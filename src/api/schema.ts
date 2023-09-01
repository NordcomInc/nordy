import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            todo: {
                type: GraphQLString,
                resolve: () => 'todo'
            }
        }
    })
});
