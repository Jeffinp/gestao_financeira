import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, BarChart, ArrowUpCircle } from "lucide-react";
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
  icon = <BarChart className="h-5 w-5" />,
  isLoading = false,
  emptyMessage = "Nenhuma transação registrada.",
  className = "",
  isDark = false,
}) => {
  return (
    <div className={`rounded-xl shadow-card hover:shadow-card-hover transition-all duration-250 overflow-hidden ${className} ${
      isDark 
        ? 'bg-dark-card border border-dark-border' 
        : 'bg-light-card border border-accent-400/20'
    }`}>
      <div className={`p-6 flex items-center justify-between ${
        isDark ? 'border-b border-dark-border' : 'border-b border-light-border'
      }`}>
        <div className="flex items-center gap-2">
          <div className={isDark ? 'text-info-500' : 'text-primary-900'}>
            {icon}
          </div>
          <h2 className={`text-lg font-medium ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>{title}</h2>
        </div>
        <span className={`text-fluid-xs px-3 py-1 rounded-full ${
          isDark ? 'bg-gray-700/50 text-dark-text-secondary' : 'bg-gray-100 text-light-text-secondary'
        }`}>
          {transactions.length} {transactions.length === 1 ? "registro" : "registros"}
        </span>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {isLoading ? (
          <div className="space-y-4 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`rounded-lg p-4 animate-pulse ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100/70'
              }`}>
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full ${
                    isDark ? 'bg-gray-600' : 'bg-gray-200'
                  }`}></div>
                  <div className="space-y-2 flex-1">
                    <div className={`h-4 rounded w-3/4 ${
                      isDark ? 'bg-gray-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`h-3 rounded w-1/2 ${
                      isDark ? 'bg-gray-600' : 'bg-gray-200'
                    }`}></div>
                  </div>
                  <div className={`h-5 rounded w-20 ${
                    isDark ? 'bg-gray-600' : 'bg-gray-200'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className={`p-8 text-center ${
            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            <p className="text-fluid-base">{emptyMessage}</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {transactions.map((transaction) => {
              const isGasto = transaction.tipo === "gasto";
              const formattedValue = transaction.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 flex items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      isGasto 
                        ? isDark ? 'bg-error-500/20' : 'bg-error-500/10' 
                        : isDark ? 'bg-success-500/20' : 'bg-success-500/10'
                    }`}>
                      {isGasto ? (
                        <ArrowDownCircle className={`h-5 w-5 ${
                          isDark ? 'text-error-500' : 'text-error-600'
                        }`} />
                      ) : (
                        <ArrowUpCircle className={`h-5 w-5 ${
                          isDark ? 'text-success-500' : 'text-success-600'
                        }`} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-medium text-fluid-base ${
                        isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                      }`}>
                        {transaction.categoria}
                      </h3>
                      <p className={`text-fluid-xs ${
                        isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                      }`}>
                        {transaction.descricao || "Sem descrição"} • {new Date(transaction.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <span className={`font-medium ${
                    isGasto 
                      ? isDark ? 'text-error-500' : 'text-error-600' 
                      : isDark ? 'text-success-500' : 'text-success-600'
                  }`}>
                    {isGasto ? "-" : "+"}{formattedValue}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList; 