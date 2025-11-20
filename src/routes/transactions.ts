import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { database } from "../database.js";
import { title } from "process";
import { randomUUID } from "crypto";

export async function transactionRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await database("transactions").select();

    return { transactions };
  });

  app.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await database("transactions").where("id", id).first();

    return {
      transaction,
    };
  });

  app.get("/summary", async () => {
    //aqui lista o resumo do amount
    const summary = await database("transactions")
      .sum("amount", { as: "amount" })
      .first();

    return { summary };
  });

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

    return reply.status(201).send("deu bom, meu parceiro");
  });
}
