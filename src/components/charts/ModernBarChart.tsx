import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ModernBarChartProps {
  data: Array<{ categoria: string; valor: number; meta?: number }>;
  isLoading: boolean;
  title?: string;
}

const ModernBarChart: React.FC<ModernBarChartProps> = ({
  data,
  isLoading,
  title,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-muted animate-pulse rounded w-1/3"></div>
        <div className="h-64 bg-muted animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="categoria"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "rgb(100, 116, 139)" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "rgb(100, 116, 139)" }}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(var(--card))",
              border: "1px solid rgb(var(--border) / 0.5)",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: any) => [
              `R$ ${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`,
              "Valor",
            ]}
          />
          <Bar dataKey="valor" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          {data.some((item) => item.meta) && (
            <Bar
              dataKey="meta"
              fill="rgba(239, 68, 68, 0.3)"
              radius={[4, 4, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModernBarChart; 