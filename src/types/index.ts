// Tipos para transações
export interface Transacao {
  id: number;
  valor: number;
  categoria: string;
  data: string;
  descricao: string;
  recorrente: boolean;
  tipo: 'ganho' | 'gasto';
  periodo?: string; // Adicionando a propriedade opcional 'periodo'
}

// Tipos para categorias
export interface Categoria {
  id: number;
  nome: string;
  tipo: 'ganho' | 'gasto' | 'ambos';
  icone?: string;
}

// Tipos para lembretes
export interface Lembrete {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  valor?: number;
  tipo?: 'ganho' | 'gasto';
  notificar: boolean;
}

// Tipos para usuário
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  configuracoes: {
    tema: 'light' | 'dark';
    moeda: string;
    notificacoes: boolean;
  };
}

// Tipos para relatórios
export interface DadosRelatorio {
  periodo: string;
  totalGanhos: number;
  totalGastos: number;
  saldo: number;
  gastosPorCategoria: Record<string, number>;
  ganhosPorCategoria: Record<string, number>;
  transacoes: Transacao[];
}