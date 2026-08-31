const tarefaModel = require('../models/tarefa.model');

function listar(req, res) {
  const { coluna, prioridade } = req.query;
  const resultado = tarefaModel.listarTodas(coluna, prioridade);
  res.json(resultado);
}

function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const tarefa = tarefaModel.buscarPorId(id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json(tarefa);
}

function criar(req, res) {
  const { texto, prioridade, coluna, cidade } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo "texto" é obrigatório' });
  }

  const novaTarefa = tarefaModel.criar(texto, prioridade, coluna, cidade);
  res.status(201).json(novaTarefa);
}

function atualizar(req, res) {
  const id = Number(req.params.id);
  const { texto, prioridade, coluna, cidade } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo "texto" é obrigatório' });
  }

  const tarefaAtualizada = tarefaModel.atualizar(id, texto, prioridade, coluna, cidade);

  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json(tarefaAtualizada);
}

function remover(req, res) {
  const id = Number(req.params.id);
  const removido = tarefaModel.deletar(id);

  if (!removido) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json({ mensagem: 'Tarefa removida com sucesso', id });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};