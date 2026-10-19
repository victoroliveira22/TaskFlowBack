require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes')
const pool = require('./src/database/db');
const app = express();
const PORTA = process.env.PORTA || 3001;
const tratarErros = require('./src/middlewares/erro.middleware');

const origensPermitidas = [
  'https://task-flow-zeta-vert.vercel.app',
  'http://localhost:5173',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: origensPermitidas,
    credentials: true,
  })
);

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
const rota = `${req.method} ${req.url}`;
throw criarErro(404, `Rota ${rota} não encontrada`);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Banco de dados conectado com sucesso:', res.rows[0].now);
  }
});

app.use(tratarErros);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});