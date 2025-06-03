import { create } from 'zustand';
import type { Transacao, Categoria, Lembrete } from '../types';

// Definição do estado e ações da store
interface FinancasState {
  // Estado
  saldo: number;
  transacoes: Transacao[];
  categorias: Categoria[];
  lembretes: Lembrete[];

  // Ações para transações
  adicionarTransacao: (transacao: Omit<Transacao, 'id'>) => void;
  removerTransacao: (id: number) => void;
  editarTransacao: (id: number, transacao: Partial<Omit<Transacao, 'id'>>) => void;

  // Ações para categorias
  adicionarCategoria: (categoria: Omit<Categoria, 'id'>) => void;
  removerCategoria: (id: number) => void;
  editarCategoria: (id: number, categoria: Partial<Omit<Categoria, 'id'>>) => void;

  // Ações para lembretes
  adicionarLembrete: (lembrete: Omit<Lembrete, 'id'>) => void;
  removerLembrete: (id: number) => void;
  editarLembrete: (id: number, lembrete: Partial<Omit<Lembrete, 'id'>>) => void;
}

// Dados iniciais
// Categorias
const categoriasIniciais: Categoria[] = [
  { id: 1, nome: 'Alimentação', tipo: 'gasto' },
  { id: 2, nome: 'Transporte', tipo: 'gasto' },
  { id: 3, nome: 'Moradia', tipo: 'gasto' },
  { id: 4, nome: 'Saúde', tipo: 'gasto' },
  { id: 5, nome: 'Educação', tipo: 'gasto' },
  { id: 6, nome: 'Lazer', tipo: 'gasto' },
  { id: 7, nome: 'Outros Gastos', tipo: 'gasto' },
  { id: 8, nome: 'Salário', tipo: 'ganho' },
  { id: 9, nome: 'Freelance', tipo: 'ganho' },
  { id: 10, nome: 'Investimentos', tipo: 'ganho' },
  { id: 11, nome: 'Outros Ganhos', tipo: 'ganho' },
];

// Transações
const transacoesIniciais: Transacao[] = [
  { id: 1, tipo: 'gasto', valor: 157.35, categoria: 'Alimentação', data: '2023-08-12', descricao: 'Supermercado', recorrente: false },
  { id: 2, tipo: 'ganho', valor: 3500.00, categoria: 'Salário', data: '2023-08-05', descricao: 'Salário mensal', recorrente: true },
  { id: 3, tipo: 'gasto', valor: 89.90, categoria: 'Transporte', data: '2023-08-10', descricao: 'Combustível', recorrente: false },
  { id: 4, tipo: 'gasto', valor: 1200.00, categoria: 'Moradia', data: '2023-08-05', descricao: 'Aluguel', recorrente: true },
  { id: 5, tipo: 'ganho', valor: 450.00, categoria: 'Freelance', data: '2023-08-15', descricao: 'Projeto de design', recorrente: false },
  { id: 6, tipo: 'ganho', valor: 250.00, categoria: 'Investimentos', data: '2023-08-20', descricao: 'Dividendos', recorrente: false },
];

// Lembretes
const lembretesIniciais: Lembrete[] = [
  { id: 1, titulo: 'Pagamento do Aluguel', descricao: 'Vencimento do aluguel', data: '2023-09-05', valor: 1200, tipo: 'gasto', notificar: true },
  { id: 2, titulo: 'Recebimento do Salário', descricao: 'Depósito do salário mensal', data: '2023-09-05', valor: 3500, tipo: 'ganho', notificar: true },
  { id: 3, titulo: 'Fatura do Cartão', descricao: 'Vencimento da fatura do cartão de crédito', data: '2023-09-10', valor: 850, tipo: 'gasto', notificar: true },
  { id: 4, titulo: 'Consulta Médica', descricao: 'Consulta com Dr. Silva', data: '2023-09-15', notificar: false },
];

// Função para calcular o saldo inicial
const calcularSaldoInicial = (transacoes: Transacao[]): number => {
  return transacoes.reduce((acc, transacao) => {
    if (transacao.tipo === 'ganho') {
      return acc + transacao.valor;
    } else {
      return acc - transacao.valor;
    }
  }, 0);
};

