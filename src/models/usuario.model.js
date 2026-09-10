let usuarios = [
  {
    id: 1,
    nome: 'Alice',
    email: 'alice@email.com',
    senha: '123456'
  }
];

let proximoId = 2;

module.exports = {
  listar: () => usuarios,
  buscar: (id) => usuarios.find(u => u.id === id),
  buscarPorEmail: (email) => usuarios.find(u => u.email === email),
  adicionar: (dados) => {
    const novo = { id: proximoId++, ...dados };
    usuarios.push(novo);
    return novo;
  },
  atualizar: (id, dados) => {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return null;
    usuarios[idx] = { ...usuarios[idx], ...dados };
    return usuarios[idx];
  },
  remover: (id) => {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return null;
    return usuarios.splice(idx, 1)[0];
  }
};