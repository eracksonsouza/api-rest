import fastify from "fastify";

const app = fastify();

//GET, POST, PUT, PATCH, DELETE
app.get("/hello", () => {
  return "Hello Node";
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server rodandoo");
  });

//o tsx so eh recomendado utilizar em desenvolvimento
//Ja o tsc para build
