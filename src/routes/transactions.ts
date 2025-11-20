import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { database } from "../database.js";
import { title } from "process";
import { randomUUID } from "crypto";
import { error } from "console";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";

//Cookies : Formas da gente manter contexto entre requisiçoes (saber se o mesmo usuario que ta cadastrando eh o mesmo que ta lendo)
// Sao como parametros (mas sao criados pelas nossas proprias aplicacoes)
//otimo pra indentificar usuarios

export async function transactionRoutes(app: FastifyInstance) {
  /*
  aqui eh um exemplo de hook global (middleware global) que vai ser executado em todas as rotas, mas uma das desvantagens eh que nao conseguimos controlar em quais rotas ele sera executado (apenas nas locais onde for definido o hook)
  app.addHook('preHandler', async (request, reply) => {
    console.log(`${request.method} - ${request.url}`);
    
  })
    */
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const transactions = await database("transactions")
        .where("session_id", sessionId)
        .select();

      return { transactions };
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await database("transactions")
        .where({
          session_id: sessionId,
          id,
        })
        .first();

      return {
        transaction,
      };
    }
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      //aqui lista o resumo do amount
      const summary = await database("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first();

      return { summary };
    }
  );

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie("sessionId", sessionId, {
        //a rota que pode acessar o cookie
        path: "/",
        //expiraçao do cookie
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await database("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send("deu bom, meu parceiro");
  });
}
