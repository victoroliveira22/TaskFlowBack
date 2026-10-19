const pool = require('../database/db');

module.exports = {
  listar: async () => {
    const result = await pool.query('SELECT id, nome, email FROM usuarios ORDER BY id');
    return result.rows;
  },

  buscar: async (id) => {
    const result = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  buscarPorEmail: async (email) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0] || null;
  },

  adicionar: async ({ nome, email, senha }) => {
    const query = `
      INSERT INTO usuarios (nome, email, senha) 
      VALUES ($1, $2, $3) 
      RETURNING id, nome, email;
    `;
    const result = await pool.query(query, [nome, email, senha]);
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { nome, email, senha } = dados;
    const query = `
      UPDATE usuarios 
      SET nome = COALESCE($1, nome), 
          email = COALESCE($2, email), 
          senha = COALESCE($3, senha) 
      WHERE id = $4 
      RETURNING id, nome, email;
    `;
    const result = await pool.query(query, [nome, email, senha, id]);
    return result.rows[0] || null;
  },

  remover: async (id) => {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, email;',
      [id]
    );
    return result.rows[0] || null;
  }
};