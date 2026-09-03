const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos.controller');

router.get('/', projetosController.listar);
router.get('/:id', projetosController.buscarPorId);
router.post('/', projetosController.criar);
router.put('/:id', projetosController.atualizar);
router.delete('/:id', projetosController.remover);

module.exports = router;