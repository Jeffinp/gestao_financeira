import { useFinancasStore } from "../store/financasStore";
import { motion } from "framer-motion";
import { exportToPDF, exportToCSV, exportToJSON } from "../utils/exportUtils";
import {
  PieChart,
  LineChart,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// Importando componentes modularizados
import StatCard from "../components/ui/StatCard";
import TrendChart from "../components/charts/TrendChart";
import ModernPieChart from "../components/charts/ModernPieChart";
import ModernBarChart from "../components/charts/ModernBarChart";
import DetailedLineChart from "../components/charts/DetailedLineChart";
import TransactionList from "../components/transactions/TransactionList";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function Dashboard() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Obtendo dados da store
  const {
    saldo,
    ganhosMes,
    gastosMes,
    transacoesRecentes,
    categorias: categoriasOriginais,
    dadosTendencia,
    dadosBarras,
    dadosLinha,
  } = useFinancasStore();

  // Cálculo de percentual de crescimento
  const percentualCrescimento = 15; // Simulado
  const saldoLiquido = ganhosMes - gastosMes;

  // Convertendo categorias para o formato esperado pelo ModernPieChart
  const categorias = categoriasOriginais
    .filter(cat => cat.tipo === 'gasto')
    .slice(0, 5)
    .map((cat, index) => ({
      name: cat.nome,
      value: dadosBarras[index]?.valor || Math.floor(Math.random() * 500) + 200,
    }));

  // Simulando carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Funções de exportação
  const handleExportPDF = () => {
    exportToPDF({
      saldo,
      ganhosMes,
      gastosMes,
      transacoesRecentes,
    });
  };

  const handleExportCSV = () => {
    exportToCSV(transacoesRecentes);
  };

  const handleExportJSON = () => {
    exportToJSON({
      saldo,
      ganhosMes,
      gastosMes,
      transacoesRecentes,
    });
  };

  return (
    <div className={`min-h-screen pb-12 ${
      isDark ? 'bg-dark-background' : 'bg-light-background'
    }`}>
      {/* Header do Dashboard */}
      <DashboardHeader
        onRefresh={() => setIsLoading(true)}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
      />

      {/* Conteúdo principal */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Tabs de navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex items-center gap-1 mb-8 p-1.5 rounded-xl border shadow-card ${
            isDark
              ? 'bg-dark-card border-dark-border'
              : 'bg-light-card border-light-border'
          } backdrop-blur-sm`}
        >
          {[
            { id: "overview", label: "Visão Geral", icon: PieChart },
            { id: "analytics", label: "Análises", icon: LineChart },
            { id: "goals", label: "Metas", icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-fluid-sm font-medium transition-all duration-250 ${
                activeTab === tab.id
                  ? isDark 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'bg-primary-900 text-white shadow-sm'
                  : isDark
                    ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-gray-800/50'
                    : 'text-light-text-secondary hover:text-light-text-primary hover:bg-gray-100'
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
                iconBgColor={isDark ? "bg-primary-700/30" : "bg-primary-400/20"}
                iconColor={isDark ? "text-primary-400" : "text-primary-300"}
                trend={{
                  value: percentualCrescimento,
                  isPositive: percentualCrescimento > 0,
                }}
                isLoading={isLoading}
                delay={0}
                isDark={isDark}
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
                iconBgColor={isDark ? "bg-success-500/30" : "bg-success-500/20"}
                iconColor={isDark ? "text-success-500" : "text-success-500"}
                trend={{ value: 12, isPositive: true }}
                isLoading={isLoading}
                delay={0.1}
                isDark={isDark}
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
                iconBgColor={isDark ? "bg-error-500/30" : "bg-error-500/20"}
                iconColor={isDark ? "text-error-500" : "text-error-500"}
                trend={{ value: 8, isPositive: false }}
                isLoading={isLoading}
                delay={0.2}
                isDark={isDark}
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
                iconBgColor={isDark ? "bg-info-500/30" : "bg-info-500/20"}
                iconColor={isDark ? "text-info-500" : "text-info-500"}
                trend={{
                  value: percentualCrescimento,
                  isPositive: percentualCrescimento > 0,
                }}
                isLoading={isLoading}
                delay={0.3}
                isDark={isDark}
              />
            </div>

            {/* Gráficos e Listas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Gráfico de tendência */}
                <TrendChart data={dadosTendencia} isLoading={isLoading} isDark={isDark} />

                {/* Gráfico de barras */}
                <ModernBarChart 
                  data={dadosBarras} 
                  isLoading={isLoading} 
                  title="Gastos por Categoria vs. Meta" 
                  isDark={isDark}
                />
              </div>

              <div className="space-y-6">
                {/* Gráfico de pizza */}
                <ModernPieChart data={categorias} isLoading={isLoading} isDark={isDark} />

                {/* Meta mensal */}
                <div className={`rounded-xl border overflow-hidden shadow-card ${
                  isDark 
                    ? 'bg-dark-card border-dark-border' 
                    : 'bg-light-card border-light-border'
                }`}>
                  <div className={`p-6 border-b ${
                    isDark ? 'border-dark-border' : 'border-light-border'
                  }`}>
                    <h3 className={`font-bold ${
                      isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>Meta de Receita Mensal</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-fluid-sm ${
                          isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                        }`}>
                          Progresso
                        </span>
                        <span className={`text-fluid-sm font-medium ${
                          isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                        }`}>
                          75%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 dark:bg-primary-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <div className="flex justify-between items-center text-fluid-xs">
                        <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                          R$ 6.000,00
                        </span>
                        <span className={`font-medium ${
                          isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                        }`}>
                          Meta: R$ 8.000,00
                        </span>
                      </div>
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
                isDark={isDark}
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
              isDark={isDark}
            />

            {/* Outros componentes de análise */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ModernBarChart 
                data={dadosBarras} 
                isLoading={isLoading} 
                title="Gastos por Categoria" 
                isDark={isDark}
              />
              
              <ModernPieChart data={categorias} isLoading={isLoading} isDark={isDark} />
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="space-y-8">
            {/* Conteúdo da aba de metas */}
            <div className={`rounded-xl border overflow-hidden shadow-card ${
              isDark 
                ? 'bg-dark-card border-dark-border' 
                : 'bg-light-card border-light-border'
            }`}>
              <div className={`p-6 border-b ${
                isDark ? 'border-dark-border' : 'border-light-border'
              }`}>
                <h3 className={`font-bold text-lg ${
                  isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>Suas Metas Financeiras</h3>
              </div>
              <div className="p-6">
                <p className={`${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
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
