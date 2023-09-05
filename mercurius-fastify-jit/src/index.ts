import Fastify from "fastify";
import mercurius from "mercurius";
import { largeResponse } from "../../largeResponse";

const main = async () => {
  const typeDefs = `
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

  const app = Fastify();

  app.register(mercurius, {
    schema: typeDefs,
    resolvers: resolvers,
    graphiql: true,
    jit: 1,
  });

  await app.listen({ port: 4002 });

  console.log(
    "Mercurius + Fastify + jit graphql server started at http://localhost:4002/graphiql"
  );
};

main();
