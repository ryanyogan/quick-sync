import { GraphQLServer } from "graphql-yoga";

import { Prisma } from "./generated/prisma-client";

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => {
      const returnValue = `Hello ${name || "World!"}`;
      return returnValue;
    }
  }
};

const prisma = new Prisma({
  endpoint: "http://localhost:4466"
});

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    prisma
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
