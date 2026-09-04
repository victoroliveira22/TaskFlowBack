let usuarios = [];
let proximoId = 1;

function listar() {
  return usuarios;
}

function buscarPorId(id) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) {
      return usuarios[i];
    }
  }
  return null;
}

function buscarPorEmail(email) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return usuarios[i];
    }
  }
  return null;
}

function criar(dados) {
  let novo = {
    id: proximoId,
    nome: dados.nome,
    email: dados.email
  };
  proximoId = proximoId + 1;
  usuarios.push(novo);
  return novo;
}

function atualizar(id, dados) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) {
      if (dados.nome) usuarios[i].nome = dados.nome;
      if (dados.email) usuarios[i].email = dados.email;
      return usuarios[i];
    }
  }
  return null;
}

function remover(id) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) {
      let removido = usuarios[i];
      usuarios.splice(i, 1);
      return removido;
    }
  }
  return null;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  remover
};