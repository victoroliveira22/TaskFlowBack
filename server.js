require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ api: 'TaskFlow', versao: '1.0', status: 'online' });
});

app.post('/', (req, res) => {
  res.json({ 
    mensagem: 'TaskFlow está online.' 
  });
});

app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);

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