import { useState } from 'react';
import { useFinancasStore } from '../store/financasStore';

export default function Gastos() {
  const { categorias, transacoes, adicionarTransacao } = useFinancasStore();
  
  // Filtrar apenas categorias de gastos
  const categoriasGasto = categorias.filter(cat => cat.tipo === 'gasto' || cat.tipo === 'ambos');
  
  // Filtrar apenas transações do tipo gasto
  const gastos = transacoes
    .filter(t => t.tipo === 'gasto')
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  
  const [formData, setFormData] = useState({
    valor: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    recorrente: false,
    periodo: 'mensal'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.valor || !formData.categoria || !formData.data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Criar objeto de transação e adicionar ao store
    const novoGasto = {
      valor: parseFloat(formData.valor),
      categoria: formData.categoria,
      data: formData.data,
      descricao: formData.descricao,
      recorrente: formData.recorrente,
      tipo: 'gasto' as const
    };
    
    adicionarTransacao(novoGasto);
    
    // Reset do formulário
    setFormData({
      valor: '',
      categoria: '',
      data: new Date().toISOString().split('T')[0],
      descricao: '',
      recorrente: false,
      periodo: 'mensal'
    });
  };
  
  return (
    <div className="container pt-24 pb-10">
      <h1 className="text-2xl font-bold mb-6">Registrar Gasto</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="valor" className="block text-sm font-medium mb-1">
                    Valor (R$)
                  </label>
                  <input
                    id="valor"
                    name="valor"
                    type="number"
                    step="0.01"
                    required
                    value={formData.valor}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label htmlFor="categoria" className="block text-sm font-medium mb-1">
                    Categoria
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    required
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoriasGasto.map(cat => (
                      <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="data" className="block text-sm font-medium mb-1">
                    Data
                  </label>
                  <input
                    id="data"
                    name="data"
                    type="date"
                    required
                    value={formData.data}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={3}
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Detalhes sobre o gasto..."
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="recorrente"
                    name="recorrente"
                    type="checkbox"
                    checked={formData.recorrente}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input"
                  />
                  <label htmlFor="recorrente" className="ml-2 block text-sm">
                    Gasto recorrente
                  </label>
                </div>
                
                {formData.recorrente && (
                  <div>
                    <label htmlFor="periodo" className="block text-sm font-medium mb-1">
                      Período
                    </label>
                    <select
                      id="periodo"
                      name="periodo"
                      value={formData.periodo}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="diario">Diário</option>
                      <option value="semanal">Semanal</option>
                      <option value="mensal">Mensal</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/90 transition"
                >
                  Registrar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-medium">Histórico de Gastos</h2>
            </div>
            
            <div className="p-6">
              {gastos.length > 0 ? (
                <div className="space-y-4">
                  {gastos.map(gasto => (
                    <div key={gasto.id} className="flex justify-between items-center p-4 rounded-md bg-secondary/50">
                      <div>
                        <p className="font-medium">{gasto.descricao}</p>
                        <div className="flex space-x-2 text-sm text-muted-foreground">
                          <span>{gasto.categoria}</span>
                          <span>•</span>
                          <span>{new Date(gasto.data).toLocaleDateString('pt-BR')}</span>
                          {gasto.recorrente && <span>•</span>}
                          {gasto.recorrente && <span className="text-primary">Recorrente</span>}
                        </div>
                      </div>
                      <span className="font-bold text-red-500">
                        - R$ {gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum gasto registrado ainda.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 