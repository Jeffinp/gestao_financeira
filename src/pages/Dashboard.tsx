import { useFinancasStore } from '../store/financasStore';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToPDF, exportToCSV, exportToJSON } from '../utils/exportUtils';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  ClockIcon,
  ArrowPathIcon,
  EyeIcon,
  BanknotesIcon,
  CreditCardIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  StarIcon,
  FireIcon,
  DocumentArrowDownIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

// Componente para cards de estatísticas principais
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className: string }>;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading: boolean;
  delay?: number;
}

function StatCard({ title, value, icon: Icon, iconBgColor, iconColor, trend, isLoading, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-card hover-lift rounded-xl shadow-card border border-border/50 p-6 group relative overflow-hidden"
    >
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-shop-success' : 'text-shop-error'}`}>
              {trend.isPositive ? (
                <ArrowTrendingUpIcon className="h-4 w-4" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          {isLoading ? (
            <div className="h-8 bg-muted animate-pulse rounded-md w-32"></div>
          ) : (
            <p className="text-2xl font-bold text-foreground">{value}</p>
          )}
        </div>

        {trend && !isLoading && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              {trend.isPositive ? 'Aumento' : 'Diminuição'} comparado ao mês anterior
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Componente para gráfico de pizza moderno
interface ModernPieChartProps {
  data: Array<{ nome: string; valor: number; cor: string }>;
  isLoading: boolean;
}

function ModernPieChart({ data, isLoading }: ModernPieChartProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const total = data.reduce((acc, item) => acc + item.valor, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border/50 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="w-48 h-48 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="valor"
              nameKey="nome"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.cor}
                  stroke={index === activeIndex ? entry.cor : 'transparent'}
                  strokeWidth={index === activeIndex ? 3 : 0}
                  style={{
                    filter: index === activeIndex ? 'brightness(1.1)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda personalizada */}
      <div className="grid grid-cols-2 gap-3">
        {data.map((item, index) => {
          const percentage = ((item.valor / total) * 100).toFixed(1);
          return (
            <motion.div
              key={item.nome}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <div
                className="w-3 h-3 rounded-full transition-transform"
                style={{
                  backgroundColor: item.cor,
                  transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.nome}</p>
                <p className="text-xs text-muted-foreground">{percentage}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  R$ {(item.valor / 1000).toFixed(1)}k
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Componente para gráfico de linha de tendência
interface TrendChartProps {
  data: Array<{ mes: string; receitas: number; despesas: number; liquido: number }>;
  isLoading: boolean;
}

function TrendChart({ data, isLoading }: TrendChartProps) {
  if (isLoading) {
    return (
      <div className="h-64 bg-muted animate-pulse rounded-xl"></div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="mes"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'rgb(100, 116, 139)' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'rgb(100, 116, 139)' }}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(var(--card))',
            border: '1px solid rgb(var(--border) / 0.5)',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value: any, name: string) => [
            `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            name === 'receitas' ? 'Receitas' : name === 'despesas' ? 'Despesas' : 'Líquido'
          ]}
        />
        <Area
          type="monotone"
          dataKey="receitas"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorReceitas)"
        />
        <Area
          type="monotone"
          dataKey="despesas"
          stroke="#ef4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDespesas)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Componente principal do Dashboard
export default function Dashboard() {
  const { saldo, transacoes } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'goals'>('overview');

  // Handlers para exportação
  const handleExportPDF = () => {
    const exportData = {
      title: 'Relatório Financeiro',
      period: `${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
      saldo,
      ganhosMes,
      gastosMes,
      transacoes: transacoesRecentes,
      categorias
    };
    exportToPDF(exportData);
  };

  const handleExportCSV = () => {
    exportToCSV(transacoes);
  };

  const handleExportJSON = () => {
    const exportData = {
      saldo,
      transacoes,
      categorias,
      period: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      generatedAt: new Date().toISOString()
    };
    exportToJSON(exportData);
  };

  // Simulando carregamento de dados mais realista
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Calcula totais do mês atual
  const dataAtual = new Date();
  const primeiroDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
  const ultimoDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);

  const transacoesMes = transacoes.filter(t => {
    const dataTransacao = new Date(t.data);
    return dataTransacao >= primeiroDiaMes && dataTransacao <= ultimoDiaMes;
  });

  const ganhosMes = transacoesMes
    .filter(t => t.tipo === 'ganho')
    .reduce((total, t) => total + t.valor, 0);

  const gastosMes = transacoesMes
    .filter(t => t.tipo === 'gasto')
    .reduce((total, t) => total + t.valor, 0);

  const saldoLiquido = ganhosMes - gastosMes;

  // Obter transações recentes (últimas 5)
  const transacoesRecentes = [...transacoes]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  // Calcular percentual de crescimento (simulado)
  const percentualCrescimento = Math.round((saldoLiquido / (ganhosMes || 1)) * 100);

  // Dados para gráficos com cores mais harmoniosas
  const categorias = [
    { nome: 'Alimentação', valor: Math.max(gastosMes * 0.3, 800), cor: '#3b82f6' },
    { nome: 'Transporte', valor: Math.max(gastosMes * 0.15, 400), cor: '#10b981' },
    { nome: 'Lazer', valor: Math.max(gastosMes * 0.2, 300), cor: '#f59e0b' },
    { nome: 'Moradia', valor: Math.max(gastosMes * 0.25, 600), cor: '#ef4444' },
    { nome: 'Outros', valor: Math.max(gastosMes * 0.1, 200), cor: '#8b5cf6' }
  ];

  // Dados de tendência simulados
  const dadosTendencia = [
    { mes: 'Set', receitas: 3200, despesas: 2800, liquido: 400 },
    { mes: 'Out', receitas: 3800, despesas: 3100, liquido: 700 },
    { mes: 'Nov', receitas: 4200, despesas: 3400, liquido: 800 },
    { mes: 'Dez', receitas: ganhosMes, despesas: gastosMes, liquido: saldoLiquido },
  ];

  const metaMensal = 5000; // Meta simulada
  const progressoMeta = ganhosMes > 0 ? Math.min((ganhosMes / metaMensal) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section Aprimorado */}
      <div className="bg-gradient-to-br from-shop-primary/10 via-shop-accent/5 to-shop-primary/15 border-b border-border/20 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-shop-primary/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-shop-accent/10 rounded-full blur-2xl translate-y-32 -translate-x-32"></div>

        <div className="container max-w-7xl mx-auto pt-24 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 bg-shop-primary/20 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <ChartBarIcon className="h-8 w-8 text-shop-primary" />
                </motion.div>
                <div>
                  <h1 className="text-fluid-4xl font-bold text-foreground">
                    Dashboard Financeiro
                  </h1>
                  <p className="text-muted-foreground text-fluid-base">
                    {new Date().toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-fluid-base max-w-2xl">
                Gerencie suas finanças com inteligência e tome decisões baseadas em dados precisos
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/50 transition-all duration-200 shadow-sm"
                onClick={() => window.location.reload()}
              >
                <ArrowPathIcon className="h-4 w-4" />
                Atualizar
              </motion.button>              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shop-primary text-sm flex items-center gap-2 shadow-button"
              >
                <EyeIcon className="h-4 w-4" />
                Relatório Completo
              </motion.button>

              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-shop-outline text-sm flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  Exportar
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    <button
                      onClick={handleExportPDF}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      Relatório PDF
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                    >
                      <ShareIcon className="h-4 w-4" />
                      Transações CSV
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                    >
                      <ChartBarIcon className="h-4 w-4" />
                      Dados JSON
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shop-accent text-sm flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Nova Transação
              </motion.button>
            </div>
          </motion.div>

          {/* Tabs de navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-1 mt-8 p-1 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
          >
            {[
              { id: 'overview', label: 'Visão Geral', icon: ChartPieIcon },
              { id: 'analytics', label: 'Análises', icon: PresentationChartLineIcon },
              { id: 'goals', label: 'Metas', icon: CalendarDaysIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-shop-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-8">        <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Cards de Estatísticas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Saldo Total"
                value={`R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={CurrencyDollarIcon}
                iconBgColor="bg-shop-primary/10"
                iconColor="text-shop-primary"
                trend={{
                  value: Math.abs(percentualCrescimento),
                  isPositive: percentualCrescimento >= 0
                }}
                isLoading={isLoading}
                delay={0.1}
              />              <StatCard
                title="Receitas do Mês"
                value={`R$ ${ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={ArrowTrendingUpIcon}
                iconBgColor="bg-shop-success/10"
                iconColor="text-shop-success"
                trend={{
                  value: 12,
                  isPositive: true
                }}
                isLoading={isLoading}
                delay={0.2}
              />

              <StatCard
                title="Despesas do Mês"
                value={`R$ ${gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={CreditCardIcon}
                iconBgColor="bg-shop-error/10"
                iconColor="text-shop-error"
                trend={{
                  value: 8,
                  isPositive: false
                }}
                isLoading={isLoading}
                delay={0.3}
              />

              <StatCard
                title="Saldo Líquido"
                value={`R$ ${saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={BanknotesIcon}
                iconBgColor={saldoLiquido >= 0 ? "bg-shop-success/10" : "bg-shop-error/10"}
                iconColor={saldoLiquido >= 0 ? "text-shop-success" : "text-shop-error"}
                isLoading={isLoading}
                delay={0.4}
              />
            </div>

            {/* Seção Principal - Gráficos */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Gráfico de Gastos por Categoria */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="xl:col-span-2 bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-shop-primary/10 rounded-lg">
                        <ChartPieIcon className="h-5 w-5 text-shop-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Gastos por Categoria</h2>
                        <p className="text-sm text-muted-foreground">
                          Distribuição detalhada dos gastos em {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">
                        R$ {categorias.reduce((acc, cat) => acc + cat.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-muted-foreground">Total gasto</p>
                    </div>
                  </div>
                </div>                <div className="p-6">
                  <ModernPieChart data={categorias} isLoading={isLoading} />
                </div>
              </motion.div>

              {/* Meta Mensal Aprimorada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-shop-accent/10 rounded-lg">
                      <CalendarDaysIcon className="h-5 w-5 text-shop-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Meta Mensal</h3>
                      <p className="text-sm text-muted-foreground">Progresso de receitas</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                      <div className="h-24 bg-muted animate-pulse rounded-xl"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Circular Progress */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                            <circle
                              cx="60"
                              cy="60"
                              r="50"
                              stroke="rgb(var(--muted))"
                              strokeWidth="8"
                              fill="none"
                            />
                            <motion.circle
                              cx="60"
                              cy="60"
                              r="50"
                              stroke="rgb(var(--shop-accent))"
                              strokeWidth="8"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 50}`}
                              strokeDashoffset={2 * Math.PI * 50 * (1 - progressoMeta / 100)}
                              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - progressoMeta / 100) }}
                              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-shop-accent">{progressoMeta.toFixed(0)}%</p>
                              <p className="text-xs text-muted-foreground">Concluído</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                          <span className="text-sm text-muted-foreground">Meta</span>
                          <span className="text-sm font-bold text-foreground">
                            R$ {metaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-shop-success/10 rounded-lg">
                          <span className="text-sm text-shop-success">Realizado</span>
                          <span className="text-sm font-bold text-shop-success">
                            R$ {ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-shop-info/10 rounded-lg">
                          <span className="text-sm text-shop-info">Restante</span>
                          <span className="text-sm font-bold text-shop-info">
                            R$ {Math.max(0, metaMensal - ganhosMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Seção de Tendências */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
            >
              <div className="p-6 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-shop-highlight/10 rounded-lg">
                      <PresentationChartLineIcon className="h-5 w-5 text-shop-highlight" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Tendência Financeira</h3>
                      <p className="text-sm text-muted-foreground">Evolução das receitas e despesas</p>
                    </div>
                  </div>
                  <button className="text-sm text-shop-primary hover:text-shop-primary/80 font-medium transition-colors flex items-center gap-1">
                    Ver detalhes
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <TrendChart data={dadosTendencia} isLoading={isLoading} />
              </div>
            </motion.div>

            {/* Transações Recentes Aprimoradas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
            >
              <div className="p-6 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-shop-info/10 rounded-lg">
                      <ClockIcon className="h-5 w-5 text-shop-info" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Atividade Recente</h3>
                      <p className="text-sm text-muted-foreground">Últimas 5 transações</p>
                    </div>
                  </div>
                  <button className="text-sm text-shop-primary hover:text-shop-primary/80 font-medium transition-colors flex items-center gap-1">
                    Ver todas
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-muted animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                          <div className="h-3 bg-muted animate-pulse rounded w-1/3"></div>
                        </div>
                        <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                      </div>
                    ))}
                  </div>
                ) : transacoesRecentes.length > 0 ? (
                  <div className="space-y-3">
                    {transacoesRecentes.map((transacao, index) => (
                      <motion.div
                        key={transacao.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-all duration-200 group cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${transacao.tipo === 'ganho'
                          ? 'bg-shop-success/10 text-shop-success'
                          : 'bg-shop-error/10 text-shop-error'
                          } group-hover:scale-110 transition-transform duration-200`}>
                          {transacao.tipo === 'ganho' ? (
                            <PlusIcon className="h-6 w-6" />
                          ) : (
                            <MinusIcon className="h-6 w-6" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{transacao.descricao}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="px-2 py-1 bg-muted rounded-md font-medium">{transacao.categoria}</span>
                            <span>•</span>
                            <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`font-bold text-lg ${transacao.tipo === 'ganho' ? 'text-shop-success' : 'text-shop-error'}`}>
                            {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {transacao.tipo === 'ganho' ? 'Receita' : 'Despesa'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ClockIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-2">Nenhuma transação encontrada</p>
                    <p className="text-muted-foreground text-sm mb-4">Comece registrando sua primeira transação</p>
                    <button className="btn-shop-primary text-sm">
                      Registrar Transação
                    </button>
                  </div>
                )}
              </div>              </motion.div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Analytics Header */}            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Análises Avançadas</h2>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 bg-card border border-border/50 rounded-lg text-sm text-foreground">
                  <option value="3m">Últimos 3 meses</option>
                  <option value="6m">Últimos 6 meses</option>
                  <option value="1y">Último ano</option>
                </select>
                <div className="relative group">
                  <button className="btn-shop-outline text-sm flex items-center gap-2">
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    Exportar
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-2">
                      <button
                        onClick={handleExportPDF}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                        Exportar PDF
                      </button>
                      <button
                        onClick={handleExportCSV}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                      >
                        <ShareIcon className="h-4 w-4" />
                        Exportar CSV
                      </button>
                      <button
                        onClick={handleExportJSON}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                      >
                        <ChartBarIcon className="h-4 w-4" />
                        Exportar JSON
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">                  <div className="p-2 bg-shop-success/10 rounded-lg">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-shop-success" />
                </div>
                  <h3 className="font-semibold text-foreground">Eficiência de Gastos</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gastos Essenciais</span>
                    <span className="text-sm font-medium text-foreground">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-shop-success h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">+5% comparado ao mês anterior</p>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-shop-warning/10 rounded-lg">
                    <ChartBarIcon className="h-5 w-5 text-shop-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground">Padrão de Gastos</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">R$ 2.847</p>
                    <p className="text-sm text-muted-foreground">Média mensal</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-shop-error">
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                      <span>8% acima do ideal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-shop-info/10 rounded-lg">
                    <CalendarDaysIcon className="h-5 w-5 text-shop-info" />
                  </div>
                  <h3 className="font-semibold text-foreground">Previsão</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-shop-success">R$ 1.247</p>
                    <p className="text-sm text-muted-foreground">Sobra estimada</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Baseado no padrão atual de gastos
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Analytics Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Comparative Analysis */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/20">
                  <h3 className="text-lg font-semibold text-foreground">Análise Comparativa</h3>
                  <p className="text-sm text-muted-foreground">Comparação entre períodos</p>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { periodo: 'Jul', atual: 2800, anterior: 3200 },
                      { periodo: 'Ago', atual: 3100, anterior: 2900 },
                      { periodo: 'Set', atual: 2900, anterior: 3100 },
                      { periodo: 'Out', atual: gastosMes, anterior: 2800 }
                    ]}>
                      <XAxis dataKey="periodo" />
                      <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                      <Tooltip />
                      <Bar dataKey="anterior" fill="rgb(148, 163, 184)" name="Período Anterior" />
                      <Bar dataKey="atual" fill="rgb(var(--shop-primary))" name="Período Atual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Trends */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/20">
                  <h3 className="text-lg font-semibold text-foreground">Tendências por Categoria</h3>
                  <p className="text-sm text-muted-foreground">Evolução dos gastos principais</p>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { mes: 'Jul', alimentacao: 800, transporte: 400, moradia: 1200 },
                      { mes: 'Ago', alimentacao: 750, transporte: 450, moradia: 1200 },
                      { mes: 'Set', alimentacao: 900, transporte: 380, moradia: 1200 },
                      { mes: 'Out', alimentacao: 850, transporte: 420, moradia: 1200 }
                    ]}>
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={(value) => `R$ ${value}`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="alimentacao" stroke="#3b82f6" name="Alimentação" />
                      <Line type="monotone" dataKey="transporte" stroke="#10b981" name="Transporte" />
                      <Line type="monotone" dataKey="moradia" stroke="#ef4444" name="Moradia" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-shop-highlight/10 rounded-lg">
                    <StarIcon className="h-5 w-5 text-shop-highlight" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Insights Inteligentes</h3>
                    <p className="text-sm text-muted-foreground">Recomendações baseadas em seus dados</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-shop-success/5 border border-shop-success/20 rounded-xl">
                    <div className="flex items-start gap-3">                      <div className="p-2 bg-shop-success/10 rounded-lg mt-1">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-shop-success" />
                    </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Oportunidade de Economia</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Seus gastos com alimentação estão 15% acima da média. Considere meal prep para economizar até R$ 200/mês.
                        </p>
                        <button className="text-xs text-shop-success font-medium hover:text-shop-success/80">
                          Ver dicas →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-shop-info/5 border border-shop-info/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-shop-info/10 rounded-lg mt-1">
                        <ChartPieIcon className="h-4 w-4 text-shop-info" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Padrão Identificado</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Você tende a gastar mais nos fins de semana. Configure alertas para controlar gastos.
                        </p>
                        <button className="text-xs text-shop-info font-medium hover:text-shop-info/80">
                          Configurar alerta →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Goals Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Metas Financeiras</h2>
              <button className="btn-shop-primary text-sm flex items-center gap-2">
                <PlusIcon className="h-4 w-4" />
                Nova Meta
              </button>
            </div>

            {/* Active Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Emergency Fund Goal */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-shop-error/10 rounded-lg">
                      <FireIcon className="h-5 w-5 text-shop-error" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Reserva de Emergência</h3>
                      <p className="text-sm text-muted-foreground">6 meses de gastos</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold text-foreground">R$ 8.500</p>
                        <p className="text-sm text-muted-foreground">de R$ 15.000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-shop-warning">57%</p>
                        <p className="text-xs text-muted-foreground">Concluído</p>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-shop-warning h-3 rounded-full transition-all duration-500" style={{ width: '57%' }}></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Faltam R$ 6.500</span>
                      <span className="text-shop-success font-medium">+R$ 500/mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vacation Goal */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-shop-accent/10 rounded-lg">
                      <CalendarDaysIcon className="h-5 w-5 text-shop-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Viagem Europa</h3>
                      <p className="text-sm text-muted-foreground">Dezembro 2024</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold text-foreground">R$ 2.800</p>
                        <p className="text-sm text-muted-foreground">de R$ 8.000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-shop-accent">35%</p>
                        <p className="text-xs text-muted-foreground">Concluído</p>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-shop-accent h-3 rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Faltam R$ 5.200</span>
                      <span className="text-shop-success font-medium">+R$ 650/mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Goal */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-shop-success/10 rounded-lg">
                      <PresentationChartLineIcon className="h-5 w-5 text-shop-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Investimentos</h3>
                      <p className="text-sm text-muted-foreground">Carteira diversificada</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold text-foreground">R$ 12.300</p>
                        <p className="text-sm text-muted-foreground">de R$ 20.000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-shop-success">62%</p>
                        <p className="text-xs text-muted-foreground">Concluído</p>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-shop-success h-3 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Faltam R$ 7.700</span>
                      <span className="text-shop-success font-medium">+R$ 800/mês</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Progress Overview */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/20">
                  <h3 className="text-lg font-semibold text-foreground">Progresso das Metas</h3>
                  <p className="text-sm text-muted-foreground">Acompanhamento mensal</p>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={[
                      { mes: 'Jul', emergencia: 7500, viagem: 2000, investimento: 10800 },
                      { mes: 'Ago', emergencia: 8000, viagem: 2200, investimento: 11500 },
                      { mes: 'Set', emergencia: 8250, viagem: 2500, investimento: 12000 },
                      { mes: 'Out', emergencia: 8500, viagem: 2800, investimento: 12300 }
                    ]}>
                      <defs>
                        <linearGradient id="colorEmergencia" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorViagem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInvestimento" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                      <Area type="monotone" dataKey="emergencia" stackId="1" stroke="#f59e0b" fill="url(#colorEmergencia)" />
                      <Area type="monotone" dataKey="viagem" stackId="1" stroke="#10b981" fill="url(#colorViagem)" />
                      <Area type="monotone" dataKey="investimento" stackId="1" stroke="#34d399" fill="url(#colorInvestimento)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Goal Achievement Predictions */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/20">
                  <h3 className="text-lg font-semibold text-foreground">Previsões de Conclusão</h3>
                  <p className="text-sm text-muted-foreground">Baseado no ritmo atual</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-shop-warning/5 rounded-xl border border-shop-warning/20">
                    <div className="flex items-center gap-3">
                      <FireIcon className="h-5 w-5 text-shop-warning" />
                      <div>
                        <p className="font-medium text-foreground">Reserva de Emergência</p>
                        <p className="text-sm text-muted-foreground">13 meses restantes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-shop-warning">Nov/2025</p>
                      <p className="text-xs text-muted-foreground">Conclusão prevista</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-shop-accent/5 rounded-xl border border-shop-accent/20">
                    <div className="flex items-center gap-3">
                      <CalendarDaysIcon className="h-5 w-5 text-shop-accent" />
                      <div>
                        <p className="font-medium text-foreground">Viagem Europa</p>
                        <p className="text-sm text-muted-foreground">8 meses restantes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-shop-accent">Jun/2025</p>
                      <p className="text-xs text-muted-foreground">Conclusão prevista</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-shop-success/5 rounded-xl border border-shop-success/20">
                    <div className="flex items-center gap-3">
                      <PresentationChartLineIcon className="h-5 w-5 text-shop-success" />
                      <div>
                        <p className="font-medium text-foreground">Investimentos</p>
                        <p className="text-sm text-muted-foreground">9 meses restantes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-shop-success">Jul/2025</p>
                      <p className="text-xs text-muted-foreground">Conclusão prevista</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Setting Tips */}
            <div className="bg-gradient-to-r from-shop-primary/10 via-shop-accent/10 to-shop-primary/10 rounded-xl p-8 border border-border/20">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-shop-primary/20 rounded-xl">
                    <StarIcon className="h-8 w-8 text-shop-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Dicas para Alcançar suas Metas</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Siga estratégias comprovadas para acelerar o progresso das suas metas financeiras
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30">
                    <span className="text-sm font-medium text-foreground">💡 Automatize transferências</span>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30">
                    <span className="text-sm font-medium text-foreground">📊 Revise mensalmente</span>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30">
                    <span className="text-sm font-medium text-foreground">🎯 Metas SMART</span>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30">
                    <span className="text-sm font-medium text-foreground">💪 Mantenha disciplina</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Call to Action Section Melhorada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 bg-gradient-to-r from-shop-primary via-shop-accent to-shop-primary rounded-xl p-8 text-center relative overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-lg translate-y-12 -translate-x-12"></div>

          <div className="relative">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingBagIcon className="h-12 w-12 text-white mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Explore Recursos Avançados</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Descubra ferramentas poderosas para otimizar sua gestão financeira e alcançar seus objetivos com eficiência
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-shop-primary px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 flex items-center gap-2 justify-center shadow-lg"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Explorar Loja
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center gap-2 justify-center"
              >
                <Cog6ToothIcon className="h-5 w-5" />
                Configurações
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}