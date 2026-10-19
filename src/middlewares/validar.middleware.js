const criarErro = require('../utils/criarErro');

function validar(schema, origem = 'body') {
  return (req, res, next) => {
    const dados = req[origem] || {};
    const erros = [];

    for (const [campo, regras] of Object.entries(schema)) {
      let valor = dados[campo];

      if (regras.tipo === 'inteiro' && valor !== undefined) {
        valor = Number(valor);
      }

      const ausente = valor === undefined || valor === null || valor === '';

      if (regras.obrigatorio && ausente) {
        erros.push(`O campo '${campo}' é obrigatório.`);
        continue;
      }

      if (ausente) continue;

      if (regras.tipo === 'inteiro') {
        if (!Number.isInteger(valor) || valor <= 0) {
          erros.push(`O campo '${campo}' deve ser um número inteiro positivo.`);
        }
      }

      if (regras.tipo === 'string' && typeof valor !== 'string') {
        erros.push(`O campo '${campo}' deve ser um texto.`);
      }

      if (regras.enum && !regras.enum.includes(valor)) {
        erros.push(`O campo '${campo}' deve ser um dos valores: ${regras.enum.join(', ')}.`);
      }
    }

    if (erros.length > 0) {
      throw criarErro(400, 'Dados inválidos', erros);
    }

    next();
  };
}

module.exports = validar;