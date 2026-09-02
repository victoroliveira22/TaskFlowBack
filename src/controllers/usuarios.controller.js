let usuarios = ['ui papai cuida'];
let proximoId = 1;

function listar(req, res) {
  res.json(usuarios);
}

function buscarPorId(req, res) {
  let id = parseInt(req.params.id);
  let achado = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      achado = usuarios[i];
      break;
    }
  }

  if (!achado) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  res.json(achado);
}

function criar(req, res) {
  let nome = req.body.nome;
  let email = req.body.email;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email obrigatórios" });
  }

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }
  }

  let novoUsuario = {
    id: proximoId,
    nome: nome,
    email: email
  };

  proximoId = proximoId + 1;
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
}

function atualizar(req, res) {
  let id = parseInt(req.params.id);
  let posicao = -1;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      posicao = i;
      break;
    }
  }

  if (posicao === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  if (req.body.nome) {
    usuarios[posicao].nome = req.body.nome;
  }
  if (req.body.email) {
    usuarios[posicao].email = req.body.email;
  }

  res.json(usuarios[posicao]);
}

function remover(req, res) {
  let id = parseInt(req.params.id);
  let posicao = -1;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      posicao = i;
      break;
    }
  }

  if (posicao === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  let removido = usuarios[posicao];
  usuarios.splice(posicao, 1);

  res.json({ mensagem: "Usuário removido", usuario: removido });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};