import { useFinancasStore } from '../store/financasStore';
import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, ChartPieIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
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
    <div className="container pt-24 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold text-balance">Painel Financeiro</h1>
          <p className="text-muted-foreground mt-1">Resumo das suas finanças</p>
        </div>
        
        <button 
          className="mt-3 md:mt-0 flex items-center gap-2 text-sm hover:text-shop-primary transition-colors"
          onClick={() => window.location.reload()}
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Atualizar informações</span>
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card hover-lift rounded-xl shadow-card p-6 border border-border/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-shop-primary bg-opacity-10 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-shop-primary" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Saldo Atual</h2>
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-shop-primary">
                  R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
          
          {!isLoading && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center text-sm">
                <span className={`inline-flex items-center ${percentualCrescimento >= 0 ? 'text-shop-success' : 'text-shop-error'}`}>
                  {percentualCrescimento >= 0 ? (
                    <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(percentualCrescimento)}%
                </span>
                <span className="text-muted-foreground ml-2">comparado ao mês passado</span>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card hover-lift rounded-xl shadow-card p-6 border border-border/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Entradas do Mês</h2>
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-green-500">
                  R$ {ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
          
          {!isLoading && ganhosMes > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meta mensal</span>
                <span className="font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all" 
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card hover-lift rounded-xl shadow-card p-6 border border-border/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500 bg-opacity-10 rounded-lg">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Saídas do Mês</h2>
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-red-500">
                  R$ {gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
          
          {!isLoading && gastosMes > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Limite mensal</span>
                <span className="font-medium">80%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all" 
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartPieIcon className="h-5 w-5 text-shop-primary" />
              <h2 className="text-lg font-medium">Gastos por Categoria</h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('pt-BR', { month: 'long' })}
            </div>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="h-64 w-full bg-gray-100 animate-pulse rounded"></div>
            ) : categorias.length > 0 ? (
              <div className="space-y-4">
                {categorias.map((cat, index) => (
                  <div key={cat.nome} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="inline-block w-3 h-3 rounded-full" 
                          style={{ backgroundColor: cat.cor }}
                        ></span>
                        <span>{cat.nome}</span>
                      </div>
                      <span className="font-medium">
                        R$ {cat.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.valor / totalCategorias) * 100}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        className="h-2 rounded-full" 
                        style={{ backgroundColor: cat.cor }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Nenhum dado disponível</p>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-shop-primary" />
              <h2 className="text-lg font-medium">Transações Recentes</h2>
            </div>
            <a href="/historico" className="text-sm text-shop-primary hover:underline">
              Ver todas
            </a>
          </div>
          
          <div className="p-2">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3"></div>
                    </div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : transacoesRecentes.length > 0 ? (
              <div className="divide-y divide-border/50">
                {transacoesRecentes.map((transacao, index) => (
                  <motion.div 
                    key={transacao.id} 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex justify-between items-center p-4 hover:bg-secondary/20 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transacao.tipo === 'ganho' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transacao.tipo === 'ganho' ? (
                          <ArrowTrendingUpIcon className="h-5 w-5" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <span>{transacao.categoria}</span>
                          <span>•</span>
                          <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`font-medium ${
                      transacao.tipo === 'ganho' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ClockIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-muted-foreground">Nenhuma transação registrada ainda.</p>
                <a href="/gastos" className="mt-2 text-sm text-shop-primary hover:underline">
                  Registrar uma transação
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden"
      >
        <div className="p-6 border-b border-border/50">
          <h2 className="text-lg font-medium">Previsão para os Próximos 3 Meses</h2>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="h-64 w-full bg-gray-100 animate-pulse rounded"></div>
          ) : (
            <div className="h-64">
              <div className="grid grid-cols-3 h-full">
                {['Julho', 'Agosto', 'Setembro'].map((mes, index) => {
                  const randHeight = 40 + Math.random() * 60;
                  const isPositive = randHeight > 50;
                  
                  return (
                    <div key={mes} className="flex flex-col items-center justify-end h-full">
                      <div className="relative w-full flex items-end justify-center mb-8">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${randHeight}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                          className={`w-16 rounded-t-lg ${
                            isPositive ? 'bg-green-100' : 'bg-red-100'
                          }`}
                        >
                          <div className="absolute top-0 -mt-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <span className={`font-medium ${
                              isPositive ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {isPositive ? '+' : '-'}R$ {(Math.random() * 2000).toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                      <span className="font-medium">{mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 