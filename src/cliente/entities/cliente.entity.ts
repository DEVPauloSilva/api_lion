export class Cliente {
    nome: string;
    cpf?: string;
    telefone?: string;
    endereco?: string;
    empresa_id: string;  // Relacionamento obrigatório com o usuário
    blacklist?: boolean;  // Campo que indica se o cliente está na blacklist (opcional)
    instituicao_negativado?: string;  // Onde o cliente está negativado (opcional)
}
