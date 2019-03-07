import { GraphQLServer } from "graphql-yoga";

import { Prisma } from "./generated/prisma-client";
import { IResponseRequest } from "./types/prisma";
import resolvers from "./resolvers";

const prisma = new Prisma({
  endpoint: "http://localhost:4466"
});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request: IResponseRequest) => ({
    ...request,
    prisma
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
