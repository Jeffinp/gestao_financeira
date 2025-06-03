import { useState } from 'react';
import { useFinancasStore } from '../store/financasStore';
import type { Transacao } from '../types';

export default function Historico() {
  const { transacoes, categorias } = useFinancasStore();

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
    <div className="container pt-24 pb-10">
      <h1 className="text-2xl font-bold mb-6">Histórico Financeiro</h1>

      <div className="bg-card rounded-lg shadow mb-8">
        <div className="p-6 border-b border-border">
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
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-secondary transition"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-medium">Linha do Tempo</h2>
        </div>

        <div className="p-6">
          {transacoesFiltradas.length > 0 ? (
            <div className="space-y-6">
              {transacoesFiltradas.map(transacao => (
                <div key={transacao.id} className="relative pl-8 pb-6 border-l-2 border-primary">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>Nenhuma transação encontrada para os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 