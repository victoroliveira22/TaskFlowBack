require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');

const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const app = express();
const PORTA = process.env.PORTA || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(validarContentType);
app.use(logger);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API TaskFlow rodando com sucesso!' });
});

app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', projetosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});