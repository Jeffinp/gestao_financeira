import React from "react";
import { motion } from "framer-motion";
import { BarChart, RotateCcw, Eye, FileDown, Plus, Share, PieChart } from "lucide-react";

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

  return (
    <div className="bg-gradient-to-br from-shop-primary/10 via-shop-accent/5 to-shop-primary/15 border-b border-border/20 relative overflow-hidden">
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
                className="p-3 bg-shop-primary/20 rounded-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BarChart className="h-8 w-8 text-shop-primary" />
              </motion.div>
              <div>
                <h1 className="text-fluid-4xl font-bold text-foreground">
                  Dashboard Financeiro
                </h1>
                <p className="text-muted-foreground text-fluid-base">
                  {new Date().toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-fluid-base max-w-2xl">
              Gerencie suas finanças com inteligência e tome decisões baseadas
              em dados precisos
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/50 transition-all duration-200 shadow-sm"
              onClick={onRefresh}
            >
              <RotateCcw className="h-4 w-4" />
              Atualizar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-shop-primary text-sm flex items-center gap-2 shadow-button"
            >
              <Eye className="h-4 w-4" />
              Relatório Completo
            </motion.button>
            
            {hasExportOptions && (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-shop-outline text-sm flex items-center gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  Exportar
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    {onExportPDF && (
                      <button
                        onClick={onExportPDF}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                      >
                        <FileDown className="h-4 w-4" />
                        Relatório PDF
                      </button>
                    )}
                    {onExportCSV && (
                      <button
                        onClick={onExportCSV}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
                      >
                        <Share className="h-4 w-4" />
                        Transações CSV
                      </button>
                    )}
                    {onExportJSON && (
                      <button
                        onClick={onExportJSON}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/30 flex items-center gap-2"
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
                className="btn-shop-accent text-sm flex items-center gap-2"
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