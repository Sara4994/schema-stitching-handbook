const { makeExecutableSchema } = require('@graphql-tools/schema');
const NotFoundError = require('../../lib/not_found_error');
const readFileSync = require('../../lib/read_file_sync');
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const storefronts = [
  { id: '1', name: 'The Product Store' },
  { id: '2', name: 'eShoppe' },
];

// graphql resolvers
const resolvers = {
  Query: {
    storefront(root, { id }) {
      return storefronts.find(p => p.id === id) || new NotFoundError();
    },
    sdl() {
      return typeDefs;
    }
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
