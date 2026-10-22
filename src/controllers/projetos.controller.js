const projetosRepo = require('../models/projeto.model');

exports.listar = async (req, res, next) => {
  try {
    const lista = await projetosRepo.listar();
    res.json(lista);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const proj = await projetosRepo.buscar(Number(req.params.id));
    if (!proj) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json(proj);
  } catch (err) {
    next(err);
  }
};

exports.criar = async (req, res, next) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
    const novo = await projetosRepo.adicionar({ nome, descricao });
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const atualizado = await projetosRepo.atualizar(id, req.body);
    if (!atualizado) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const removido = await projetosRepo.remover(id);
    if (!removido) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json({ mensagem: 'Projeto removido', projeto: removido });
  } catch (err) {
    next(err);
  }
};