const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefas.controller');
const pool = require('../database/db');

router.get('/', tarefasController.listar);

router.get('/prioridades', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM prioridades ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', tarefasController.buscarPorId);
router.post('/', tarefasController.criar);
router.put('/:id', tarefasController.atualizar);
router.delete('/:id', tarefasController.remover);

module.exports = router;