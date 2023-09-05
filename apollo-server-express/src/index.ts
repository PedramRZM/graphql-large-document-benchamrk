import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-express";
import { largeResponse } from "../../largeResponse";
import express from "express";

const main = async () => {
  const typeDefs = gql`
    type User {
      _id: String
      name: String
    }

    type Query {
      users: [User]
    }
  `;

  const resolvers = {
    Query: {
      users: async () => {
        return largeResponse;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: "/graphql",
      }),
    ],
  });

  const app = express();

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4001 }, () =>
    console.log(
      `apollo-server-express ready at http://localhost:4001${server.graphqlPath}`
    )
  );
};

main();
