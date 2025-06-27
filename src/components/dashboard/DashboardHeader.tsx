import React from "react";
import { motion } from "framer-motion";
import { BarChart, RotateCcw, Eye, FileDown, Plus, Share, PieChart } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onNewTransaction?: () => void;
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  onExportJSON?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onRefresh = () => window.location.reload(),
  onNewTransaction,
  onExportPDF,
  onExportCSV,
  onExportJSON,
}) => {
  const hasExportOptions = onExportPDF || onExportCSV || onExportJSON;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`${
      isDark
        ? 'bg-gradient-to-br from-blue-900/10 via-blue-800/5 to-blue-900/10 border-gray-700/20'
        : 'bg-gradient-to-br from-[#062140]/10 via-[#083a73]/5 to-[#062140]/10 border-[#fed282]/20'
    } border-b relative overflow-hidden`}>
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
                className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-blue-600/20' 
                    : 'bg-[#062140]/20'
                }`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BarChart className={`h-8 w-8 ${
                  isDark 
                    ? 'text-blue-500' 
                    : 'text-[#062140]'
                }`} />
              </motion.div>
              <div>
                <h1 className={`text-fluid-4xl font-bold ${
                  isDark 
                    ? 'text-white' 
                    : 'text-gray-800'
                }`}>
                  Dashboard Financeiro
                </h1>
                <p className={`text-fluid-base ${
                  isDark 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}>
                  {new Date().toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-fluid-base max-w-2xl ${
              isDark 
                ? 'text-gray-400' 
                : 'text-gray-500'
            }`}>
              Gerencie suas finanças com inteligência e tome decisões baseadas
              em dados precisos
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-3 backdrop-blur-sm border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50 text-gray-200 hover:bg-gray-700/50' 
                  : 'bg-white/80 border-[#fed282]/30 text-gray-700 hover:bg-gray-100/50'
              }`}
              onClick={onRefresh}
            >
              <RotateCcw className="h-4 w-4" />
              Atualizar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-sm flex items-center gap-2 shadow-button px-4 py-3 rounded-xl font-medium ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-[#062140] hover:bg-[#051426] text-white'
              }`}
            >
              <Eye className="h-4 w-4" />
              Relatório Completo
            </motion.button>
            
            {hasExportOptions && (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-sm flex items-center gap-2 px-4 py-3 rounded-xl border font-medium ${
                    isDark 
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                      : 'border-[#fed282]/50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileDown className="h-4 w-4" />
                  Exportar
                </motion.button>
                <div className={`absolute right-0 top-full mt-2 w-48 border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-[#fed282]/30'
                }`}>
                  <div className="py-2">
                    {onExportPDF && (
                      <button
                        onClick={onExportPDF}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700/30' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <FileDown className="h-4 w-4" />
                        Relatório PDF
                      </button>
                    )}
                    {onExportCSV && (
                      <button
                        onClick={onExportCSV}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700/30' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Share className="h-4 w-4" />
                        Transações CSV
                      </button>
                    )}
                    {onExportJSON && (
                      <button
                        onClick={onExportJSON}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700/30' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <PieChart className="h-4 w-4" />
                        Dados JSON
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {onNewTransaction && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-sm flex items-center gap-2 px-4 py-3 rounded-xl font-medium ${
                  isDark 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'bg-[#fed282] hover:bg-[#edc272] text-[#062140]'
                }`}
                onClick={onNewTransaction}
              >
                <Plus className="h-4 w-4" />
                Nova Transação
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeader; 