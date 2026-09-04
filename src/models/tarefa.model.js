let tarefas = [];
let idAtual = 1;

function listar(filtros) {
  let listaFiltrada = [];
  for (let i = 0; i < tarefas.length; i++) {
    let item = tarefas[i];
    let podeAdicionar = true;

    if (filtros && filtros.coluna && item.coluna !== filtros.coluna) {
      podeAdicionar = false;
    }
    if (filtros && filtros.usuarioId && item.usuarioId != filtros.usuarioId) {
      podeAdicionar = false;
    }

    if (podeAdicionar == true) {
      listaFiltrada.push(item);
    }
  }
  return listaFiltrada;
}

function buscarPorId(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      return tarefas[i];
    }
  }
  return null;
}

function contarAndamentoDoUsuario(idUsuario) {
  let qtd = 0;
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].usuarioId == idUsuario && tarefas[i].coluna === "andamento") {
      qtd = qtd + 1;
    }
  }
  return qtd;
}

function temTarefaDoUsuario(idUsuario) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].usuarioId == idUsuario) {
      return true;
    }
  }
  return false;
}

function criar(dados) {
  let nova = {
    id: idAtual,
    texto: dados.texto,
    prioridade: dados.prioridade,
    coluna: dados.coluna,
    usuarioId: dados.usuarioId,
    dataConclusao: dados.dataConclusao
  };
  idAtual = idAtual + 1;
  tarefas.push(nova);
  return nova;
}

function atualizar(id, dados) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      if (dados.texto !== undefined) tarefas[i].texto = dados.texto;
      if (dados.prioridade !== undefined) tarefas[i].prioridade = dados.prioridade;
      if (dados.coluna !== undefined) tarefas[i].coluna = dados.coluna;
      if (dados.usuarioId !== undefined) tarefas[i].usuarioId = dados.usuarioId;
      if (dados.dataConclusao !== undefined) tarefas[i].dataConclusao = dados.dataConclusao;
      return tarefas[i];
    }
  }
  return null;
}

function remover(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      let apagada = tarefas[i];
      tarefas.splice(i, 1);
      return apagada;
    }
  }
  return null;
}

module.exports = {
  listar,
  buscarPorId,
  contarAndamentoDoUsuario,
  temTarefaDoUsuario,
  criar,
  atualizar,
  remover
};