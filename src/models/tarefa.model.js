const pool = require('../database/db');

module.exports = {
  listar: async () => {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id');
    return result.rows;
  },

  buscar: async (id) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  adicionar: async ({ texto, prioridade, coluna, usuarioId, projetoId }) => {
    const query = `
      INSERT INTO tarefas (texto, prioridade, coluna, usuario_id, projeto_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    const values = [
      texto, 
      prioridade || 'media', 
      coluna || 'afazer', 
      usuarioId || null, 
      projetoId || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { texto, prioridade, coluna, usuarioId, projetoId } = dados;
    const query = `
      UPDATE tarefas 
      SET texto = $1, prioridade = $2, coluna = $3, usuario_id = $4, projeto_id = $5 
      WHERE id = $6 
      RETURNING *;
    `;
    const values = [texto, prioridade, coluna, usuarioId, projetoId, id];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  remover: async (id) => {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *;', [id]);
    return result.rows[0] || null;
  }
};