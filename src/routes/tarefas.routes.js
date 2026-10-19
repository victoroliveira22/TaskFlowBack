const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const validar = require('../middlewares/validar.middleware');
const schemas = require('../middlewares/schemas');
const autenticar = require('../middlewares/autenticar');

const idValido = validar(schemas.id, 'params');
const tarefaValida = validar(schemas.tarefa, 'body');

router.get('/', tarefasController.listar);
router.get('/:id', idValido, tarefasController.buscarPorId);

router.post('/',
  autenticar,
  tarefaValida,
  tarefasController.criar
);

router.put('/:id',
  autenticar,
  idValido,
  tarefaValida,
  tarefasController.atualizar
);

router.delete('/:id',
  autenticar,
  idValido,
  tarefasController.remover
);

module.exports = router;