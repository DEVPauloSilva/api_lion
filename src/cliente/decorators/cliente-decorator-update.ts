import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const ClienteDecoratorUpdate = () => {
  return applyDecorators(
    Put('update:cliente_id'),
    ApiOperation({
      summary: 'Altera os dados do cliente',
      description: 'Endpoint responsável por atualizar os dados do cliente no sistema.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome completo do cliente.',
            example: 'José da Silva',
          },
          cpf: {
            type: 'string',
            description: 'CPF do cliente. Deve conter 11 dígitos.',
            example: '0943948594',
            pattern: '^[0-9]{11}$',
          },
          telefone: {
            type: 'string',
            description: 'Telefone de contato do cliente, incluindo o DDD.',
            example: '6299999999',
            pattern: '^[0-9]{10,11}$',
          },
          endereco: {
            type: 'string',
            description: 'Endereço completo do cliente, incluindo rua, número e bairro.',
            example: 'Rua 00, Número 123, Bairro Centro',
          },
          blacklist: {
            type: 'boolean',
            description: 'Indica se o cliente está na blacklist. Este campo é opcional para atualização.',
            example: false,
          },
          instituicao_negativado: {
            type: 'string',
            description: 'Nome da instituição onde o cliente está negativado, se houver. Este campo é opcional para atualização.',
            example: 'Banco XYZ',
          },
        },
      },
    }),
  );
};
