let usuarios = [
  { id: 1, nome: 'Ana', email: 'ana@email.com' },
  { id: 2, nome: 'Bruno', email: 'bruno@email.com' }
];
let proximoId = 3;

exports.listar = () => usuarios;
exports.buscar = id => usuarios.find(u => u.id === id);
exports.buscarPorEmail = email => usuarios.find(u => u.email === email);

exports.adicionar = ({ nome, email }) => {
  const novo = { id: proximoId++, nome, email };
  usuarios.push(novo);
  return novo;
};

exports.atualizar = (id, dados) => {
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return null;
  usuarios[idx] = { ...usuarios[idx], ...dados, id };
  return usuarios[idx];
};

exports.remover = id => {
  const idx = usuarios.findIndex(u => u.id === id);
  return idx !== -1 ? usuarios.splice(idx, 1)[0] : null;
};