let usuarios = [];
let proximoId = 1;

function listarTodos() {
  return usuarios;
}

function buscarPorId(id) {
  return usuarios.find((u) => u.id === id);
}

function buscarPorEmail(email) {
  return usuarios.find((u) => u.email === email);
}

function criar(nome, email) {
  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);
  return novoUsuario;
}

function atualizar(id, dados) {
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return null;

  usuarios[indice] = { ...usuarios[indice], ...dados, id };
  return usuarios[indice];
}

function deletar(id) {
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return null;

  const removido = usuarios.splice(indice, 1)[0];
  return removido;
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  deletar,
};