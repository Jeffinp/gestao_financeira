import { useState } from 'react';
import { useFinancasStore } from '../store/financasStore';
import { motion } from 'framer-motion';
import { ClockIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Animação para mostrar os elementos
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Historico() {
  const { transacoes } = useFinancasStore();

  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    tipo: 'todos',
    categoria: '',
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

    return true;
  }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  // Obter todas as categorias únicas das transações
  const categoriasUnicas = Array.from(
    new Set(transacoes.map(t => t.categoria))
  ).sort();

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-fluid-3xl font-bold text-balance mb-2">Histórico Financeiro</h1>
          <p className="text-muted-foreground">Visualize e filtre todas as suas transações</p>
        </div>
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card hover-lift rounded-xl shadow-card mb-8"
      >
        <div className="p-6 border-b border-border/20 flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-shop-primary" />
          <h2 className="text-lg font-medium">Filtros</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="dataInicio" className="block text-sm font-medium mb-1">
                Data Início
              </label>
              <input
                id="dataInicio"
                name="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={handleFiltroChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="dataFim" className="block text-sm font-medium mb-1">
                Data Fim
              </label>
              <input
                id="dataFim"
                name="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={handleFiltroChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
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
                className="w-full rounded-md border border-input bg-background px-3 py-2"
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
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Todas">Todas</option>
                {categoriasUnicas.map((categoria, index) => (
                  <option key={index} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={limparFiltros}
              className="flex items-center gap-1 px-4 py-2 rounded-md border border-input bg-background hover:bg-secondary transition"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Limpar Filtros</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden"
      >
        <div className="p-6 border-b border-border/20 flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-shop-primary" />
          <h2 className="text-lg font-medium">Linha do Tempo</h2>
        </div>

        <div className="p-6">
          {transacoesFiltradas.length > 0 ? (
            <div className="space-y-6">
              {transacoesFiltradas.map((transacao, index) => (
                <motion.div 
                  key={transacao.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="relative pl-8 pb-6 border-l-2 border-shop-primary"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-shop-primary"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{transacao.descricao}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transacao.data).toLocaleDateString('pt-BR')} • {transacao.categoria}
                      </p>
                    </div>
                    <span className={`font-bold ${transacao.tipo === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                      {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>Nenhuma transação encontrada para os filtros selecionados.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}