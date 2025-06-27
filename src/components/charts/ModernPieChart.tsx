import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface ModernPieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  isLoading: boolean;
  isDark?: boolean;
}

const COLORS = [
  "#3b82f6", // Azul
  "#10b981", // Verde
  "#f59e0b", // Âmbar
  "#ef4444", // Vermelho
  "#8b5cf6", // Roxo
  "#ec4899", // Rosa
  "#06b6d4", // Ciano
  "#14b8a6", // Teal
  "#f97316", // Laranja
  "#6366f1", // Índigo
];

const COLORS_LIGHT = [
  "#062140", // Azul escuro
  "#059669", // Verde escuro
  "#d97706", // Âmbar escuro
  "#dc2626", // Vermelho escuro
  "#7e22ce", // Roxo escuro
  "#be185d", // Rosa escuro
  "#0e7490", // Ciano escuro
  "#0f766e", // Teal escuro
  "#c2410c", // Laranja escuro
  "#4f46e5", // Índigo escuro
];

const ModernPieChart: React.FC<ModernPieChartProps> = ({ data, isLoading, isDark: propIsDark }) => {
  const { resolvedTheme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : resolvedTheme === 'dark';
  
  const colorScheme = isDark ? COLORS : COLORS_LIGHT;

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
      <h3 className={`text-lg font-semibold ${
        isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
      }`}>
        Distribuição de Gastos
      </h3>
      
      <div className={`p-4 rounded-xl border shadow-card ${
        isDark 
          ? 'bg-dark-card border-dark-border' 
          : 'bg-light-card border-accent-400/20'
      }`}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colorScheme[index % colorScheme.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`
              }
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend 
              formatter={(value) => (
                <span className={`text-fluid-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  {value}
                </span>
              )}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: 20
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className={`mt-4 pt-4 border-t ${
          isDark ? 'border-dark-border' : 'border-light-border'
        }`}>
          <p className={`text-center text-fluid-sm ${
            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            Total: R$ {data
              .reduce((sum, item) => sum + item.value, 0)
              .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernPieChart; 