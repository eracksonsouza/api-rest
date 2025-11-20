import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { database } from "../database.js";
import { title } from "process";
import { randomUUID } from "crypto";

export async function transactionRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    //{ title, amount, type: credit or debit}
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await database("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    //http code

    return reply.status(201).send('deu bom, meu parceiro');
  });
}
