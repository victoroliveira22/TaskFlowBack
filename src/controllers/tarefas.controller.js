const DB = require('../models/tarefa.model');
const criarErro = require('../utils/criarErro');

const PRIORIDADES = ['alta', 'media', 'baixa'];
const COLUNAS = ['afazer', 'andamento', 'concluido'];

exports.listar = async (req, res) => {
  const { coluna, usuarioId } = req.query;
  const tarefas = await DB.listar({ coluna, usuarioId });
  res.json(tarefas);
};

exports.buscarPorId = async (req, res) => {
  const item = await DB.buscar(Number(req.params.id));
  if (!item) {
    throw criarErro(404, 'Tarefa não encontrada');
  }
  res.json(item);
};

exports.criar = async (req, res) => {
  const dados = {
    ...req.body,
    usuarioId: req.usuario ? req.usuario.id : req.body.usuarioId,
  };

  const colTarget = dados.coluna || 'afazer';
  if (colTarget === 'andamento') {
    const ativas = await DB.listar({ usuarioId: dados.usuarioId, coluna: 'andamento' });
    if (ativas.length >= 2) {
      throw criarErro(400, 'Limite de 2 tarefas em andamento por usuário atingido');
    }
  }

  const novaTarefa = await DB.adicionar(dados);
  res.status(201).json(novaTarefa);
};

exports.atualizar = async (req, res) => {
  const id = Number(req.params.id);
  const atual = await DB.buscar(id);

  if (!atual) {
    throw criarErro(404, 'Tarefa não encontrada');
  }

  const { prioridade, coluna } = req.body;

  if (prioridade && !PRIORIDADES.includes(prioridade)) {
    throw criarErro(400, 'Prioridade inválida. Use: alta, media ou baixa');
  }
  if (coluna && !COLUNAS.includes(coluna)) {
    throw criarErro(400, 'Coluna inválida. Use: afazer, andamento ou concluido');
  }

  const usr = req.usuario ? req.usuario.id : atual.usuario_id;
  const col = coluna !== undefined ? coluna : atual.coluna;

  if (col === 'andamento') {
    const emAndamento = await DB.listar({ usuarioId: usr, coluna: 'andamento' });
    const filtradas = emAndamento.filter(t => t.id !== id);
    if (filtradas.length >= 2) {
      throw criarErro(400, 'Limite de 2 tarefas em andamento por usuário atingido');
    }
  }

  const atualizada = await DB.atualizar(id, req.body);
  res.json(atualizada);
};

exports.remover = async (req, res) => {
  const id = Number(req.params.id);
  const removida = await DB.remover(id);

  if (!removida) {
    throw criarErro(404, 'Tarefa não encontrada');
  }

  res.status(204).send();
};

exports.estatisticas = async (req, res) => {
  const { coluna } = req.query;
  const base = coluna ? await DB.listar({ coluna }) : await DB.listar();

  res.json({
    total: base.length,
    porColuna: {
      afazer: base.filter(t => t.coluna === 'afazer').length,
      andamento: base.filter(t => t.coluna === 'andamento').length,
      concluido: base.filter(t => t.coluna === 'concluido').length
    }
  });
};