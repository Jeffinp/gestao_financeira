import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface DetailedLineChartProps {
  data: Array<{
    periodo: string;
    receitas: number;
    despesas: number;
    economia: number;
  }>;
  isLoading: boolean;
  title?: string;
  isDark?: boolean;
}

const DetailedLineChart: React.FC<DetailedLineChartProps> = ({
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
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={isDark ? "#374151" : "#e5e7eb"} 
            />
            <XAxis
              dataKey="periodo"
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
                name === "receitas" 
                  ? "Receitas" 
                  : name === "despesas" 
                    ? "Despesas" 
                    : "Economia",
              ]}
            />
            <Legend 
              formatter={(value) => (
                <span className={`text-fluid-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  {value === "receitas" 
                    ? "Receitas" 
                    : value === "despesas" 
                      ? "Despesas" 
                      : "Economia"}
                </span>
              )}
              wrapperStyle={{
                paddingTop: 15
              }}
            />
            <Line
              type="monotone"
              dataKey="receitas"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="receitas"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="despesas"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="economia"
              stroke={isDark ? "#3b82f6" : "#062140"}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="economia"
              animationDuration={1500}
            />
          </LineChart>
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
            }`}>Economia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedLineChart; 