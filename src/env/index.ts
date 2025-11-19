import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

//export const env = envSchema.safeParse(process.env);

const _env = envSchema.safeParse (process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

  export const env = _env.data;

//com o zod eh possivel garantir que a variavel de ambiente existe e tem o tipo correto
//exemplo: se a variavel for um numero, podemos usar z.number() para garantir que o valor seja um numero