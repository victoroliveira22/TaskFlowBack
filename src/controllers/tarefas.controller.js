const DB = require('../models/tarefa.model');
const UserDB = require('../models/usuario.model');

const PRIORIDADES = ['alta', 'media', 'baixa'];
const COLUNAS = ['afazer', 'andamento', 'concluido'];

exports.listar = (req, res) => {
  const { coluna, usuarioId } = req.query;
  res.json(DB.listar({ coluna, usuarioId }));
};

exports.buscarPorId = (req, res) => {
  const item = DB.buscar(Number(req.params.id));
  if (!item) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(item);
};

exports.criar = (req, res) => {
  const { texto, prioridade, coluna, usuarioId } = req.body;

  if (!texto) return res.status(400).json({ erro: 'Texto obrigatório' });
  if (prioridade && !PRIORIDADES.includes(prioridade)) {
    return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });
  }
  if (coluna && !COLUNAS.includes(coluna)) {
    return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });
  }
  if (usuarioId && !UserDB.buscar(Number(usuarioId))) {
    return res.status(400).json({ erro: 'Usuário não encontrado' });
  }

  const colTarget = coluna || 'afazer';
  if (usuarioId && colTarget === 'andamento') {
    const ativas = DB.listar({ usuarioId, coluna: 'andamento' });
    if (ativas.length >= 2) {
      return res.status(400).json({ erro: 'Limite de 2 tarefas em andamento por usuário atingido' });
    }
  }

  res.status(201).json(DB.adicionar(req.body));
};

exports.atualizar = (req, res) => {
  const id = Number(req.params.id);
  const atual = DB.buscar(id);

  if (!atual) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  const { prioridade, coluna, usuarioId } = req.body;

  if (prioridade && !PRIORIDADES.includes(prioridade)) {
    return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });
  }
  if (coluna && !COLUNAS.includes(coluna)) {
    return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });
  }
  if (usuarioId && !UserDB.buscar(Number(usuarioId))) {
    return res.status(400).json({ erro: 'Usuário não encontrado' });
  }

  const usr = usuarioId !== undefined ? (usuarioId ? Number(usuarioId) : null) : atual.usuarioId;
  const col = coluna !== undefined ? coluna : atual.coluna;

  if (usr && col === 'andamento') {
    const emAndamento = DB.listar({ usuarioId: usr, coluna: 'andamento' }).filter(t => t.id !== id);
    if (emAndamento.length >= 2) {
      return res.status(400).json({ erro: 'Limite de 2 tarefas em andamento por usuário atingido' });
    }
  }

  res.json(DB.atualizar(id, req.body));
};

exports.remover = (req, res) => {
  const id = Number(req.params.id);
  const removida = DB.remover(id);
  if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json({ mensagem: 'Tarefa removida', tarefa: removida });
};

exports.estatisticas = (req, res) => {
  const { coluna } = req.query;
  const base = coluna ? DB.listar({ coluna }) : DB.listar();

  res.json({
    total: base.length,
    porColuna: {
      afazer: base.filter(t => t.coluna === 'afazer').length,
      andamento: base.filter(t => t.coluna === 'andamento').length,
      concluido: base.filter(t => t.coluna === 'concluido').length
    }
  });
};