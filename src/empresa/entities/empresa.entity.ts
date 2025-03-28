export interface Empresa {
  email: string;
  name: string;
  cnpj: string;
  contato: string;
  endereco: string;
  tipo: 'locadora' | 'ferragista' | 'ambos';
}