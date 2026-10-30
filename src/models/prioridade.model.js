const prisma = require('../database/prisma');

module.exports = {
  listar: async () => {
    return await prisma.prioridades.findMany({
      where: { ativo: true },
      select: { id: true, nome: true },
      orderBy: { id: 'asc' },
    });
  },
};