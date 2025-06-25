import { useFinancasStore } from "../store/financasStore";
import { motion } from "framer-motion";
import { exportToPDF, exportToCSV, exportToJSON } from "../utils/exportUtils";
import {
  PieChart,
  LineChart,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";

// Importando componentes modularizados
import StatCard from "../components/ui/StatCard";
import TrendChart from "../components/charts/TrendChart";
import ModernPieChart from "../components/charts/ModernPieChart";
import ModernBarChart from "../components/charts/ModernBarChart";
import DetailedLineChart from "../components/charts/DetailedLineChart";
import TransactionList from "../components/transactions/TransactionList";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function Dashboard() {
  const { saldo, transacoes } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "goals"
  >("overview");

  // Handlers para exportação
  const handleExportPDF = () => {
    const exportData = {
      title: "Relatório Financeiro",
      period: `${new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })}`,
      saldo,
      ganhosMes,
      gastosMes,
      transacoes: transacoesRecentes,
      categorias,
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
      period: new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      }),
      generatedAt: new Date().toISOString(),
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
  const primeiroDiaMes = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    1
  );
  const ultimoDiaMes = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth() + 1,
    0
  );

  const transacoesMes = transacoes.filter((t) => {
    const dataTransacao = new Date(t.data);
    return dataTransacao >= primeiroDiaMes && dataTransacao <= ultimoDiaMes;
  });

  const ganhosMes = transacoesMes
    .filter((t) => t.tipo === "ganho")
    .reduce((total, t) => total + t.valor, 0);

  const gastosMes = transacoesMes
    .filter((t) => t.tipo === "gasto")
    .reduce((total, t) => total + t.valor, 0);

  const saldoLiquido = ganhosMes - gastosMes;

  // Obter transações recentes (últimas 5)
  const transacoesRecentes = [...transacoes]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  // Calcular percentual de crescimento (simulado)
  const percentualCrescimento = Math.round(
    (saldoLiquido / (ganhosMes || 1)) * 100
  );

  // Dados para gráficos com cores mais harmoniosas
  const categorias = [
    { nome: "Alimentação", valor: 800, cor: "var(--shop-primary)" },
    { nome: "Transporte", valor: 400, cor: "var(--shop-success)" },
    { nome: "Lazer", valor: 300, cor: "var(--shop-highlight)" },
    { nome: "Moradia", valor: 600, cor: "var(--shop-error)" },
    { nome: "Outros", valor: 200, cor: "var(--shop-accent)" },
  ];

  // Dados de tendência simulados
  const dadosTendencia = [
    { mes: "Set", receitas: 3200, despesas: 2800, liquido: 400 },
    { mes: "Out", receitas: 3800, despesas: 3100, liquido: 700 },
    { mes: "Nov", receitas: 4200, despesas: 3400, liquido: 800 },
    {
      mes: "Dez",
      receitas: ganhosMes,
      despesas: gastosMes,
      liquido: saldoLiquido,
    },
  ];

  // Dados para o gráfico de barras
  const dadosBarras = [
    { categoria: "Alimentação", valor: 800, meta: 700 },
    { categoria: "Transporte", valor: 400, meta: 500 },
    { categoria: "Lazer", valor: 300, meta: 400 },
    { categoria: "Moradia", valor: 600, meta: 600 },
    { categoria: "Outros", valor: 200, meta: 300 },
  ];

  // Dados para o gráfico de linha detalhado
  const dadosLinha = [
    { periodo: "Semana 1", receitas: 1200, despesas: 800, economia: 400 },
    { periodo: "Semana 2", receitas: 900, despesas: 700, economia: 200 },
    { periodo: "Semana 3", receitas: 1500, despesas: 1100, economia: 400 },
    { periodo: "Semana 4", receitas: 1100, despesas: 900, economia: 200 },
  ];

  const metaMensal = 5000; // Meta simulada
  const progressoMeta =
    ganhosMes > 0 ? Math.min((ganhosMes / metaMensal) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section usando o componente DashboardHeader */}
      <DashboardHeader 
        onRefresh={() => window.location.reload()}
        onNewTransaction={() => {}}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
      />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Tabs de navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-1 mb-8 p-1 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
        >
          {[
            { id: "overview", label: "Visão Geral", icon: PieChart },
            { id: "analytics", label: "Análises", icon: LineChart },
            { id: "goals", label: "Metas", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-shop-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Conteúdo da aba selecionada */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Saldo Atual"
                value={`R$ ${saldo.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={({ className }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                  >
                    <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                    <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.24-3.1a2.24 2.24 0 0 1-.24-2.2L10 3" />
                    <path d="M14 13.5V5c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v8.5" />
                  </svg>
                )}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-500"
                trend={{
                  value: percentualCrescimento,
                  isPositive: percentualCrescimento > 0,
                }}
                isLoading={isLoading}
                delay={0}
              />

              <StatCard
                title="Receitas do Mês"
                value={`R$ ${ganhosMes.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={({ className }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                )}
                iconBgColor="bg-green-100"
                iconColor="text-green-500"
                trend={{ value: 12, isPositive: true }}
                isLoading={isLoading}
                delay={0.1}
              />

              <StatCard
                title="Despesas do Mês"
                value={`R$ ${gastosMes.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={({ className }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                )}
                iconBgColor="bg-red-100"
                iconColor="text-red-500"
                trend={{ value: 8, isPositive: false }}
                isLoading={isLoading}
                delay={0.2}
              />

              <StatCard
                title="Saldo do Mês"
                value={`R$ ${saldoLiquido.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`}
                icon={({ className }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                  >
                    <path d="M2 20h.01M7 20v-4m5-10v14M17 20v-10m5 10v-6" />
                  </svg>
                )}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-500"
                trend={{
                  value: percentualCrescimento,
                  isPositive: percentualCrescimento > 0,
                }}
                isLoading={isLoading}
                delay={0.3}
              />
            </div>

            {/* Gráficos e Listas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Gráfico de tendência */}
                <TrendChart data={dadosTendencia} isLoading={isLoading} />

                {/* Gráfico de barras */}
                <ModernBarChart 
                  data={dadosBarras} 
                  isLoading={isLoading} 
                  title="Gastos por Categoria vs. Meta" 
                />
              </div>

              <div className="space-y-6">
                {/* Gráfico de pizza */}
                <ModernPieChart data={categorias} isLoading={isLoading} />

                {/* Meta mensal */}
                <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
                  <div className="p-6 border-b border-border/50">
                    <h3 className="font-bold">Meta de Receita Mensal</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Progresso
                      </span>
                      <span className="text-sm font-medium">
                        {progressoMeta.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2.5">
                      <div
                        className="bg-shop-primary h-2.5 rounded-full"
                        style={{ width: `${progressoMeta}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>
                        R$ {ganhosMes.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-muted-foreground">
                        Meta: R$ {metaMensal.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transações recentes */}
            <div className="grid grid-cols-1 gap-6">
              <TransactionList 
                transactions={transacoesRecentes}
                title="Transações Recentes"
                isLoading={isLoading}
                emptyMessage="Nenhuma transação registrada ainda. Adicione sua primeira transação!"
              />
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Gráfico de linha detalhado */}
            <DetailedLineChart 
              data={dadosLinha} 
              isLoading={isLoading} 
              title="Análise Financeira Detalhada" 
            />

            {/* Outros componentes de análise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernBarChart 
                data={dadosBarras} 
                isLoading={isLoading} 
                title="Gastos por Categoria" 
              />
              
              <ModernPieChart data={categorias} isLoading={isLoading} />
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="space-y-8">
            {/* Conteúdo da aba de metas */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-bold text-lg">Suas Metas Financeiras</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground">
                  Funcionalidade de metas em desenvolvimento...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
