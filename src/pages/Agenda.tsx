import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, PlusIcon, CheckCircleIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
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

  // Verificar se há lembretes para hoje
  const hoje = new Date().toISOString().split('T')[0];
  const lembretesHoje = lembretes.filter(l => l.data === hoje);

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-fluid-3xl font-bold text-balance">Agenda & Lembretes</h1>
          <p className="text-muted-foreground mt-1">Organize seus compromissos financeiros</p>
        </div>

        <button
          className="mt-3 md:mt-0 flex items-center gap-2 text-sm hover:text-shop-primary transition-colors"
          onClick={() => window.location.reload()}
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Atualizar lembretes</span>
        </button>
      </motion.div>

      {lembretesHoje.length > 0 && (
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-shop-primary bg-opacity-10 border border-shop-primary border-opacity-20 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="bg-shop-primary bg-opacity-20 rounded-full p-2">
              <BellIconSolid className="h-6 w-6 text-shop-primary" />
            </div>
            <div>
              <h2 className="font-medium text-shop-primary">Lembretes para hoje</h2>
              <p className="text-sm">Você tem {lembretesHoje.length} {lembretesHoje.length === 1 ? 'lembrete' : 'lembretes'} agendado{lembretesHoje.length === 1 ? '' : 's'} para hoje</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusIcon className="h-5 w-5 text-shop-primary" />
                <h2 className="text-lg font-medium">Novo Lembrete</h2>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div id="success-feedback" className="bg-shop-success bg-opacity-10 text-shop-success text-sm p-3 rounded-md flex items-center gap-2 transition-opacity duration-300 opacity-0">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>Lembrete adicionado com sucesso!</span>
                  </div>

                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium mb-1">
                      Título <span className="text-shop-error">*</span>
                    </label>
                    <input
                      id="titulo"
                      name="titulo"
                      type="text"
                      required
                      value={formData.titulo}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
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
                      className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
                      placeholder="Detalhes do lembrete..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="data" className="block text-sm font-medium mb-1">
                      Data <span className="text-shop-error">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="data"
                        name="data"
                        type="date"
                        required
                        value={formData.data}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="valor" className="block text-sm font-medium mb-1">
                        Valor (opcional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                        <input
                          id="valor"
                          name="valor"
                          type="number"
                          step="0.01"
                          value={formData.valor === undefined ? '' : formData.valor}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
                          placeholder="0,00"
                        />
                      </div>
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
                        className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
                        disabled={formData.valor === undefined}
                      >
                        <option value="">Selecione</option>
                        <option value="ganho">Ganho</option>
                        <option value="gasto">Gasto</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center bg-secondary/30 p-3 rounded-md">
                    <input
                      id="notificar"
                      name="notificar"
                      type="checkbox"
                      checked={formData.notificar}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-input text-shop-primary focus:ring-shop-primary"
                    />
                    <label htmlFor="notificar" className="ml-2 block text-sm">
                      Receber notificação na data
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-shop-primary flex items-center justify-center gap-2"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Adicionar Lembrete</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-shop-primary" />
                <h2 className="text-lg font-medium">Lembretes Agendados</h2>
              </div>
              <span className="text-sm bg-secondary/50 px-3 py-1 rounded-full">
                {lembretes.length} {lembretes.length === 1 ? 'lembrete' : 'lembretes'}
              </span>
            </div>

            <div className="p-4 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="space-y-4 p-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-4 animate-pulse">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : Object.keys(lembretesPorMes).length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(lembretesPorMes).map(([mes, lembretesMes], mesIndex) => (
                    <motion.div
                      key={mes}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * mesIndex }}
                    >
                      <h3 className="text-md font-medium mb-4 capitalize border-b pb-2 flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-shop-primary" />
                        {mes}
                      </h3>

                      <div className="space-y-3">
                        {lembretesMes
                          .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                          .map((lembrete, index) => {
                            const dataLembrete = new Date(lembrete.data);
                            const dataAtual = new Date();
                            const isHoje = dataLembrete.toDateString() === dataAtual.toDateString();
                            const isPassado = dataLembrete < dataAtual && !isHoje;

                            return (
                              <motion.div
                                key={lembrete.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                className={`p-4 rounded-lg hover:shadow-md transition-all ${isHoje
                                  ? 'bg-shop-primary bg-opacity-5 border border-shop-primary border-opacity-20'
                                  : isPassado
                                    ? 'bg-gray-100 border border-gray-200'
                                    : 'bg-secondary/30'
                                  }`}
                              >
                                <div className="flex justify-between">
                                  <div className="flex gap-3">
                                    <div className="mt-1">
                                      <CalendarIcon className={`h-5 w-5 ${isHoje ? 'text-shop-primary' : isPassado ? 'text-gray-400' : 'text-muted-foreground'
                                        }`} />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className={`font-medium ${isHoje ? 'text-shop-primary' : ''}`}>
                                          {lembrete.titulo}
                                        </h4>
                                        {lembrete.notificar && (
                                          <BellIconSolid className="h-4 w-4 text-shop-accent" />
                                        )}
                                        {isHoje && (
                                          <span className="text-xs bg-shop-primary text-white px-2 py-0.5 rounded-full">
                                            Hoje
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {dataLembrete.toLocaleDateString('pt-BR')}
                                      </p>

                                      {lembrete.descricao && (
                                        <p className="text-sm mt-2 text-pretty">{lembrete.descricao}</p>
                                      )}

                                      {lembrete.valor !== undefined && lembrete.tipo && (
                                        <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-opacity-10 bg-secondary">
                                          <span className={lembrete.tipo === 'ganho' ? 'text-green-500' : 'text-red-500'}>
                                            {lembrete.tipo === 'ganho' ? '+' : '-'} R$ {lembrete.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => handleDelete(lembrete.id)}
                                    className="text-gray-400 hover:text-shop-error transition-colors p-1"
                                    aria-label="Remover lembrete"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <CalendarIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Sem lembretes</h3>
                  <p className="text-muted-foreground max-w-md">
                    Você ainda não tem lembretes agendados. Use o formulário ao lado para adicionar seu primeiro lembrete.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}