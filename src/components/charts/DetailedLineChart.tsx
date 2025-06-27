import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
    <div className={`space-y-4 p-4 rounded-xl border shadow-sm ${
      isDark 
        ? 'bg-gray-800/60 border-gray-700' 
        : 'bg-white border-[#fed282]/20'
    }`}>
      {title && (
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="receitasGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="despesasGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="economiaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <Line
            type="monotone"
            dataKey="receitas"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="despesas"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#ef4444" }}
          />
          <Line
            type="monotone"
            dataKey="economia"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legenda customizada */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          <span className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
          <span className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Despesas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
          <span className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Economia</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedLineChart; 