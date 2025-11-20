import type { FastifyInstance } from "fastify";
import { database } from "../database.js";



export async function transactionRoutes(app: FastifyInstance) {
  app.get("/hello", async () => {
    const transaction = await database("transactions")
      .where("amount", 500)
      .select("*");

    return transaction;
  });
}
