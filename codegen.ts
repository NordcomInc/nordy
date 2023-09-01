import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/api/schemas/**/*.ts',
    emitLegacyCommonJSImports: false,
    generates: {
        './src/api/___graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        }
    }
};

export default config;
