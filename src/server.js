const express = require('express');
const { listarTodas, buscarPorId, criar, atualizar, deletar } = require('./utils/tarefas');

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ api: 'TaskFlow', versao: '1.0', status: 'online' });
});

app.post('/', (req, res) => {
  const { texto, prioridade, coluna, cidade } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo "texto" é obrigatório' });
  }

  const novaTarefa = criar(texto, prioridade, coluna, cidade);
  res.status(201).json(novaTarefa);
});

app.get('/tarefas', (req, res) => {
  const { coluna, prioridade } = req.query;
  const resultado = listarTodas(coluna, prioridade);
  res.json(resultado);
});

app.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = buscarPorId(id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json(tarefa);
});

app.post('/tarefas', (req, res) => {
  const { texto, prioridade, coluna, cidade } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo "texto" é obrigatório' });
  }

  const novaTarefa = criar(texto, prioridade, coluna, cidade);
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { texto, prioridade, coluna, cidade } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo "texto" é obrigatório' });
  }

  const tarefaAtualizada = atualizar(id, texto, prioridade, coluna, cidade);

  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json(tarefaAtualizada);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const removido = deletar(id);

  if (!removido) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json({ mensagem: 'Tarefa removida com sucesso', id });
})

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    metodo: req.method,
    caminho: req.url,
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});