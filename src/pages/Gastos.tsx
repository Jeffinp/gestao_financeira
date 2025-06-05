import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFinancasStore } from '../store/financasStore';
import { ArrowDownCircle, RotateCcw, Calendar, Tag, DollarSign, Clock, CheckCircle, BarChart } from 'lucide-react';

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
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold text-balance">Registrar Gastos</h1>
          <p className="text-muted-foreground mt-1">Controle suas despesas de forma eficiente</p>
        </div>

        <button
          className="mt-3 md:mt-0 flex items-center gap-2 text-sm hover:text-shop-primary transition-colors"
          onClick={() => window.location.reload()}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Atualizar dados</span>
        </button>
      </motion.div>

      {/* Dashboard resumido */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-card hover-lift rounded-xl shadow-card p-5 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500 bg-opacity-10 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Total no Mês</h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-red-500">
                  R$ {totalGastoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card hover-lift rounded-xl shadow-card p-5 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-shop-primary bg-opacity-10 rounded-lg">
              <BarChart className="h-6 w-6 text-shop-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-medium text-muted-foreground">Top Categorias</h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : topCategorias.length > 0 ? (
                <p className="text-sm font-medium mt-1 truncate">
                  {topCategorias[0].categoria}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Sem dados</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card hover-lift rounded-xl shadow-card p-5 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-500 bg-opacity-10 rounded-lg">
              <Clock className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Último Gasto</h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : gastos.length > 0 ? (
                <p className="text-sm font-medium mt-1">
                  {new Date(gastos[0].data).toLocaleDateString('pt-BR')}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Sem registros</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">              <div className="flex items-center gap-2">
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-medium">Novo Gasto</h2>
            </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div id="success-feedback" className="bg-shop-success bg-opacity-10 text-shop-success text-sm p-3 rounded-md flex items-center gap-2 transition-opacity duration-300 opacity-0">
                    <CheckCircle className="h-5 w-5" />
                    <span>Gasto registrado com sucesso!</span>
                  </div>

                  <div>
                    <label htmlFor="valor" className="block text-sm font-medium mb-1">
                      Valor (R$) <span className="text-shop-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                      <input
                        id="valor"
                        name="valor"
                        type="number"
                        step="0.01"
                        required
                        value={formData.valor}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="categoria" className="block text-sm font-medium mb-1">
                      Categoria <span className="text-shop-error">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="categoria"
                        name="categoria"
                        required
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categoriasGasto.map(cat => (
                          <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="data" className="block text-sm font-medium mb-1">
                      Data <span className="text-shop-error">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="data"
                        name="data"
                        type="date"
                        required
                        value={formData.data}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      rows={3}
                      value={formData.descricao}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      placeholder="Detalhes sobre o gasto..."
                    ></textarea>
                  </div>

                  <div className="flex items-center bg-secondary/30 p-3 rounded-md">
                    <input
                      id="recorrente"
                      name="recorrente"
                      type="checkbox"
                      checked={formData.recorrente}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-input text-red-500 focus:ring-red-500"
                    />
                    <label htmlFor="recorrente" className="ml-2 block text-sm">
                      Gasto recorrente
                    </label>
                  </div>

                  {formData.recorrente && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="periodo" className="block text-sm font-medium mb-1">
                        Período
                      </label>
                      <select
                        id="periodo"
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      >
                        <option value="diario">Diário</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                      </select>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-button hover:shadow-button-hover transition-all duration-300 hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
                  >                    <ArrowDownCircle className="h-5 w-5" />
                    <span>Registrar Gasto</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">              <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-shop-primary" />
              <h2 className="text-lg font-medium">Histórico de Gastos</h2>
            </div>
              <span className="text-sm bg-secondary-50 px-3 py-1 rounded-full">
                {gastos.length} {gastos.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>

            <div className="p-4 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="space-y-4 p-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-4 animate-pulse">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="h-5 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : gastos.length > 0 ? (
                <div className="space-y-3">
                  {gastos.map((gasto, index) => (
                    <motion.div
                      key={gasto.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="flex justify-between items-center p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowDownCircle className="h-5 w-5 text-red-500" />
                      </div>
                        <div>
                          <p className="font-medium">{gasto.descricao || 'Sem descrição'}</p>
                          <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                            <span className="bg-secondary-50 px-2 py-0.5 rounded-full">
                              {gasto.categoria}
                            </span>
                            <span>•</span>
                            <span>{new Date(gasto.data).toLocaleDateString('pt-BR')}</span>
                            {gasto.recorrente && (
                              <>
                                <span>•</span>
                                <span className="text-shop-primary">Recorrente ({gasto.periodo || 'mensal'})</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-red-500 whitespace-nowrap">
                        - R$ {gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ArrowDownCircle className="h-8 w-8 text-gray-400" />
                </div>
                  <h3 className="text-lg font-medium mb-1">Sem gastos registrados</h3>
                  <p className="text-muted-foreground max-w-md">
                    Você ainda não registrou nenhum gasto. Use o formulário ao lado para adicionar seu primeiro registro.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Top categorias */}
          {!isLoading && topCategorias.length > 0 && (
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden"
            >
              <div className="p-6 border-b border-border/50">
                <h2 className="text-lg font-medium">Top Categorias de Gastos</h2>
              </div>

              <div className="p-6 space-y-4">
                {topCategorias.map((cat, index) => {
                  const percentage = (cat.valor / totalGastoMes) * 100;
                  return (
                    <div key={cat.categoria} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-3 h-3 rounded-full bg-red-500 opacity-80"></span>
                          <span>{cat.categoria}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">
                            R$ {cat.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          className="h-2 rounded-full bg-red-500 opacity-80"
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}