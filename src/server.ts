import fastify from "fastify";

import { env } from "./env/index.js";
import { transactionRoutes } from "./routes/transactions.js";

const app = fastify();

app.register(transactionRoutes, {
  prefix: "transactions",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server rodandoo OK OK");
  });
