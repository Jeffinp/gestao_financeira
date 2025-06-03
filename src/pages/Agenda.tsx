import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, PlusIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import { useFinancasStore } from '../store/financasStore';
import type { Lembrete } from '../types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Agenda() {
  const { lembretes, adicionarLembrete, removerLembrete } = useFinancasStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

    // Feedback visual de sucesso
    const successFeedback = document.getElementById('success-feedback');
    if (successFeedback) {
      successFeedback.classList.remove('opacity-0');
      setTimeout(() => {
        successFeedback?.classList.add('opacity-0');
      }, 3000);
    }

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

  // Ordenar meses cronologicamente
  const mesesOrdenados = Object.keys(lembretesPorMes).sort((a, b) => {
    const [mesA, anoA] = a.split(' de ');
    const [mesB, anoB] = b.split(' de ');

    const dataA = new Date(`${mesA} 1, ${anoA}`);
    const dataB = new Date(`${mesB} 1, ${anoB}`);

    return dataA.getTime() - dataB.getTime();
  });

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-fluid-3xl font-bold mb-2">Agenda Financeira</h1>
            <p className="text-muted-foreground">Gerencie seus compromissos financeiros</p>
          </div>

          <div
            id="success-feedback"
            className="fixed top-20 right-4 bg-secondary/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-300 opacity-0 z-50"
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span>Lembrete adicionado com sucesso!</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PlusIcon className="h-5 w-5 text-primary" />
              Novo Lembrete
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-foreground mb-1">
                  Título*
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Ex: Pagamento de Aluguel"
                  required
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-1">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Detalhes adicionais..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-foreground mb-1">
                    Data*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-card p-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="valor" className="block text-sm font-medium text-foreground mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    value={formData.valor || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-foreground mb-1">
                  Tipo
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-card p-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                >
                  <option value="">Selecione...</option>
                  <option value="ganho">Receita</option>
                  <option value="gasto">Despesa</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notificar"
                  name="notificar"
                  checked={formData.notificar}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-card border-input rounded focus:ring-primary transition-all duration-200"
                />
                <label htmlFor="notificar" className="ml-2 text-sm font-medium text-foreground">
                  Receber notificação
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-200"
              >
                <PlusIcon className="h-5 w-5" />
                Adicionar Lembrete
              </button>
            </form>
          </div>
        </motion.div>

        {/* Lista de Lembretes */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="mb-6">
                <div className="animate-pulse h-5 bg-muted rounded w-40 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(4).fill(0).map((_, j) => (
                    <div key={j} className="animate-pulse">
                      <div className="h-32 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : lembretes.length === 0 ? (
            <div className="card flex flex-col items-center justify-center py-16">
              <CalendarIcon className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum lembrete</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                Você ainda não tem lembretes cadastrados. Utilize o formulário ao lado para adicionar seu primeiro lembrete.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {mesesOrdenados.map(mes => {
                const lembretesMes = lembretesPorMes[mes];

                return (
                  <div key={mes} className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 capitalize">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      {mes}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lembretesMes.map(lembrete => {
                        const data = new Date(lembrete.data);
                        const hoje = new Date();
                        const ehHoje = data.toDateString() === hoje.toDateString();
                        const ehFuturo = data > hoje;

                        return (
                          <div
                            key={lembrete.id}
                            className={`card border hover-lift ${ehHoje
                                ? 'border-primary/40 bg-primary/5'
                                : ehFuturo
                                  ? 'border-border/40'
                                  : 'border-border/40 bg-muted/30'
                              }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2 mb-3">
                                <div className={`text-xs font-medium py-1 px-2 rounded-full ${ehHoje
                                    ? 'bg-primary/20 text-primary'
                                    : ehFuturo
                                      ? 'bg-secondary/20 text-secondary'
                                      : 'bg-muted-foreground/20 text-muted-foreground'
                                  }`}>
                                  {data.toLocaleDateString('pt-BR')}
                                </div>

                                {lembrete.notificar && (
                                  <div className="text-primary">
                                    <BellIconSolid className="h-4 w-4" />
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => handleDelete(lembrete.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                aria-label="Remover lembrete"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>

                            <h3 className="text-lg font-medium mb-1">{lembrete.titulo}</h3>

                            {lembrete.descricao && (
                              <p className="text-sm text-muted-foreground mb-2">{lembrete.descricao}</p>
                            )}

                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/40">
                              {lembrete.tipo && lembrete.valor ? (
                                <div className={`text-sm font-medium ${lembrete.tipo === 'ganho' ? 'text-secondary' : 'text-destructive'
                                  }`}>
                                  {lembrete.tipo === 'ganho' ? 'Receita:' : 'Despesa:'} R$ {lembrete.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                              ) : (
                                <div></div>
                              )}

                              <div className={`text-xs ${ehHoje
                                  ? 'text-primary font-medium'
                                  : ehFuturo
                                    ? 'text-secondary'
                                    : 'text-muted-foreground'
                                }`}>
                                {ehHoje
                                  ? 'Hoje'
                                  : ehFuturo
                                    ? `Em ${Math.ceil((data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))} dias`
                                    : `Há ${Math.ceil((hoje.getTime() - data.getTime()) / (1000 * 60 * 60 * 24))} dias`
                                }
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}