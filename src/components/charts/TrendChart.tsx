import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface TrendChartProps {
  data: Array<{
    mes: string;
    receitas: number;
    despesas: number;
    liquido: number;
  }>;
  isLoading: boolean;
  isDark?: boolean;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, isLoading, isDark: propIsDark }) => {
  const { resolvedTheme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : resolvedTheme === 'dark';

  if (isLoading) {
    return <div className={`h-64 animate-pulse rounded-xl ${
      isDark ? 'bg-gray-700' : 'bg-gray-200'
    }`}></div>;
  }

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${
        isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
      }`}>
        Tendência Financeira
      </h3>
      
      <div className={`p-4 rounded-xl border shadow-card ${
        isDark 
          ? 'bg-dark-card border-dark-border' 
          : 'bg-light-card border-accent-400/20'
      }`}>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#10b981" : "#10b981"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isDark ? "#10b981" : "#10b981"} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#ef4444" : "#ef4444"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isDark ? "#ef4444" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLiquido" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#3b82f6" : "#062140"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isDark ? "#3b82f6" : "#062140"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? "#94a3b8" : "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? "#94a3b8" : "#64748b" }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: any) => [
                `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`,
                "",
              ]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="receitas"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReceitas)"
              name="Receitas"
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDespesas)"
              name="Despesas"
            />
            <Area
              type="monotone"
              dataKey="liquido"
              stroke={isDark ? "#3b82f6" : "#062140"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLiquido)"
              name="Saldo Líquido"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success-500"></div>
            <span className={`text-fluid-sm ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error-500"></div>
            <span className={`text-fluid-sm ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>Despesas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isDark ? 'bg-info-500' : 'bg-primary-900'
            }`}></div>
            <span className={`text-fluid-sm ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>Saldo Líquido</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendChart; 