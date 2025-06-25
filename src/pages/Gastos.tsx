import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFinancasStore } from "../store/financasStore";
import {
  ArrowDownCircle,
  RotateCcw,
  BarChart,
  DollarSign,
} from "lucide-react";

// Importando o componente TransactionForm
import TransactionForm from "../components/forms/TransactionForm";
import type { TransactionFormData } from "../components/forms/TransactionForm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
  const categoriasGasto = categorias.filter(
    (cat) => cat.tipo === "gasto" || cat.tipo === "ambos"
  );

  // Filtrar apenas transações do tipo gasto
  const gastos = transacoes
    .filter((t) => t.tipo === "gasto")
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  // Handler para o formulário de transação
  const handleSubmitTransaction = (data: TransactionFormData) => {
    adicionarTransacao(data);
  };

  // Calcular estatísticas para o dashboard
  const totalGastoMes = gastos
    .filter((g) => {
      const dataGasto = new Date(g.data);
      const hoje = new Date();
      return (
        dataGasto.getMonth() === hoje.getMonth() &&
        dataGasto.getFullYear() === hoje.getFullYear()
      );
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
          <h1 className="text-fluid-3xl font-bold text-balance">
            Registrar Gastos
          </h1>
          <p className="text-muted-foreground mt-1">
            Controle suas despesas de forma eficiente
          </p>
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
              <h2 className="text-sm font-medium text-muted-foreground">
                Total no Mês
              </h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-red-500">
                  R${" "}
                  {totalGastoMes.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
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
              <h2 className="text-sm font-medium text-muted-foreground">
                Top Categorias
              </h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <div className="mt-1">
                  {topCategorias.length > 0 ? (
                    <div className="space-y-1">
                      {topCategorias.map((cat, index) => (
                        <div
                          key={cat.categoria}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>
                            {index + 1}. {cat.categoria}
                          </span>
                          <span className="font-medium">
                            R${" "}
                            {cat.valor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Nenhum gasto registrado
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card hover-lift rounded-xl shadow-card p-5 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 bg-opacity-10 rounded-lg">
              <ArrowDownCircle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">
                Último Gasto
              </h2>
              {isLoading ? (
                <div className="h-7 w-28 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : gastos.length > 0 ? (
                <div className="mt-1">
                  <p className="text-foreground font-medium">
                    {gastos[0].descricao || gastos[0].categoria}
                  </p>
                  <p className="text-sm text-red-500 font-medium">
                    R${" "}
                    {gastos[0].valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum gasto registrado
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de novo gasto */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <TransactionForm 
            tipo="gasto"
            categorias={categoriasGasto}
            onSubmit={handleSubmitTransaction}
            icon={<ArrowDownCircle className="h-5 w-5 text-red-500" />}
            title="Novo Gasto"
          />
        </motion.div>

        {/* Lista de gastos */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-medium">Histórico de Gastos</h2>
              </div>
              <span className="text-sm bg-secondary/30 px-3 py-1 rounded-full">
                {gastos.length} registros
              </span>
            </div>

            <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                // Placeholders de carregamento
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 animate-pulse flex justify-between items-center"
                  >
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                ))
              ) : gastos.length > 0 ? (
                gastos.map((gasto) => (
                  <div
                    key={gasto.id}
                    className="p-4 hover:bg-secondary/20 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">
                        {gasto.descricao || "Sem descrição"}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                          {gasto.categoria}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(gasto.data).toLocaleDateString("pt-BR")}
                        </span>
                        {gasto.recorrente && (
                          <>
                            <span>•</span>
                            <span className="text-shop-primary">Recorrente</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-red-500 whitespace-nowrap">
                      - R${" "}
                      {gasto.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhum gasto registrado ainda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
