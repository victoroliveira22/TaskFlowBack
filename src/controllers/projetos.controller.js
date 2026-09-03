let projetos = ['taskflow projeto'];
let proximoId = 1;

function listar(req, res) {
  res.json(projetos);
}

function buscarPorId(req, res) {
  let id = parseInt(req.params.id);
  let achado = projetos.find(p => p.id === id);

  if (!achado) {
    return res.status(404).json({ erro: "Projeto não encontrado" });
  }

  res.json(achado);
}

function criar(req, res) {
  let { nome, descricao } = req.body;

  if (!nome || !descricao) {
    return res.status(400).json({ erro: "Nome e descrição são obrigatórios" });
  }

  for (let i = 0; i < projetos.length; i++) {
    if (projetos[i].nome === nome) {
      return res.status(400).json({ erro: "Projeto com este nome já cadastrado" });
    }
  }

  let novoProjeto = {
    id: proximoId++,
    nome: nome,
    descricao: descricao
  };

  projetos.push(novoProjeto);
  res.status(201).json(novoProjeto);
}

function atualizar(req, res) {
  let id = parseInt(req.params.id);
  let posicao = projetos.findIndex(p => p.id === id);

  if (posicao === -1) {
    return res.status(404).json({ erro: "Projeto não encontrado" });
  }

  if (req.body.nome) projetos[posicao].nome = req.body.nome;
  if (req.body.descricao) projetos[posicao].descricao = req.body.descricao;

  res.json(projetos[posicao]);
}

function remover(req, res) {
  let id = parseInt(req.params.id);
  let posicao = projetos.findIndex(p => p.id === id);

  if (posicao === -1) {
    return res.status(404).json({ erro: "Projeto não encontrado" });
  }

  let removido = projetos.splice(posicao, 1)[0];
  res.json({ mensagem: "Projeto removido", projeto: removido });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};