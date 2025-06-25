import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface ModernPieChartProps {
  data: Array<{ nome: string; valor: number; cor: string }>;
  isLoading: boolean;
}

const ModernPieChart: React.FC<ModernPieChartProps> = ({ data, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = data.reduce((acc, item) => acc + item.valor, 0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-32 h-32 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  // Cores sólidas para as fatias do gráfico
  const colors = [
    "#3b82f6", // Azul para Alimentação
    "#10b981", // Verde para Transporte
    "#f59e0b", // Laranja para Lazer
    "#ef4444", // Vermelho para Moradia
    "#8b5cf6"  // Roxo para Outros
  ];

  // Função para calcular os pontos do gráfico de pizza
  const createPieChart = () => {
    const size = 280; // Tamanho do SVG
    const radius = 120; // Raio do gráfico
    const centerX = size / 2;
    const centerY = size / 2;

    let startAngle = 0;
    const paths = [];
    const labels = [];

    // Criar fatias do gráfico
    for (let i = 0; i < data.length; i++) {
      const value = data[i].valor;
      const percentage = value / total;
      const angle = percentage * 2 * Math.PI;
      const endAngle = startAngle + angle;

      // Calcular pontos para o caminho SVG
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      // Determinar se o arco é maior que 180 graus
      const largeArcFlag = percentage > 0.5 ? 1 : 0;

      // Criar o caminho SVG para a fatia
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      // Calcular posição para o texto
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.65; // Mais perto do centro para textos
      const labelX = centerX + labelRadius * Math.cos(labelAngle);
      const labelY = centerY + labelRadius * Math.sin(labelAngle);

      // Adicionar caminhos e textos
      const isActive = i === activeIndex;
      const displacement = isActive ? 10 : 0; // Desloca a fatia selecionada
      const displacementX = displacement * Math.cos(labelAngle);
      const displacementY = displacement * Math.sin(labelAngle);

      paths.push(
        <path
          key={`slice-${i}`}
          d={pathData}
          fill={colors[i % colors.length]}
          stroke="#fff"
          strokeWidth={isActive ? 2 : 1}
          transform={isActive ? `translate(${displacementX} ${displacementY})` : ''}
          style={{
            transition: 'transform 0.3s ease, filter 0.3s ease',
            filter: isActive ? 'drop-shadow(0px 0px 8px rgba(0,0,0,0.3))' : 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(-1)}
          onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
        />
      );

      // Adicionar texto se a fatia for grande o suficiente
      if (percentage > 0.05) {
        labels.push(
          <text
            key={`label-${i}`}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize="14"
            fontWeight="bold"
            pointerEvents="none"
          >
            {Math.round(percentage * 100)}%
          </text>
        );
      }

      // Atualizar ângulo inicial para a próxima fatia
      startAngle = endAngle;
    }

    return { paths, labels };
  };

  const { paths, labels } = createPieChart();

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-card p-6 rounded-xl shadow-lg" style={{ width: '340px' }}>
          <h3 className="text-center font-bold text-xl mb-4 text-foreground">Gastos por Categoria: R$ 2.300,00</h3>

          {/* Gráfico de pizza em SVG */}
          <svg width="280" height="280" viewBox="0 0 280 280" style={{
            margin: '0 auto',
            display: 'block',
            boxShadow: isDark ? '0 0 10px rgba(255,255,255,0.05)' : '0 0 10px rgba(0,0,0,0.05)',
            borderRadius: '50%',
            background: isDark ? 'rgb(15, 23, 42)' : '#ffffff'
          }}>
            {/* Círculo de fundo para garantir que não apareça nada por trás */}
            <circle cx="140" cy="140" r="140" fill={isDark ? 'rgb(15, 23, 42)' : '#ffffff'} />
            <circle cx="140" cy="140" r="122" fill={isDark ? 'rgb(2, 6, 23)' : '#fafafa'} stroke={isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0'} strokeWidth="1" />

            {/* Fatias do gráfico */}
            {paths}

            {/* Textos de percentual */}
            {labels}

            {/* Círculo interno (opcional, para estilo donut) */}
            <circle cx="140" cy="140" r="50" fill={isDark ? 'rgb(15, 23, 42)' : 'white'} stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0'} strokeWidth="2" />
            <text x="140" y="140" textAnchor="middle" dominantBaseline="middle" fill={isDark ? '#fff' : '#333'} fontSize="14" fontWeight="bold">
              Gastos
            </text>
          </svg>
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-card p-4 rounded-xl shadow-sm">
        <h3 className="text-center font-bold text-lg mb-2 text-foreground">Detalhamento de Gastos</h3>
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => {
            const percentage = ((item.valor / total) * 100).toFixed(1);

            return (
              <div
                key={item.nome}
                className={`p-3 rounded-lg transition-all duration-200 text-white ${activeIndex === index ? 'scale-105 shadow-lg' : ''
                  }`}
                style={{
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  backgroundColor: colors[index % colors.length]
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
              >
                <p className="text-sm font-bold">{item.nome}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs opacity-90">{percentage}%</p>
                  <p className="text-sm font-bold">
                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernPieChart; 