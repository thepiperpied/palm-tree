"use strict";

var _graphqlSchema = require("./graphql-schema");

var _neo4jDriver = require("neo4j-driver");

var _apolloServer = require("apollo-server");

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var schema = (0, _apolloServer.makeExecutableSchema)({
    typeDefs: _graphqlSchema.typeDefs,
    resolvers: _graphqlSchema.resolvers
});

// augmentSchema will add autogenerated mutations based on types in schema
var augmentedSchema = (0, _neo4jGraphqlJs.augmentSchema)(schema);

var driver = _neo4jDriver.v1.driver(process.env.NEO4J_URI || "bolt://db:7687", _neo4jDriver.v1.auth.basic(process.env.NEO4J_USER || "neo4j", process.env.NEO4J_PASSWORD || "neo4j"));

var server = new _apolloServer.ApolloServer({
    // using augmentedSchema (executable GraphQLSchemaObject) instead of typeDefs and resolvers
    //typeDefs,
    //resolvers,
    context: { driver: driver },
    // remove schema and uncomment typeDefs and resolvers above to use original (unaugmented) schema
    schema: augmentedSchema
});

server.listen(process.env.GRAPHQL_LISTEN_PORT, '0.0.0.0').then(function (_ref) {
    var url = _ref.url;

    console.log("GraphQL API ready at " + url);
});