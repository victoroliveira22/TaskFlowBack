let projetos = [];
let proximoId = 1;

function listar() {
  return projetos;
}

function buscarPorId(id) {
  for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].id === id) {
      return projetos[i];
    }
  }
  return null;
}

function buscarPorNome(nome) {
  for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].nome === nome) {
      return projetos[i];
    }
  }
  return null;
}

function criar(dados) {
  let novoProjeto = {
    id: proximoId,
    nome: dados.nome,
    descricao: dados.descricao
  };
  proximoId = proximoId + 1;
  projetos.push(novoProjeto);
  return novoProjeto;
}

function atualizar(id, dados) {
  for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].id === id) {
      if (dados.nome) {
        projetos[i].nome = dados.nome;
      }
      if (dados.descricao) {
        projetos[i].descricao = dados.descricao;
      }
      return projetos[i];
    }
  }
  return null;
}

function remover(id) {
  for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].id === id) {
      let removido = projetos[i];
      projetos.splice(i, 1);
      return removido;
    }
  }
  return null;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorNome,
  criar,
  atualizar,
  remover
};