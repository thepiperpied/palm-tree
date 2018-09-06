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
  children: [Department] @cypher(statement: ""CHILD_DEPT", direction: "OUT"")
  parents: [Department] @relation(name: "CHILD_DEPT", direction: "IN")
}
type Position {
  id: ID! 
  name: String
  level: Int
  type: String,
  positionOf: [Department] @relation(name: "POSITION_OF", direction: "OUT")
  fromDepartment: [Department] @relation(name: "HAS_POSITION", direction: "IN")
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