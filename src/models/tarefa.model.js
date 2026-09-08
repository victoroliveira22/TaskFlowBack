let tarefas = [
  { id: 1, texto: 'Estudar Node.js', prioridade: 'alta', coluna: 'andamento', usuarioId: 1, concluidaEm: null },
  { id: 2, texto: 'Fazer exercícios', prioridade: 'media', coluna: 'afazer', usuarioId: 2, concluidaEm: null }
];
let proximoId = 3;

exports.listar = (filtros = {}) => {
  let list = tarefas;
  if (filtros.coluna) {
    list = list.filter(t => t.coluna === filtros.coluna);
  }
  if (filtros.usuarioId !== undefined && filtros.usuarioId !== null) {
    list = list.filter(t => t.usuarioId === Number(filtros.usuarioId));
  }
  return list;
};

exports.buscar = id => tarefas.find(t => t.id === id);

exports.adicionar = ({ texto, prioridade = 'media', coluna = 'afazer', usuarioId }) => {
  const nova = {
    id: proximoId++,
    texto,
    prioridade,
    coluna,
    usuarioId: usuarioId ? Number(usuarioId) : null,
    concluidaEm: coluna === 'concluido' ? new Date().toISOString() : null
  };
  tarefas.push(nova);
  return nova;
};

exports.atualizar = (id, dados) => {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return null;

  const atual = tarefas[index];
  let concluidaEm = atual.concluidaEm;

  if (dados.coluna !== undefined) {
    if (dados.coluna === 'concluido' && atual.coluna !== 'concluido') {
      concluidaEm = new Date().toISOString();
    } else if (dados.coluna !== 'concluido' && atual.coluna === 'concluido') {
      concluidaEm = null;
    }
  }

  tarefas[index] = {
    ...atual,
    ...dados,
    id,
    usuarioId: dados.usuarioId !== undefined ? (dados.usuarioId ? Number(dados.usuarioId) : null) : atual.usuarioId,
    concluidaEm
  };

  return tarefas[index];
};

exports.remover = id => {
  const index = tarefas.findIndex(t => t.id === id);
  return index !== -1 ? tarefas.splice(index, 1)[0] : null;
};