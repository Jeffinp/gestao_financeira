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
    <div className={`rounded-xl shadow-sm overflow-hidden ${className} ${
      isDark 
        ? 'bg-gray-800/60 border border-gray-700 hover:shadow-md' 
        : 'bg-white border border-[#fed282]/20 hover:shadow-md'
    }`}>
      <div className={`p-6 flex items-center justify-between ${
        isDark ? 'border-b border-gray-700' : 'border-b border-[#fed282]/20'
      }`}>
        <div className="flex items-center gap-2">
          <div className={isDark ? 'text-blue-400' : 'text-[#062140]'}>
            {icon}
          </div>
          <h2 className={`text-lg font-medium ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>{title}</h2>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${
          isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {transactions.length} {transactions.length === 1 ? "registro" : "registros"}
        </span>
      </div>

      <div className="p-4 max-h-[600px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4 p-2">
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
                  className={`flex justify-between items-center p-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-700/40 hover:bg-gray-700/60' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isGanho 
                        ? isDark ? "bg-green-900/30" : "bg-green-100" 
                        : isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}>
                      {isGanho ? (
                        <Banknote className={`h-5 w-5 ${
                          isDark ? "text-green-400" : "text-green-600"
                        }`} />
                      ) : (
                        <ArrowDownCircle className={`h-5 w-5 ${
                          isDark ? "text-red-400" : "text-red-500"
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>{transacao.descricao || "Sem descrição"}</p>
                      <div className="flex flex-wrap items-center gap-x-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {transacao.categoria}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>•</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          {new Date(transacao.data).toLocaleDateString("pt-BR")}
                        </span>
                        {transacao.recorrente && (
                          <>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>•</span>
                            <span className={isDark ? 'text-blue-400' : 'text-[#062140]'}>
                              Recorrente ({transacao.periodo || "mensal"})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold whitespace-nowrap ${
                    isGanho 
                      ? isDark ? "text-green-400" : "text-green-600" 
                      : isDark ? "text-red-400" : "text-red-500"
                  }`}>
                    {isGanho ? "+" : "-"} R$ {transacao.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {isLoading ? (
                <div className={`animate-spin h-8 w-8 border-4 rounded-full ${
                  isDark 
                    ? 'border-gray-600 border-t-blue-400' 
                    : 'border-gray-200 border-t-[#062140]'
                }`} />
              ) : (
                <BarChart className={`h-8 w-8 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              )}
            </div>
            <h3 className={`text-lg font-medium mb-1 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Sem registros</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {emptyMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList; 