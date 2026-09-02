let tarefas = [
  { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer', cidade: 'Natal/RN' },
  { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento', cidade: 'Natal/RN' },
  { id: 3, texto: 'Testar Postman', prioridade: 'media', coluna: 'concluido', cidade: 'Natal/RN' },
];

let proximoId = 4;

function listarTodas(coluna, prioridade) {
  let resultado = tarefas;
  if (coluna) resultado = resultado.filter((t) => t.coluna === coluna);
  if (prioridade) resultado = resultado.filter((t) => t.prioridade === prioridade);
  return resultado;
}

function buscarPorId(id) {
  return tarefas.find((t) => t.id === id);
}

function obterEstatisticas(coluna) {
  const base = coluna ? tarefas.filter((t) => t.coluna === coluna) : tarefas;
  const total = base.length;
  const porColuna = {
    afazer: base.filter((t) => t.coluna === 'afazer').length,
    andamento: base.filter((t) => t.coluna === 'andamento').length,
    concluido: base.filter((t) => t.coluna === 'concluido').length,
  };
  const porPrioridade = {
    alta: base.filter((t) => t.prioridade === 'alta').length,
    media: base.filter((t) => t.prioridade === 'media').length,
    baixa: base.filter((t) => t.prioridade === 'baixa').length,
  };

  return {
    coluna: coluna || 'todas',
    total,
    porColuna,
    porPrioridade,
  };
}

function criar(texto, prioridade = 'media', coluna = 'afazer', cidade = '') {
  const novaTarefa = {
    id: proximoId++,
    texto,
    prioridade,
    coluna,
    cidade,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(id, texto, prioridade = 'media', coluna = 'afazer', cidade = '') {
  const indice = tarefas.findIndex((t) => t.id === id);
  if (indice === -1) return null;

  const tarefaAtualizada = {
    id,
    texto,
    prioridade,
    coluna,
    cidade,
  };

  tarefas[indice] = tarefaAtualizada;
  return tarefaAtualizada;
}

function deletar(id) {
  const tarefaExiste = tarefas.some((t) => t.id === id);
  if (!tarefaExiste) return false;

  tarefas = tarefas.filter((t) => t.id !== id);
  return true;
}

module.exports = { 
  listarTodas, 
  buscarPorId, 
  obterEstatisticas, 
  criar, 
  atualizar, 
  deletar 
};