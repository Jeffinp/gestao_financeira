import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFinancasStore } from '../store/financasStore';
import {
  ArrowDownCircleIcon,
  CalendarIcon,
  TagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Gastos() {
  const { categorias, transacoes, adicionarTransacao } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar apenas categorias de gastos
  const categoriasGasto = categorias.filter(cat => cat.tipo === 'gasto' || cat.tipo === 'ambos');

  // Filtrar apenas transações do tipo gasto
  const gastos = transacoes
    .filter(t => t.tipo === 'gasto')
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const [formData, setFormData] = useState({
    valor: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    recorrente: false,
    periodo: 'mensal'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.valor || !formData.categoria || !formData.data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    // Criar objeto de transação e adicionar ao store
    const novoGasto = {
      valor: parseFloat(formData.valor),
      categoria: formData.categoria,
      data: formData.data,
      descricao: formData.descricao,
      recorrente: formData.recorrente,
      periodo: formData.periodo as 'semanal' | 'quinzenal' | 'mensal' | 'anual',
      tipo: 'gasto' as const
    };

    adicionarTransacao(novoGasto);

    // Feedback visual de sucesso
    const successFeedback = document.getElementById('success-feedback');
    if (successFeedback) {
      successFeedback.classList.remove('opacity-0');
      setTimeout(() => {
        successFeedback?.classList.add('opacity-0');
      }, 3000);
    }

    // Reset do formulário
    setFormData({
      valor: '',
      categoria: '',
      data: new Date().toISOString().split('T')[0],
      descricao: '',
      recorrente: false,
      periodo: 'mensal'
    });
  };

  // Calcular estatísticas para o dashboard
  const totalGastoMes = gastos
    .filter(g => {
      const dataGasto = new Date(g.data);
      const hoje = new Date();
      return dataGasto.getMonth() === hoje.getMonth() && dataGasto.getFullYear() === hoje.getFullYear();
    })
    .reduce((acc, g) => acc + g.valor, 0);

  // Agrupar gastos por categoria para o gráfico
  const gastosPorCategoria = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) {
      acc[gasto.categoria] = 0;
    }
    acc[gasto.categoria] += gasto.valor;
    return acc;
  }, {} as Record<string, number>);

  // Obter top 3 categorias
  const topCategorias = Object.entries(gastosPorCategoria)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([categoria, valor]) => ({ categoria, valor }));

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold mb-2">Registrar Gastos</h1>
          <p className="text-muted-foreground">Controle suas despesas de forma eficiente</p>
        </div>

        <div
          id="success-feedback"
          className="fixed top-20 right-4 bg-destructive/90 text-destructive-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-300 opacity-0 z-50"
        >
          <CheckCircleIcon className="h-5 w-5" />
          <span>Gasto registrado com sucesso!</span>
        </div>
      </motion.div>

      {/* Dashboard resumido */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="card hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-destructive/10 rounded-xl">
              <CurrencyDollarIcon className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Total no Mês</h2>
              {isLoading ? (
                <div className="h-8 w-28 bg-muted animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-destructive mt-1">
                  R$ {totalGastoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-primary/10 rounded-xl">
              <ChartBarIcon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-medium text-muted-foreground">Top Categorias</h2>
              {isLoading ? (
                <div className="h-8 w-full bg-muted animate-pulse rounded mt-1"></div>
              ) : topCategorias.length > 0 ? (
                <div className="mt-2 space-y-1.5">
                  {topCategorias.map((cat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate max-w-[150px]">
                        {cat.categoria}
                      </span>
                      <span className="text-sm text-destructive font-medium">
                        R$ {cat.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Sem dados</p>
              )}
            </div>
          </div>
        </div>

        <div className="card hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-muted rounded-xl">
              <ClockIcon className="h-7 w-7 text-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Último Gasto</h2>
              {isLoading ? (
                <div className="h-8 w-28 bg-muted animate-pulse rounded mt-1"></div>
              ) : gastos.length > 0 ? (
                <div className="mt-1">
                  <p className="text-base font-medium">
                    {gastos[0].descricao || gastos[0].categoria}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-destructive font-medium">
                      R$ {gastos[0].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(gastos[0].data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Sem registros</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de cadastro */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="card sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowDownCircleIcon className="h-5 w-5 text-destructive" />
              Novo Gasto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-foreground mb-1">
                  Valor (R$)*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-destructive focus:border-destructive transition-all duration-200"
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-foreground mb-1">
                  Categoria*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-destructive focus:border-destructive transition-all duration-200"
                    required
                  >
                    <option value="">Selecionar categoria...</option>
                    {categoriasGasto.map((cat) => (
                      <option key={cat.id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium text-foreground mb-1">
                  Data*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-destructive focus:border-destructive transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-1">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-destructive focus:border-destructive transition-all duration-200"
                  placeholder="Detalhes adicionais sobre o gasto..."
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recorrente"
                  name="recorrente"
                  checked={formData.recorrente}
                  onChange={handleChange}
                  className="w-4 h-4 text-destructive bg-card border-input rounded focus:ring-destructive transition-all duration-200"
                />
                <label htmlFor="recorrente" className="ml-2 text-sm font-medium text-foreground">
                  Gasto recorrente
                </label>
              </div>

              {formData.recorrente && (
                <div>
                  <label htmlFor="periodo" className="block text-sm font-medium text-foreground mb-1">
                    Período
                  </label>
                  <select
                    id="periodo"
                    name="periodo"
                    value={formData.periodo}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-destructive focus:border-destructive transition-all duration-200"
                  >
                    <option value="semanal">Semanal</option>
                    <option value="quinzenal">Quinzenal</option>
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground font-medium py-2.5 px-4 rounded-lg shadow-sm hover:bg-destructive/90 transition-all duration-200"
              >
                <ArrowDownCircleIcon className="h-5 w-5" />
                Registrar Gasto
              </button>
            </form>
          </div>
        </motion.div>

        {/* Lista de gastos recentes */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-primary" />
              Gastos Recentes
            </h2>

            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse flex items-center p-3 border-b border-border/30 last:border-0">
                  <div className="w-10 h-10 bg-muted rounded-lg"></div>
                  <div className="ml-3 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
              ))
            ) : gastos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <ArrowDownCircleIcon className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <h3 className="text-lg font-medium mb-1">Nenhum gasto registrado</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  Registre seu primeiro gasto utilizando o formulário ao lado.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/30">
                {gastos.slice(0, 10).map((gasto, index) => (
                  <div key={index} className="py-3 flex items-start justify-between hover:bg-muted/20 rounded-lg px-2 transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-destructive/10 text-destructive rounded-lg mr-3">
                        <TagIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{gasto.descricao || gasto.categoria}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(gasto.data).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="text-xs badge badge-destructive">
                            {gasto.categoria}
                          </span>
                          {gasto.recorrente && (
                            <span className="text-xs badge badge-primary">
                              Recorrente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-destructive font-medium">
                      - R$ {gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}

                {gastos.length > 10 && (
                  <div className="pt-4 text-center">
                    <a href="/historico" className="text-sm text-primary hover:underline">
                      Ver todos os gastos →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}