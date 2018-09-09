"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var typeDefs = exports.typeDefs = "\ntype University {\n  id: ID!\n  level: Int\n}\n\ntype Department {\n  id: ID!\n  name: String\n  level: Int\n  children: [Department] @relation(name: \"CHILD\", direction: \"OUT\")\n  parent: [Department] @relation(name: \"CHILD\", direction: \"IN\")\n}\n\ntype Position {\n  id: ID! \n  name: String\n  level: Int\n  type: String\n}\n\ntype Mutation {\n  AddDepartmentChildren(fromDepartmentID: ID!, toDepartmentID: ID!): Department @cypher(\n  statement:\"\"\"\n    MATCH (from:Department {id: $fromDepartmentID})\n    MATCH (to:Department {id: $toDepartmentID})\n    MERGE (from)-[:CHILD]->(to)\n    RETURN to.id\n    \"\"\")\n}\n\ntype Query {\n    universities(id: ID, level: Int, first: Int = 10, offset: Int = 0): [University]\n    departments(id: ID, name: String, level: Int, first: Int = 10, offset: Int = 0): [Department]\n    positions(id: ID, name: String, level: Int, type: String, first: Int = 10, offset: Int = 0): [Position]\n}\n";

var resolvers = exports.resolvers = {
  Query: {
    universities: _neo4jGraphqlJs.neo4jgraphql,
    departments: _neo4jGraphqlJs.neo4jgraphql,
    positions: _neo4jGraphqlJs.neo4jgraphql
  }
};