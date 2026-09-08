let projetos = [];
let proximoId = 1;

exports.listar = () => projetos;
exports.buscar = id => projetos.find(p => p.id === id);

exports.adicionar = ({ nome, descricao }) => {
  const novo = { id: proximoId++, nome, descricao: descricao || null };
  projetos.push(novo);
  return novo;
};

exports.atualizar = (id, dados) => {
  const i = projetos.findIndex(p => p.id === id);
  if (i === -1) return null;
  projetos[i] = { ...projetos[i], ...dados, id };
  return projetos[i];
};

exports.remover = id => {
  const i = projetos.findIndex(p => p.id === id);
  return i !== -1 ? projetos.splice(i, 1)[0] : null;
};