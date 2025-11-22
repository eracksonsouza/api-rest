import { expect, test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { describe } from "node:test";

describe("Transações API", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  //eh possivel tambem usar o it ao inves do test, mas eh opcional
  //exemplo: it("O usuario consegue consegue criar uma nova transaçao", async () => {
  test("O usuario consegue consegue criar uma nova transaçao", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  //test.skip pula o teste
  //test.todo marca o teste como pendente
  //test.only roda somente esse teste
  test("O usuario consegue listar todas as transaçoes", async () => {
    //Todo teste deve obrigatoriamente se excluir de qualquer contexto, ou seja, nao pode ter um teste dependendo de outro teste

    const createTransationResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransationResponse.get("Set-Cookie");

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

      //estou esperando que a resposta tenha um array de transaçoes dentro do body da resposta transactions
    expect(listTransactionsResponse.body.transactions).toEqual([
      //aqui no caso eu vou esperar que tenha essa transaçao dentro do array de transaçoes criadas
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      }),
    ]);
  });
});
