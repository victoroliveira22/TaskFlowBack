const prisma = require('../database/prisma');

function formatarId(valor) {
  if (valor === '' || valor === undefined || valor === null) return null;
  const num = Number(valor);
  return Number.isNaN(num) ? null : num;
}

const camposSeguros = {
  id: true,
  nome: true,
  email: true,
};

module.exports = {
  listar: async () => {
    return await prisma.usuarios.findMany({
      select: camposSeguros,
      orderBy: { id: 'asc' },
    });
  },

  buscar: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    return await prisma.usuarios.findUnique({
      where: { id: idNum },
      select: camposSeguros,
    });
  },

  buscarPorEmail: async (email) => {
    if (!email) return null;
    return await prisma.usuarios.findUnique({
      where: { email },
    });
  },

  adicionar: async (dados) => {
    const { nome, email, senha, senha_hash } = dados;

    return await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha_hash: senha || senha_hash,
      },
      select: camposSeguros,
    });
  },

  atualizar: async (id, dados) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    const atual = await prisma.usuarios.findUnique({ where: { id: idNum } });
    if (!atual) return null;

    const { nome, email, senha, senha_hash } = dados;

    return await prisma.usuarios.update({
      where: { id: idNum },
      data: {
        nome: nome !== undefined ? nome : atual.nome,
        email: email !== undefined ? email : atual.email,
        senha_hash: (senha || senha_hash) !== undefined ? (senha || senha_hash) : atual.senha_hash,
      },
      select: camposSeguros,
    });
  },

  remover: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    try {
      return await prisma.usuarios.delete({
        where: { id: idNum },
        select: camposSeguros,
      });
    } catch (erro) {
      if (erro.code === 'P2025') return null;
      throw erro;
    }
  },
};