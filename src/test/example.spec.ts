import { expect, test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";

//executa um codigo antes que todos os testes executem
beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("O usuario consegue consegue criar uma nova transaçao", async () => {
  //fazer a chamada HTTP pra criar uma nova transaçao
  await request(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 5000,
      type: "credit",
    })
    .expect(201);
});
