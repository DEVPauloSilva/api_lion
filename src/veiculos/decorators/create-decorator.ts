import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const VeiculoCreateDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Criação de um novo veículo',
      description: 'Endpoint responsável pela criação de um novo veículo.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          modelo: { type: 'string', example: 'Fusca' },
          marca: { type: 'string', example: 'Volkswagen' },
          placa: { type: 'string', example: 'ABC-1234' },
          ano: { type: 'integer', example: 2000 },
          cor: { type: 'string', example: 'Azul' },
          tipo: { type: 'string', example: 'Sedan' },
          status: { type: 'string', example: 'Disponível' },
          empresa_id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        },
      },
    }),
    Post(),
  );
};
