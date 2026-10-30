require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const tratarErros = require('./src/middlewares/erro.middleware');
const criarErro = require('./src/utils/criarErro');

const openapi = require('./src/docs/openapi');

const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const prioridadeModel = require('./src/models/prioridade.model');
const prisma = require('./src/database/prisma');

const app = express();
const PORTA = process.env.PORTA || 3001;

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


app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.get('/', (req, res) => {
  res.json({ mensagem: 'API rodando nas manha' });
});

app.get('/prioridades', async (req, res, next) => {
  try {
    const prioridades = await prioridadeModel.listar();
    res.json(prioridades);
  } catch (err) {
    next(err);
  }
});

app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', projetosRoutes);

app.use((req, res) => {
  const rota = `${req.method} ${req.url}`;
  throw criarErro(404, `Rota ${rota} não encontrada`);
});

app.use(tratarErros);

prisma.$connect()
  .then(() => {
    console.log('Banco de dados (Prisma) conectado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });

app.listen(PORTA, () => {
  console.log(`Servidor rodando em: http://localhost:${PORTA}`);
  console.log(`Documentação Swagger em: http://localhost:${PORTA}/docs`);
});