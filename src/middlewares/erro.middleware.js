const { Prisma } = require('@prisma/client');
const traduzirErroPrisma = require('../utils/traduzirErroPrisma');

function tratarErros(erro, req, res, next) {
  if (erro instanceof Prisma.PrismaClientKnownRequestError) {
    erro = traduzirErroPrisma(erro, req.method);
  }

  const status = erro.status || erro.statusCode || 500;
  console.error('[ERRO]', req.method, req.url, '->', erro.message || erro);

  const mensagem = status === 500 ? 'Erro interno no servidor' : (erro.message || 'Erro no servidor');

  res.status(status).json({
    erros: [mensagem],
    erro: {
      mensagem,
      detalhes: erro.detalhes || null,
    },
  });
}

module.exports = tratarErros;