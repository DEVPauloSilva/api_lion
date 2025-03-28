import { IsString, IsEnum } from "class-validator";

export class CreateEmpresaDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  cnpj: string;

  @IsString()
  contato: string;

  @IsString()
  endereco: string;

  @IsEnum(['locadora', 'ferragista', 'ambos'])
  tipo: 'locadora' | 'ferragista' | 'ambos';
}
