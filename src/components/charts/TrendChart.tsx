import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";

interface TrendChartProps {
  data: Array<{
    mes: string;
    receitas: number;
    despesas: number;
    liquido: number;
  }>;
  isLoading: boolean;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="h-64 bg-muted animate-pulse rounded-xl"></div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="mes"
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
          formatter={(value: any, name: string) => [
            `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            name === "receitas"
              ? "Receitas"
              : name === "despesas"
                ? "Despesas"
                : "Líquido",
          ]}
        />
        <Area
          type="monotone"
          dataKey="receitas"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorReceitas)"
        />
        <Area
          type="monotone"
          dataKey="despesas"
          stroke="#ef4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDespesas)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrendChart; 