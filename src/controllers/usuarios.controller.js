const usuarioModel = require('../models/usuario.model');
const tarefaModel = require('../models/tarefa.model');

function listar(req, res) {
  let dados = usuarioModel.listar();
  res.json(dados);
}

function buscarPorId(req, res) {
  let id = parseInt(req.params.id);
  let achei = usuarioModel.buscarPorId(id);
  if (!achei) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }
  res.json(achei);
}

function criar(req, res) {
  let nome = req.body.nome;
  let email = req.body.email;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Informe nome e email!" });
  }

  let existe = usuarioModel.buscarPorEmail(email);
  if (existe) {
    return res.status(400).json({ erro: "Esse email ja esta cadastrado" });
  }

  let novo = usuarioModel.criar({ nome: nome, email: email });
  res.status(201).json(novo);
}

function atualizar(req, res) {
  let id = parseInt(req.params.id);
  let user = usuarioModel.buscarPorId(id);
  if (!user) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }

  let alterado = usuarioModel.atualizar(id, {
    nome: req.body.nome,
    email: req.body.email
  });

  res.json(alterado);
}

function remover(req, res) {
  let id = parseInt(req.params.id);
  let user = usuarioModel.buscarPorId(id);
  if (!user) {
    return res.status(404).json({ erro: "Usuario nao encontrado" });
  }

  let temTarefas = tarefaModel.temTarefaDoUsuario(id);
  if (temTarefas) {
    return res.status(400).json({ erro: "Nao pode apagar usuario que tem tarefas!" });
  }

  let deletado = usuarioModel.remover(id);
  res.json({ mensagem: "Usuario deletado com sucesso", usuario: deletado });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};