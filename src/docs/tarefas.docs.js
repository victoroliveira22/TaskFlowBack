const { json, parametroId } = require('./comum');

const schemas = {
  Tarefa: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      texto: { type: 'string', example: 'Revisar layout' },
      coluna: { type: 'string', enum: ['afazer', 'emAndamento', 'concluido'] },
      ordem: { type: 'integer', example: 0 },
      usuario_id: { type: 'integer', example: 1 },
      projeto_id: { type: 'integer', example: 1 },
      idprioridade: { type: 'integer', example: 2 },
      criado_em: { type: 'string', format: 'date-time' },
      iniciada_em: { type: 'string', format: 'date-time', nullable: true },
      concluida_em: { type: 'string', format: 'date-time', nullable: true },
      projeto: { type: 'string', example: 'Projeto Alfa' },
      usuario: { type: 'string', example: 'João Silva' },
      prioridade: { type: 'string', example: 'Média' },
    },
  },
  TarefaEntrada: {
    type: 'object',
    required: ['texto', 'usuario_id', 'projeto_id'],
    properties: {
      texto: { type: 'string', example: 'Revisar layout' },
      coluna: { type: 'string', example: 'afazer' },
      ordem: { type: 'integer', example: 0 },
      idprioridade: { type: 'integer', example: 2 },
      usuario_id: { type: 'integer', example: 1 },
      projeto_id: { type: 'integer', example: 1 },
    },
  },
};

const paths = {
  '/tarefas': {
    get: {
      tags: ['Tarefas'],
      summary: 'Lista todas as tarefas',
      responses: {
        '200': {
          description: 'Lista de tarefas',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Tarefa' } },
            },
          },
        },
        '401': { description: 'Não autorizado', content: json('Erro') },
      },
    },
    post: {
      tags: ['Tarefas'],
      summary: 'Cria uma nova tarefa',
      requestBody: { required: true, content: json('TarefaEntrada') },
      responses: {
        '201': { description: 'Tarefa criada', content: json('Tarefa') },
        '400': { description: 'Dados inválidos', content: json('Erro') },
        '401': { description: 'Não autorizado', content: json('Erro') },
      },
    },
  },
  '/tarefas/{id}': {
    get: {
      tags: ['Tarefas'],
      summary: 'Busca uma tarefa pelo id',
      parameters: [parametroId],
      responses: {
        '200': { description: 'Tarefa encontrada', content: json('Tarefa') },
        '400': { description: 'Id inválido', content: json('Erro') },
        '401': { description: 'Não autorizado', content: json('Erro') },
        '404': { description: 'Tarefa não encontrada', content: json('Erro') },
      },
    },
    put: {
      tags: ['Tarefas'],
      summary: 'Atualiza uma tarefa',
      parameters: [parametroId],
      requestBody: { required: true, content: json('TarefaEntrada') },
      responses: {
        '200': { description: 'Tarefa atualizada', content: json('Tarefa') },
        '400': { description: 'Dados inválidos', content: json('Erro') },
        '401': { description: 'Não autorizado', content: json('Erro') },
        '404': { description: 'Tarefa não encontrada', content: json('Erro') },
      },
    },
    delete: {
      tags: ['Tarefas'],
      summary: 'Exclui uma tarefa',
      parameters: [parametroId],
      responses: {
        '200': {
          description: 'Tarefa excluída',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  mensagem: { type: 'string', example: 'Tarefa removida' },
                  tarefa: { $ref: '#/components/schemas/Tarefa' },
                },
              },
            },
          },
        },
        '401': { description: 'Não autorizado', content: json('Erro') },
        '404': { description: 'Tarefa não encontrada', content: json('Erro') },
      },
    },
  },
};

module.exports = { paths, schemas };