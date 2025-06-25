import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className: string }>;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading: boolean;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
  isLoading,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-card hover-lift rounded-xl shadow-card border border-border/50 p-6 group relative overflow-hidden"
    >
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend.isPositive ? "text-shop-success" : "text-shop-error"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </h3>
          {isLoading ? (
            <div className="h-8 bg-muted animate-pulse rounded-md w-32"></div>
          ) : (
            <p className="text-2xl font-bold text-foreground">{value}</p>
          )}
        </div>

        {trend && !isLoading && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              {trend.isPositive ? "Aumento" : "Diminuição"} comparado ao mês
              anterior
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard; 