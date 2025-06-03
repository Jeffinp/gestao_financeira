import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFinancasStore } from '../store/financasStore';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Historico() {
  const { transacoes } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    tipo: 'todos',
    categoria: '',
    busca: ''
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      tipo: 'todos',
      categoria: '',
      busca: ''
    });
  };

  const transacoesFiltradas = transacoes.filter(transacao => {
    // Filtro por data início
    if (filtros.dataInicio && new Date(transacao.data) < new Date(filtros.dataInicio)) {
      return false;
    }

    // Filtro por data fim
    if (filtros.dataFim && new Date(transacao.data) > new Date(filtros.dataFim)) {
      return false;
    }

    // Filtro por tipo
    if (filtros.tipo !== 'todos' && transacao.tipo !== filtros.tipo) {
      return false;
    }

    // Filtro por categoria
    if (filtros.categoria && filtros.categoria !== 'Todas' && transacao.categoria !== filtros.categoria) {
      return false;
    }

    // Filtro por busca
    if (filtros.busca) {
      const termoBusca = filtros.busca.toLowerCase();
      return (
        transacao.descricao.toLowerCase().includes(termoBusca) ||
        transacao.categoria.toLowerCase().includes(termoBusca)
      );
    }

    return true;
  }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  // Obter todas as categorias únicas das transações
  const categoriasUnicas = Array.from(
    new Set(transacoes.map(t => t.categoria))
  ).sort();

  // Calcular resumo das transações filtradas
  const resumo = {
    total: transacoesFiltradas.length,
    totalGanhos: transacoesFiltradas
      .filter(t => t.tipo === 'ganho')
      .reduce((acc, t) => acc + t.valor, 0),
    totalGastos: transacoesFiltradas
      .filter(t => t.tipo === 'gasto')
      .reduce((acc, t) => acc + t.valor, 0),
    saldo: transacoesFiltradas.reduce((acc, t) => {
      return t.tipo === 'ganho' ? acc + t.valor : acc - t.valor;
    }, 0)
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold mb-2">Histórico Financeiro</h1>
          <p className="text-muted-foreground">Acompanhe todas as suas transações</p>
        </div>
      </motion.div>

      {/* Dashboard resumido */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="card hover-lift">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ArrowsUpDownIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xs font-medium text-muted-foreground">Transações</h2>
              {isLoading ? (
                <div className="h-6 w-16 bg-muted animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-xl font-bold mt-1">
                  {resumo.total}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover-lift">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <ArrowUpCircleIcon className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xs font-medium text-muted-foreground">Total Ganhos</h2>
              {isLoading ? (
                <div className="h-6 w-24 bg-muted animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-secondary mt-1">
                  R$ {resumo.totalGanhos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover-lift">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <ArrowDownCircleIcon className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xs font-medium text-muted-foreground">Total Gastos</h2>
              {isLoading ? (
                <div className="h-6 w-24 bg-muted animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-destructive mt-1">
                  R$ {resumo.totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover-lift">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <BanknotesIcon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-xs font-medium text-muted-foreground">Saldo</h2>
              {isLoading ? (
                <div className="h-6 w-24 bg-muted animate-pulse rounded mt-1"></div>
              ) : (
                <p className={`text-xl font-bold mt-1 ${resumo.saldo >= 0 ? 'text-secondary' : 'text-destructive'}`}>
                  R$ {resumo.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Painel de filtros */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-primary" />
            Filtros
          </h2>

          <button
            onClick={limparFiltros}
            className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUturnLeftIcon className="h-4 w-4" />
            Limpar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label htmlFor="dataInicio" className="block text-sm font-medium mb-1">
              Data Início
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                id="dataInicio"
                name="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={handleFiltroChange}
                className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dataFim" className="block text-sm font-medium mb-1">
              Data Fim
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                id="dataFim"
                name="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={handleFiltroChange}
                className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium mb-1">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
              className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="todos">Todos</option>
              <option value="ganho">Ganhos</option>
              <option value="gasto">Gastos</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium mb-1">
              Categoria
            </label>
            <select
              id="categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleFiltroChange}
              className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="">Todas</option>
              {categoriasUnicas.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="busca" className="block text-sm font-medium mb-1">
              Busca
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                id="busca"
                name="busca"
                type="text"
                value={filtros.busca}
                onChange={handleFiltroChange}
                placeholder="Buscar..."
                className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabela de transações */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-primary" />
          Transações
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse flex items-center p-3 border-b border-border/30 last:border-0">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="h-5 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : transacoesFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FunnelIcon className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-lg font-medium mb-1">Nenhuma transação encontrada</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Tente ajustar os filtros para encontrar as transações que você procura.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Descrição</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categoria</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoesFiltradas.map((transacao) => (
                  <tr key={transacao.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm">
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {transacao.descricao || <span className="text-muted-foreground italic">Sem descrição</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs badge badge-primary">
                        {transacao.categoria}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {transacao.tipo === 'ganho' ? (
                        <span className="inline-flex items-center text-xs font-medium text-secondary">
                          <ArrowUpCircleIcon className="mr-1 h-4 w-4" />
                          Ganho
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium text-destructive">
                          <ArrowDownCircleIcon className="mr-1 h-4 w-4" />
                          Gasto
                        </span>
                      )}
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium text-right ${transacao.tipo === 'ganho' ? 'text-secondary' : 'text-destructive'
                      }`}>
                      {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}