const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require('../middlewares/autenticar');

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);

router.post('/',
  autenticar,
  validar(schemas.tarefa),
  tarefasController.criar
);
router.put('/:id', autenticar, tarefasController.atualizar);
router.delete('/:id', autenticar, tarefasController.remover);

module.exports = router;