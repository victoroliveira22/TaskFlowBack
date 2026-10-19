const pool = require('../database/db');

module.exports = {
  listar: async () => {
    const result = await pool.query('SELECT * FROM projetos ORDER BY id');
    return result.rows;
  },

  buscar: async (id) => {
    const result = await pool.query('SELECT * FROM projetos WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  adicionar: async ({ nome, descricao }) => {
    const query = `
      INSERT INTO projetos (nome, descricao) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const result = await pool.query(query, [nome, descricao || null]);
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { nome, descricao } = dados;
    const query = `
      UPDATE projetos 
      SET nome = COALESCE($1, nome), descricao = COALESCE($2, descricao) 
      WHERE id = $3 
      RETURNING *;
    `;
    const result = await pool.query(query, [nome, descricao, id]);
    return result.rows[0] || null;
  },

  remover: async (id) => {
    const result = await pool.query('DELETE FROM projetos WHERE id = $1 RETURNING *;', [id]);
    return result.rows[0] || null;
  }
};