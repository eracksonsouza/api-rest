import fastify from "fastify";
import { database } from "./database.js";
import crypto from "node:crypto";
import { title } from "node:process";

const app = fastify();

app.get("/hello", async () => {
  /* 
  const transaction = await database("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "transaçao de teste",
      amount: 1000,
    })
    .returning("*");
*/
  const transaction = await database("transactions")
    .where("amount", 500)
    .select("*");

  return transaction;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server rodandoo");
  });
