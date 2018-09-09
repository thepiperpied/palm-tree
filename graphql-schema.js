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
  children: [Department] @relation(name: "CHILD", direction: "OUT")
  parent: [Department] @relation(name: "CHILD", direction: "IN")
}

type Position {
  id: ID! 
  name: String
  level: Int
  type: String
}

type Mutation {
  AddDepartmentChildren(fromDepartmentID: ID!, toDepartmentID: ID!): Department @cypher(
  statement:"""
    MATCH (from:Department {id: $fromDepartmentID})
    MATCH (to:Department {id: $toDepartmentID})
    MERGE (from)-[:CHILD]->(to)
    RETURN to.id
    """)
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