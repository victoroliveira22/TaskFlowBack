const pool = require('../database/db');

function formatarId(valor) {
  if (valor === '' || valor === undefined || valor === null) return null;
  const num = Number(valor);
  return Number.isNaN(num) ? null : num;
}

module.exports = {
  listar: async () => {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id');
    return result.rows;
  },

  buscar: async (id) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  adicionar: async (dados) => {
    const {
      texto,
      idprioridade,
      prioridade,
      coluna,
      usuario_id,
      usuarioId,
      projeto_id,
      projetoId,
    } = dados;

    const prioId = formatarId(idprioridade !== undefined ? idprioridade : prioridade);

    const query = `
      INSERT INTO tarefas (texto, idprioridade, coluna, usuario_id, projeto_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    const values = [
      texto,
      prioId,
      coluna || 'afazer',
      formatarId(usuario_id || usuarioId),
      formatarId(projeto_id || projetoId),
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const {
      texto,
      idprioridade,
      prioridade,
      coluna,
      usuario_id,
      usuarioId,
      projeto_id,
      projetoId,
    } = dados;

    const prioId = formatarId(idprioridade !== undefined ? idprioridade : prioridade);

    const query = `
      UPDATE tarefas SET 
      texto = $1, 
      idprioridade = $2, 
      coluna = $3, 
      usuario_id = $4, 
      projeto_id = $5 
      WHERE id = $6 
      RETURNING *;
    `;
    const values = [
      texto,
      prioId,
      coluna || 'afazer',
      formatarId(usuario_id || usuarioId),
      formatarId(projeto_id || projetoId),
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  remover: async (id) => {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *;', [id]);
    return result.rows[0] || null;
  },
};