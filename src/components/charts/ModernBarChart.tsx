import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface ModernBarChartProps {
  data: Array<{ categoria: string; valor: number; meta?: number }>;
  isLoading: boolean;
  title?: string;
  isDark?: boolean;
}

const ModernBarChart: React.FC<ModernBarChartProps> = ({
  data,
  isLoading,
  title,
  isDark: propIsDark,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : resolvedTheme === 'dark';

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className={`h-6 animate-pulse rounded w-1/3 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}></div>
        <div className={`h-64 animate-pulse rounded-xl ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
        }`}>{title}</h3>
      )}
      
      <div className={`p-4 rounded-xl border shadow-card ${
        isDark 
          ? 'bg-dark-card border-dark-border' 
          : 'bg-light-card border-accent-400/20'
      }`}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={isDark ? "#374151" : "#e5e7eb"} 
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isDark ? "#3b82f6" : "#062140"} stopOpacity={0.8} />
                <stop offset="100%" stopColor={isDark ? "#3b82f6" : "#062140"} stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="metaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isDark ? "#ef4444" : "#fed282"} stopOpacity={0.8} />
                <stop offset="100%" stopColor={isDark ? "#ef4444" : "#fed282"} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="categoria"
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
              formatter={(value: any, name: string) => [
                `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`,
                name === "valor" ? "Valor Atual" : "Meta",
              ]}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: 15
              }}
              formatter={(value) => (
                <span className={`text-fluid-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  {value === "valor" ? "Valor Atual" : "Meta"}
                </span>
              )}
            />
            <Bar 
              dataKey="valor" 
              fill="url(#barGradient)" 
              radius={[4, 4, 0, 0]} 
              name="valor"
              animationDuration={1500}
            />
            {data.some((item) => item.meta) && (
              <Bar
                dataKey="meta"
                fill="url(#metaGradient)"
                radius={[4, 4, 0, 0]}
                name="meta"
                animationDuration={1500}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModernBarChart; 