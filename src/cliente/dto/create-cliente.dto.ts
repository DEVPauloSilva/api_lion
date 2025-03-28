import { IsString } from "class-validator";

import { IsBoolean, IsOptional } from "class-validator";

export class CreateClienteDto {
  @IsString()
  nome: string;

  @IsString()
  @IsOptional() // CPF é opcional
  cpf?: string;

  @IsString()
  @IsOptional() // Telefone é opcional
  telefone?: string;

  @IsString()
  @IsOptional() // Endereço é opcional
  endereco?: string;

  @IsString()
  empresa_id: string;  // Relacionamento obrigatório com o usuário

  @IsBoolean()
  @IsOptional()  // Blacklist pode ser opcional (caso não seja fornecido, assume o valor padrão)
  blacklist?: boolean;

  @IsString()
  @IsOptional()  // Campo de instituição negativado também opcional
  instituicao_negativado?: string;
}
