import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, BarChart, Banknote } from "lucide-react";
import type { Transacao } from "../../types";

interface TransactionListProps {
  transactions: Transacao[];
  title?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  isDark?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  title = "Histórico de Transações",
  icon = <BarChart className="h-5 w-5 text-shop-primary" />,
  isLoading = false,
  emptyMessage = "Nenhuma transação registrada.",
  className = "",
  isDark = false,
}) => {
  return (
    <div className={`bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        <span className="text-sm bg-secondary/30 px-3 py-1 rounded-full">
          {transactions.length} {transactions.length === 1 ? "registro" : "registros"}
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
        ) : transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transacao, index) => {
              const isGanho = transacao.tipo === "ganho";
              
              return (
                <motion.div
                  key={transacao.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="flex justify-between items-center p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isGanho ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {isGanho ? (
                        <Banknote className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transacao.descricao || "Sem descrição"}</p>
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                          {transacao.categoria}
                        </span>
                        <span>•</span>
                        <span>{new Date(transacao.data).toLocaleDateString("pt-BR")}</span>
                        {transacao.recorrente && (
                          <>
                            <span>•</span>
                            <span className="text-shop-primary">
                              Recorrente ({transacao.periodo || "mensal"})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold ${isGanho ? "text-green-500" : "text-red-500"} whitespace-nowrap`}>
                    {isGanho ? "+" : "-"} R$ {transacao.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              {isLoading ? (
                <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-shop-primary" />
              ) : (
                <BarChart className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium mb-1">Sem registros</h3>
            <p className="text-muted-foreground max-w-md">
              {emptyMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList; 