const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');
const criarErro = require('../utils/criarErro');

const authController = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        throw criarErro(400, 'Email e senha são obrigatórios');
      }

      const usuario = await usuarioModel.buscarPorEmail(email);
      if (!usuario) {
        throw criarErro(401, 'Credenciais inválidas');
      }

      if (usuario.senha_hash !== senha) {
        throw criarErro(401, 'Credenciais inválidas');
      }

      const secret = process.env.JWT_SECRET || 'secret_fallback_key';

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        secret,
        { expiresIn: '8h' }
      );

      res.json({
        token,
        usuario: { id: usuario.id, nome: usuario.nome }
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;