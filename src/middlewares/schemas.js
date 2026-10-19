const schemas = {
  id: {
    id: { obrigatorio: true, tipo: 'inteiro' },
  },
  tarefa: {
    texto: { obrigatorio: true, tipo: 'string' },
    prioridade: { obrigatorio: false, tipo: 'string', enum: ['alta', 'media', 'baixa'] },
    coluna: { obrigatorio: false, tipo: 'string', enum: ['afazer', 'andamento', 'concluido'] },
    usuarioId: { obrigatorio: false, tipo: 'inteiro' },
    projetoId: { obrigatorio: false, tipo: 'inteiro' },
  },
  usuario: {
    nome: { obrigatorio: true, tipo: 'string' },
    email: { obrigatorio: true, tipo: 'string' },
    senha: { obrigatorio: true, tipo: 'string' },
  },
  projeto: {
    nome: { obrigatorio: true, tipo: 'string' },
    descricao: { obrigatorio: false, tipo: 'string' },
  },
};

module.exports = schemas;