import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useFinancasStore } from '../store/financasStore';
import type { Lembrete } from '../types';

export default function Agenda() {
  const { lembretes, adicionarLembrete, removerLembrete } = useFinancasStore();
  
  const [formData, setFormData] = useState<Omit<Lembrete, 'id'>>({
    titulo: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0],
    valor: undefined,
    tipo: undefined,
    notificar: true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'valor') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? undefined : parseFloat(value)
      }));
      return;
    }
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.titulo || !formData.data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    adicionarLembrete(formData);
    
    // Reset do formulário
    setFormData({
      titulo: '',
      descricao: '',
      data: new Date().toISOString().split('T')[0],
      valor: undefined,
      tipo: undefined,
      notificar: true
    });
  };
  
  const handleDelete = (id: number) => {
    removerLembrete(id);
  };
  
  // Agrupar lembretes por mês
  const lembretesPorMes = lembretes.reduce((acc, lembrete) => {
    const mes = new Date(lembrete.data).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    
    if (!acc[mes]) {
      acc[mes] = [];
    }
    
    acc[mes].push(lembrete);
    return acc;
  }, {} as Record<string, Lembrete[]>);
  
  return (
    <div className="container pt-24 pb-10">
      <h1 className="text-2xl font-bold mb-6">Agenda & Lembretes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Adicionar Lembrete</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    required
                    value={formData.titulo}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Título do lembrete"
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
                    placeholder="Detalhes do lembrete..."
                  ></textarea>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="valor" className="block text-sm font-medium mb-1">
                      Valor (opcional)
                    </label>
                    <input
                      id="valor"
                      name="valor"
                      type="number"
                      step="0.01"
                      value={formData.valor === undefined ? '' : formData.valor}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                      Tipo
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      disabled={formData.valor === undefined}
                    >
                      <option value="">Selecione</option>
                      <option value="ganho">Ganho</option>
                      <option value="gasto">Gasto</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="notificar"
                    name="notificar"
                    type="checkbox"
                    checked={formData.notificar}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input"
                  />
                  <label htmlFor="notificar" className="ml-2 block text-sm">
                    Receber notificação
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/90 transition"
                >
                  Adicionar Lembrete
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-medium">Lembretes Agendados</h2>
            </div>
            
            <div className="p-6">
              {Object.keys(lembretesPorMes).length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(lembretesPorMes).map(([mes, lembretesMes]) => (
                    <div key={mes}>
                      <h3 className="text-md font-medium mb-4 capitalize border-b pb-2">{mes}</h3>
                      
                      <div className="space-y-4">
                        {lembretesMes.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()).map(lembrete => (
                          <div key={lembrete.id} className="flex justify-between items-start p-4 rounded-md bg-secondary/50">
                            <div className="flex gap-3">
                              <div className="mt-1">
                                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{lembrete.titulo}</h4>
                                  {lembrete.notificar && (
                                    <BellIcon className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(lembrete.data).toLocaleDateString('pt-BR')}
                                </p>
                                <p className="text-sm mt-1">{lembrete.descricao}</p>
                                
                                {lembrete.valor !== undefined && lembrete.tipo && (
                                  <p className={`text-sm font-medium mt-2 ${lembrete.tipo === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                                    {lembrete.tipo === 'ganho' ? '+' : '-'} R$ {lembrete.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleDelete(lembrete.id)}
                              className="text-sm text-muted-foreground hover:text-destructive transition"
                            >
                              Remover
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p>Nenhum lembrete agendado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 