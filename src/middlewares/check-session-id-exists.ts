import type { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({
      error: "Nao autorizado",
    });
  }
}

//esse middleware verifica se o sessionId existe no cookie antes de permitir o acesso a certas rotas