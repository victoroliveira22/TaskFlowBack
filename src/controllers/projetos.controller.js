const projetosRepo = require('../models/projeto.model');

exports.listar = (req, res) => {
  res.json(projetosRepo.listar());
};

exports.buscarPorId = (req, res) => {
  const proj = projetosRepo.buscar(Number(req.params.id));
  if (!proj) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(proj);
};

exports.criar = (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });

  res.status(201).json(projetosRepo.adicionar({ nome, descricao }));
};

exports.atualizar = (req, res) => {
  const id = Number(req.params.id);
  const atualizado = projetosRepo.atualizar(id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(atualizado);
};

exports.remover = (req, res) => {
  const id = Number(req.params.id);
  const removido = projetosRepo.remover(id);
  if (!removido) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json({ mensagem: 'Projeto removido', projeto: removido });
};