// Criação da store usando Zustand
export const useFinancasStore = create<FinancasState>((set) => ({
  // Estado inicial
  saldo: calcularSaldoInicial(transacoesIniciais),
  transacoes: transacoesIniciais,
  categorias: categoriasIniciais,
  lembretes: lembretesIniciais,

  // Ações para transações
  adicionarTransacao: (transacao) => set((state) => {
    const novaTransacao: Transacao = {
      id: Math.max(0, ...state.transacoes.map((t: Transacao) => t.id)) + 1,
      ...transacao
    };

    // Atualiza o saldo
    const novoSaldo = transacao.tipo === 'ganho'
      ? state.saldo + transacao.valor
      : state.saldo - transacao.valor;

    return {
      transacoes: [novaTransacao, ...state.transacoes],
      saldo: novoSaldo
    };
  }),

  removerTransacao: (id: number) => set((state) => {
    const transacao = state.transacoes.find((t: Transacao) => t.id === id);
    if (!transacao) return state;

    // Atualiza o saldo ao remover
    const novoSaldo = transacao.tipo === 'ganho'
      ? state.saldo - transacao.valor
      : state.saldo + transacao.valor;

    return {
      transacoes: state.transacoes.filter((t: Transacao) => t.id !== id),
      saldo: novoSaldo
    };
  }),

  editarTransacao: (id: number, dadosAtualizados: Partial<Omit<Transacao, 'id'>>) => set((state) => {
    const transacaoIndex = state.transacoes.findIndex((t: Transacao) => t.id === id);
    if (transacaoIndex === -1) return state;

    const transacaoAntiga = state.transacoes[transacaoIndex];

    // Cria a transação atualizada
    const transacaoAtualizada = {
      ...transacaoAntiga,
      ...dadosAtualizados
    };

    // Calcula o impacto no saldo
    let novoSaldo = state.saldo;

    // Remove o valor da transação antiga do saldo
    if (transacaoAntiga.tipo === 'ganho') {
      novoSaldo -= transacaoAntiga.valor;
    } else {
      novoSaldo += transacaoAntiga.valor;
    }

    // Adiciona o valor da transação nova ao saldo
    if (transacaoAtualizada.tipo === 'ganho') {
      novoSaldo += transacaoAtualizada.valor;
    } else {
      novoSaldo -= transacaoAtualizada.valor;
    }

    // Atualiza a lista de transações
    const novasTransacoes = [...state.transacoes];
    novasTransacoes[transacaoIndex] = transacaoAtualizada;

    return {
      transacoes: novasTransacoes,
      saldo: novoSaldo
    };
  }),

  // Ações para categorias
  adicionarCategoria: (categoria) => set((state) => ({
    categorias: [
      ...state.categorias,
      { id: Math.max(0, ...state.categorias.map((c: Categoria) => c.id)) + 1, ...categoria }
    ]
  })),

  removerCategoria: (id: number) => set((state) => ({
    categorias: state.categorias.filter((c: Categoria) => c.id !== id)
  })),

  editarCategoria: (id: number, dadosAtualizados: Partial<Omit<Categoria, 'id'>>) => set((state) => {
    const categoriaIndex = state.categorias.findIndex((c: Categoria) => c.id === id);
    if (categoriaIndex === -1) return state;

    const novasCategorias = [...state.categorias];
    novasCategorias[categoriaIndex] = {
      ...novasCategorias[categoriaIndex],
      ...dadosAtualizados
    };

    return { categorias: novasCategorias };
  }),

  // Ações para lembretes
  adicionarLembrete: (lembrete) => set((state) => ({
    lembretes: [
      ...state.lembretes,
      { id: Math.max(0, ...state.lembretes.map((l: Lembrete) => l.id)) + 1, ...lembrete }
    ]
  })),

  removerLembrete: (id: number) => set((state) => ({
    lembretes: state.lembretes.filter((l: Lembrete) => l.id !== id)
  })),

  editarLembrete: (id: number, dadosAtualizados: Partial<Omit<Lembrete, 'id'>>) => set((state) => {
    const lembreteIndex = state.lembretes.findIndex((l: Lembrete) => l.id === id);
    if (lembreteIndex === -1) return state;

    const novosLembretes = [...state.lembretes];
    novosLembretes[lembreteIndex] = {
      ...novosLembretes[lembreteIndex],
      ...dadosAtualizados
    };

    return { lembretes: novosLembretes };
  }),
}));