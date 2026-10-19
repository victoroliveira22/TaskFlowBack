const usuariosRepo = require('../models/usuario.model');
const tarefasRepo = require('../models/tarefa.model');

exports.listar = async (req, res) => {
  try {
    const usuarios = await usuariosRepo.listar();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const u = await usuariosRepo.buscar(Number(req.params.id));
    if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(u);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Informe nome e email!' });
    }

    const usuarioExiste = await usuariosRepo.buscarPorEmail(email);
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Esse email já está cadastrado' });
    }

    const novoUsuario = await usuariosRepo.adicionar({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const atualizado = await usuariosRepo.atualizar(id, req.body);
    if (!atualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(atualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.remover = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await usuariosRepo.buscar(id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const tarefasDoUsuario = await tarefasRepo.listar({ usuarioId: id });
    if (tarefasDoUsuario.length > 0) {
      return res.status(400).json({ erro: 'Usuário possui tarefas. Remova as tarefas antes.' });
    }

    const removido = await usuariosRepo.remover(id);
    res.json({ mensagem: 'Usuário deletado com sucesso', usuario: removido });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};