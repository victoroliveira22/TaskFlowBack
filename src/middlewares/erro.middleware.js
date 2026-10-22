function tratarErros(erro, req, res, next) {
  const status = erro.status || erro.statusCode || 500;
  console.error('[ERRO]', req.method, req.url, '->', erro.message || erro);

  const mensagem = erro.message || 'Erro interno no servidor';

  res.status(status).json({
    erros: [mensagem],
    erro: {
      mensagem,
      detalhes: erro.detalhes || null,
    },
  });
}

module.exports = tratarErros;