const prisma = require('../database/prisma');

function formatarId(valor) {
  if (valor === '' || valor === undefined || valor === null) return null;
  const num = Number(valor);
  return Number.isNaN(num) ? null : num;
}

const incluirNomes = {
  projetos: { select: { nome: true } },
  usuarios: { select: { nome: true } },
  prioridades: { select: { nome: true } },
};

function formatarTarefa(tarefa) {
  if (!tarefa) return null;
  const { projetos, usuarios, prioridades, ...resto } = tarefa;
  return {
    ...resto,
    projeto: projetos?.nome || null,
    usuario: usuarios?.nome || null,
    prioridade: prioridades?.nome || null,
  };
}

module.exports = {
  listar: async () => {
    const tarefas = await prisma.tarefas.findMany({
      include: incluirNomes,
      orderBy: { id: 'asc' },
    });
    return tarefas.map(formatarTarefa);
  },

  buscar: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    const tarefa = await prisma.tarefas.findUnique({
      where: { id: idNum },
      include: incluirNomes,
    });
    return formatarTarefa(tarefa);
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
      ordem,
    } = dados;

    const prioId = formatarId(idprioridade !== undefined ? idprioridade : prioridade) || 2;
    const userId = formatarId(usuario_id || usuarioId);
    const projId = formatarId(projeto_id || projetoId);

    const tarefa = await prisma.tarefas.create({
      data: {
        texto,
        coluna: coluna || 'todo',
        ordem: Number(ordem) || 0,
        idprioridade: prioId,
        usuario_id: userId,
        projeto_id: projId,
      },
      include: incluirNomes,
    });

    return formatarTarefa(tarefa);
  },

  atualizar: async (id, dados) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    const atual = await prisma.tarefas.findUnique({ where: { id: idNum } });
    if (!atual) return null;

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
    const userId = formatarId(usuario_id || usuarioId);
    const projId = formatarId(projeto_id || projetoId);

    let iniciadaEm = atual.iniciada_em;
    let concluidaEm = atual.concluida_em;

    const novaColuna = coluna || atual.coluna;
    if (novaColuna === 'emAndamento' && !iniciadaEm) iniciadaEm = new Date();
    if (novaColuna === 'concluido' && !concluidaEm) concluidaEm = new Date();

    const tarefa = await prisma.tarefas.update({
      where: { id: idNum },
      data: {
        texto: texto !== undefined ? texto : atual.texto,
        coluna: novaColuna,
        idprioridade: prioId !== null ? prioId : atual.idprioridade,
        usuario_id: userId !== null ? userId : atual.usuario_id,
        projeto_id: projId !== null ? projId : atual.projeto_id,
        iniciada_em: iniciadaEm,
        concluida_em: concluidaEm,
      },
      include: incluirNomes,
    });

    return formatarTarefa(tarefa);
  },

  remover: async (id) => {
    const idNum = formatarId(id);
    if (!idNum) return null;

    try {
      const tarefa = await prisma.tarefas.delete({
        where: { id: idNum },
        include: incluirNomes,
      });
      return formatarTarefa(tarefa);
    } catch (erro) {
      if (erro.code === 'P2025') return null;
      throw erro;
    }
  },
};