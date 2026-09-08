const usuariosRepo = require('../models/usuario.model');
const tarefasRepo = require('../models/tarefa.model');

exports.listar = (req, res) => {
  res.json(usuariosRepo.listar());
};

exports.buscarPorId = (req, res) => {
  const u = usuariosRepo.buscar(Number(req.params.id));
  if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(u);
};

exports.criar = (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Informe nome e email!' });
  }
  if (usuariosRepo.buscarPorEmail(email)) {
    return res.status(400).json({ erro: 'Esse email já está cadastrado' });
  }

  res.status(201).json(usuariosRepo.adicionar({ nome, email }));
};

exports.atualizar = (req, res) => {
  const id = Number(req.params.id);
  const atualizado = usuariosRepo.atualizar(id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(atualizado);
};

exports.remover = (req, res) => {
  const id = Number(req.params.id);
  const user = usuariosRepo.buscar(id);
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

  const temTarefas = tarefasRepo.listar({ usuarioId: id }).length > 0;
  if (temTarefas) {
    return res.status(400).json({ erro: 'Usuário possui tarefas. Remova as tarefas antes.' });
  }

  const removido = usuariosRepo.remover(id);
  res.json({ mensagem: 'Usuário deletado com sucesso', usuario: removido });
};