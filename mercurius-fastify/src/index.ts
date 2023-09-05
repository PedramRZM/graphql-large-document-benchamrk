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
  });

  await app.listen({ port: 4000 });

  console.log(
    "Mercurius + Fastify graphql server started at http://localhost:4000"
  );
};

main();
