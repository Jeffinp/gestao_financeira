import { useFinancasStore } from '../store/financasStore';

export default function Dashboard() {
  const { saldo, transacoes } = useFinancasStore();
  
  // Calcula totais do mês atual
  const dataAtual = new Date();
  const primeiroDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
  const ultimoDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
  
  const transacoesMes = transacoes.filter(t => {
    const dataTransacao = new Date(t.data);
    return dataTransacao >= primeiroDiaMes && dataTransacao <= ultimoDiaMes;
  });
  
  const ganhosMes = transacoesMes
    .filter(t => t.tipo === 'ganho')
    .reduce((total, t) => total + t.valor, 0);
    
  const gastosMes = transacoesMes
    .filter(t => t.tipo === 'gasto')
    .reduce((total, t) => total + t.valor, 0);
  
  // Obter transações recentes (últimas 3)
  const transacoesRecentes = [...transacoes]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);
  
  return (
    <div className="container pt-24 pb-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Saldo Atual</h2>
          <p className="text-3xl font-bold text-primary">
            R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Entradas do Mês</h2>
          <p className="text-3xl font-bold text-green-500">
            R$ {ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Saídas do Mês</h2>
          <p className="text-3xl font-bold text-red-500">
            R$ {gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Gastos por Categoria</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de categorias será exibido aqui</p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Histórico Recente</h2>
          <div className="space-y-4">
            {transacoesRecentes.map((transacao) => (
              <div key={transacao.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{transacao.descricao}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transacao.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className={`font-medium ${transacao.tipo === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                  {transacao.tipo === 'ganho' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
            
            {transacoesRecentes.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Nenhuma transação registrada ainda.
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Previsão para os Próximos 3 Meses</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Gráfico de previsão será exibido aqui</p>
        </div>
      </div>
    </div>
  );
} 