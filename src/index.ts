import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerExpressConfig } from "apollo-server-express";
import schema from "./schema";

const server = new ApolloServer({
  schema,
} as ApolloServerExpressConfig);

createConnection()
  .then(async () => {
    server
      .listen()
      .then(({ url }) => console.log("Server Listening on " + url));
  })
  .catch((error) => console.log(error));
