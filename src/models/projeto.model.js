const prisma = require('../database/prisma');

function formatarId(valor) {
  if (valor === '' || valor === undefined || valor === null) return null;
  const num = Number(valor);
  return Number.isNaN(num) ? null : num;
}

module.exports = {
  listar: async () => {
    return await prisma.projetos.findMany({
      orderBy: { id: 'asc' },
    });
  },

  buscar: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    return await prisma.projetos.findUnique({
      where: { id: idNum },
    });
  },

  adicionar: async (dados) => {
    const { nome, descricao, usuario_id, usuarioId } = dados;

    return await prisma.projetos.create({
      data: {
        nome,
        descricao: descricao || null,
        usuario_id: formatarId(usuario_id || usuarioId) || 1,
      },
    });
  },

  atualizar: async (id, dados) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    const atual = await prisma.projetos.findUnique({ where: { id: idNum } });
    if (!atual) return null;

    const { nome, descricao, usuario_id, usuarioId } = dados;
    const userId = formatarId(usuario_id || usuarioId);

    return await prisma.projetos.update({
      where: { id: idNum },
      data: {
        nome: nome !== undefined ? nome : atual.nome,
        descricao: descricao !== undefined ? descricao : atual.descricao,
        usuario_id: userId !== null ? userId : atual.usuario_id,
      },
    });
  },

  remover: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    try {
      return await prisma.projetos.delete({
        where: { id: idNum },
      });
    } catch (erro) {
      if (erro.code === 'P2025') return null;
      throw erro;
    }
  },
};