"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var typeDefs = exports.typeDefs = "\ntype University {\n  id: ID!\n  level: Int\n}\ntype Department {\n  id: ID!\n  name: String\n  level: Int\n  has: [Position] @relation(name: \"HAS\", direction: \"OUT\")\n  childrenOf: [Department] @relation(name: \"CHILDREN_OF\", direction: \"IN\")\n}\ntype Position {\n  id: ID! \n  name: String\n  level: Int\n  type: String\n}\ntype Query {\n    universities(id: ID, level: Int, first: Int = 10, offset: Int = 0): [University]\n    departments(id: ID, name: String, level: Int, first: Int = 10, offset: Int = 0): [Department]\n    positions(id: ID, name: String, level: Int, type: String, first: Int = 10, offset: Int = 0): [Position]\n}\n";

var resolvers = exports.resolvers = {
  Query: {
    universities: _neo4jGraphqlJs.neo4jgraphql,
    departments: _neo4jGraphqlJs.neo4jgraphql,
    positions: _neo4jGraphqlJs.neo4jgraphql
  }
};