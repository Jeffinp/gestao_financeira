import { useFinancasStore } from '../store/financasStore';
import { motion } from 'framer-motion';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Animação para mostrar os elementos
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Dashboard() {
  const { saldo, transacoes } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulando carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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

  // Obter transações recentes (últimas 5)
  const transacoesRecentes = [...transacoes]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  // Calcular percentual de crescimento (simulado)
  const percentualCrescimento = Math.round((ganhosMes - gastosMes) / (ganhosMes || 1) * 100);

  // Simular alguns dados para os gráficos
  const categorias = [
    { nome: 'Alimentação', valor: 1200, cor: '#3b82f6' },
    { nome: 'Transporte', valor: 500, cor: '#10b981' },
    { nome: 'Lazer', valor: 800, cor: '#f59e0b' },
    { nome: 'Moradia', valor: 1500, cor: '#ef4444' },
    { nome: 'Outros', valor: 300, cor: '#8b5cf6' }
  ];

  const totalCategorias = categorias.reduce((acc, cat) => acc + cat.valor, 0);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold mb-2">Painel Financeiro</h1>
          <p className="text-muted-foreground">Visão geral das suas finanças</p>
        </div>

        <button
          className="mt-4 md:mt-0 flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200"
          onClick={() => window.location.reload()}
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Atualizar dados</span>
        </button>
      </motion.div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-primary/10 rounded-xl">
              <CurrencyDollarIcon className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Saldo Atual</h3>
              <p className="text-2xl font-bold mt-1">
                {isLoading ?
                  <span className="animate-pulse bg-muted inline-block w-24 h-8 rounded"></span> :
                  `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Evolução</span>
              <span className={`flex items-center gap-1 ${percentualCrescimento >= 0 ? 'text-secondary' : 'text-destructive'}`}>
                {percentualCrescimento >= 0 ?
                  <ArrowTrendingUpIcon className="h-4 w-4" /> :
                  <ArrowTrendingDownIcon className="h-4 w-4" />
                }
                {percentualCrescimento}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-secondary/10 rounded-xl">
              <ArrowTrendingUpIcon className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Ganhos do Mês</h3>
              <p className="text-2xl font-bold mt-1">
                {isLoading ?
                  <span className="animate-pulse bg-muted inline-block w-24 h-8 rounded"></span> :
                  `R$ ${ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Comparado ao último mês</span>
              <span className="text-secondary flex items-center gap-1">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                12%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-destructive/10 rounded-xl">
              <ArrowTrendingDownIcon className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Gastos do Mês</h3>
              <p className="text-2xl font-bold mt-1">
                {isLoading ?
                  <span className="animate-pulse bg-muted inline-block w-24 h-8 rounded"></span> :
                  `R$ ${gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Comparado ao último mês</span>
              <span className="text-destructive flex items-center gap-1">
                <ArrowTrendingDownIcon className="h-4 w-4" />
                8%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gráficos e informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ChartPieIcon className="h-5 w-5 text-primary" />
              Distribuição de Gastos
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Gráfico de pizza (simplificado para demonstração) */}
            <div className="relative w-48 h-48 mx-auto md:mx-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {categorias.map((categoria, index) => {
                  const percentual = categoria.valor / totalCategorias;
                  let cumulativePercent = 0;

                  for (let i = 0; i < index; i++) {
                    cumulativePercent += categorias[i].valor / totalCategorias;
                  }

                  const startX = Math.cos(2 * Math.PI * cumulativePercent) * 50 + 50;
                  const startY = Math.sin(2 * Math.PI * cumulativePercent) * 50 + 50;

                  const endX = Math.cos(2 * Math.PI * (cumulativePercent + percentual)) * 50 + 50;
                  const endY = Math.sin(2 * Math.PI * (cumulativePercent + percentual)) * 50 + 50;

                  const largeArcFlag = percentual > 0.5 ? 1 : 0;

                  return (
                    <path
                      key={categoria.nome}
                      d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={categoria.cor}
                      stroke="hsl(var(--background))"
                      strokeWidth="1"
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  );
                })}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="hsl(var(--card))"
                  className="drop-shadow-sm"
                />
              </svg>
            </div>

            {/* Legenda */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 md:mt-0">
              {categorias.map(categoria => (
                <div key={categoria.nome} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoria.cor }}
                  />
                  <span className="text-sm text-foreground">{categoria.nome}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {Math.round(categoria.valor / totalCategorias * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Próximos Pagamentos
            </h2>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse flex items-center p-2">
                  <div className="w-10 h-10 bg-muted rounded-lg"></div>
                  <div className="ml-3 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="p-3 rounded-lg border border-border/40 flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Aluguel</p>
                    <p className="text-xs text-muted-foreground">10/06/2025</p>
                    <p className="text-sm font-semibold mt-1">R$ 1.200,00</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-border/40 flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Internet</p>
                    <p className="text-xs text-muted-foreground">15/06/2025</p>
                    <p className="text-sm font-semibold mt-1">R$ 120,00</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border/40 flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Energia</p>
                    <p className="text-xs text-muted-foreground">20/06/2025</p>
                    <p className="text-sm font-semibold mt-1">R$ 230,00</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Transações Recentes */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-primary" />
            Transações Recentes
          </h2>
          <a href="/historico" className="text-sm text-primary hover:underline">
            Ver todas
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Descrição</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Categoria</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Data</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Valor</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index} className="border-b border-border/20">
                    <td className="py-3 px-2">
                      <div className="animate-pulse h-4 bg-muted rounded w-24"></div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="animate-pulse h-4 bg-muted rounded w-20"></div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="animate-pulse h-4 bg-muted rounded w-16"></div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="animate-pulse h-4 bg-muted rounded w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : (
                transacoesRecentes.map((transacao, index) => (
                  <tr key={index} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 text-sm">{transacao.descricao}</td>
                    <td className="py-3 px-2">
                      <span className={`badge ${transacao.tipo === 'ganho' ? 'badge-secondary' : 'badge-accent'}`}>
                        {transacao.categoria}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className={`py-3 px-2 text-sm font-medium text-right ${transacao.tipo === 'ganho' ? 'text-secondary' : 'text-destructive'}`}>
                      {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}