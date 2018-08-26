import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type University {
  id: ID!
  level: Int
}
type Department {
  id: ID!
  name: String
  level: Int
  has(first: Int = 10, offset: Int = 0, levelTo: Int): [Department] @relation(name: "HAS", direction: "OUT")
  parentOf(first: Int = 10, offset: Int = 0): [Department] @relation(name: "PARENT_OF", direction: "OUT")
}
type Position {
  id: ID!
  name: String
  level: Int
  type: String
  of(first: Int = 10, offset: Int = 0, levelTo: Int): [Position] @relation(name: "OF", direction: "OUT")
  parentOf(first: Int = 10, offset: Int = 0): [Position] @relation(name: "PARENT_OF", direction: "OUT")
}
type Query {
    universities(id: ID, level: Int, first: Int = 10, offset: Int = 0): [University]
    departments(id: ID, name: String, level: Int, first: Int = 10, offset: Int = 0): [Department]
    positions(id: ID, name: String, level: Int, type: String, first: Int = 10, offset: Int = 0): [Position]
}
`;

export const resolvers = {
  Query: {
    universities: neo4jgraphql,
    departments: neo4jgraphql,
    positions: neo4jgraphql,
  }
};