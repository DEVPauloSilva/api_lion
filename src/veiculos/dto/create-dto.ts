import {
  IsString
} from 'class-validator';

export class CreateVeiculoDto extends Veiculos{
  @isString()
  modelo: string;

  @IsString()
  marca: string;

  @IsString()
  placa: string;

  @IsInt()
  ano: number;

  @IsString()
  cor: string;

  @IsString()
  tipo: string;

  @IsString()
  status: string; // Adicionando status, que parece ser obrigatório no Prisma

  @IsString()
  empresa_id: string; // Adicionando o id da empresa que está associada ao veículo
}
