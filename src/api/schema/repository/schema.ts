import gql from 'graphql-tag';

const schema = gql`
    type Query {
        repositories(limit: Int): Repositories
        repository(id: ID!): Repository
    }
    type Mutation {
        connectRepository(user: String!, name: String!): ConnectRepositoryResponse!
    }

    type Repository {
        id: ID!
        user: String!
        name: String!
    }
    type Repositories {
        repositories: [Repository]
    }
    type ConnectRepositoryResponse {
        repository: Repository
    }
`;

export default schema;
