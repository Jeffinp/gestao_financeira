import React from "react";
import { motion } from "framer-motion";
import { BarChart, RotateCcw, Eye, FileDown, Plus, Share } from "lucide-react";
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
        ? 'bg-gradient-to-br from-primary-700/10 via-primary-600/5 to-primary-700/10 border-dark-border'
        : 'bg-gradient-to-br from-primary-900/10 via-primary-800/5 to-primary-900/10 border-accent-400/20'
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
                    ? 'bg-primary-600/20' 
                    : 'bg-primary-900/20'
                }`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BarChart className={`h-8 w-8 ${
                  isDark 
                    ? 'text-primary-500' 
                    : 'text-primary-900'
                }`} />
              </motion.div>
              <div>
                <h1 className={`text-fluid-4xl font-bold ${
                  isDark 
                    ? 'text-dark-text-primary' 
                    : 'text-light-text-primary'
                }`}>
                  Dashboard Financeiro
                </h1>
                <p className={`text-fluid-base ${
                  isDark 
                    ? 'text-dark-text-secondary' 
                    : 'text-light-text-secondary'
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
                ? 'text-dark-text-secondary' 
                : 'text-light-text-secondary'
            }`}>
              Gerencie suas finanças com inteligência e tome decisões baseadas
              em dados precisos
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-3 backdrop-blur-sm border rounded-xl text-fluid-sm font-medium transition-all duration-250 shadow-button hover:shadow-button-hover ${
                isDark 
                  ? 'bg-dark-card border-dark-border text-dark-text-primary hover:bg-gray-700/50' 
                  : 'bg-light-card border-accent-400/30 text-light-text-primary hover:bg-gray-100/50'
              }`}
              onClick={onRefresh}
            >
              <RotateCcw className="h-4 w-4" />
              Atualizar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-fluid-sm flex items-center gap-2 shadow-button hover:shadow-button-hover px-4 py-3 rounded-xl font-medium ${
                isDark 
                  ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                  : 'bg-primary-900 hover:bg-primary-950 text-white'
              }`}
            >
              <Eye className="h-4 w-4" />
              Relatório Completo
            </motion.button>
            
            {onNewTransaction && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNewTransaction}
                className={`text-fluid-sm flex items-center gap-2 shadow-button hover:shadow-button-hover px-4 py-3 rounded-xl font-medium ${
                  isDark 
                    ? 'bg-success-500 hover:bg-success-600 text-white' 
                    : 'bg-success-500 hover:bg-success-600 text-white'
                }`}
              >
                <Plus className="h-4 w-4" />
                Nova Transação
              </motion.button>
            )}

            {hasExportOptions && (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-fluid-sm flex items-center gap-2 shadow-button hover:shadow-button-hover px-4 py-3 rounded-xl font-medium ${
                    isDark 
                      ? 'bg-dark-card border border-dark-border text-dark-text-primary hover:bg-gray-700/50' 
                      : 'bg-light-card border border-light-border text-light-text-primary hover:bg-gray-100/50'
                  }`}
                >
                  <FileDown className="h-4 w-4" />
                  Exportar
                </motion.button>

                <div className={`absolute right-0 top-full mt-2 p-2 rounded-xl shadow-dropdown z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-250 ${
                  isDark 
                    ? 'bg-dark-card border border-dark-border' 
                    : 'bg-light-card border border-light-border'
                }`}>
                  {onExportPDF && (
                    <button
                      onClick={onExportPDF}
                      className={`w-full text-left px-3 py-2 rounded-lg text-fluid-sm ${
                        isDark 
                          ? 'hover:bg-gray-700/50 text-dark-text-primary' 
                          : 'hover:bg-gray-100 text-light-text-primary'
                      }`}
                    >
                      Exportar como PDF
                    </button>
                  )}
                  {onExportCSV && (
                    <button
                      onClick={onExportCSV}
                      className={`w-full text-left px-3 py-2 rounded-lg text-fluid-sm ${
                        isDark 
                          ? 'hover:bg-gray-700/50 text-dark-text-primary' 
                          : 'hover:bg-gray-100 text-light-text-primary'
                      }`}
                    >
                      Exportar como CSV
                    </button>
                  )}
                  {onExportJSON && (
                    <button
                      onClick={onExportJSON}
                      className={`w-full text-left px-3 py-2 rounded-lg text-fluid-sm ${
                        isDark 
                          ? 'hover:bg-gray-700/50 text-dark-text-primary' 
                          : 'hover:bg-gray-100 text-light-text-primary'
                      }`}
                    >
                      Exportar como JSON
                    </button>
                  )}
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-fluid-sm flex items-center gap-2 shadow-button hover:shadow-button-hover px-4 py-3 rounded-xl font-medium ${
                isDark 
                  ? 'bg-dark-card border border-dark-border text-dark-text-primary hover:bg-gray-700/50' 
                  : 'bg-light-card border border-light-border text-light-text-primary hover:bg-gray-100/50'
              }`}
            >
              <Share className="h-4 w-4" />
              Compartilhar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeader; 