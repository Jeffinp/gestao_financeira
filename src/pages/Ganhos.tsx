import { useState } from "react";
import { useFinancasStore } from "../store/financasStore";
import { motion } from "framer-motion";
import { PlusCircle, Banknote, Clock } from "lucide-react";
import type { Categoria, Transacao } from "../types";

// Animação para mostrar os elementos
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Ganhos() {
  const { categorias, transacoes, adicionarTransacao } = useFinancasStore();

  // Filtrar apenas categorias de ganhos
  const categoriasGanho = categorias.filter(
    (cat: Categoria) => cat.tipo === "ganho" || cat.tipo === "ambos"
  );

  // Filtrar apenas transações do tipo ganho
  const ganhos = transacoes
    .filter((t: Transacao) => t.tipo === "ganho")
    .sort((a: Transacao, b: Transacao) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const [formData, setFormData] = useState({
    valor: "",
    categoria: "",
    data: new Date().toISOString().split("T")[0],
    descricao: "",
    recorrente: false,
    periodo: "mensal",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.valor || !formData.categoria || !formData.data) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criar objeto de transação e adicionar ao store
    const novoGanho = {
      valor: parseFloat(formData.valor),
      categoria: formData.categoria,
      data: formData.data,
      descricao: formData.descricao,
      recorrente: formData.recorrente,
      tipo: "ganho" as const,
    };

    adicionarTransacao(novoGanho);

    // Reset do formulário
    setFormData({
      valor: "",
      categoria: "",
      data: new Date().toISOString().split("T")[0],
      descricao: "",
      recorrente: false,
      periodo: "mensal",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-fluid-3xl font-bold text-balance mb-2">
            Registrar Ganho
          </h1>
          <p className="text-muted-foreground">
            Adicione e visualize suas receitas
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          {" "}
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/20 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-shop-primary" />
              <h2 className="text-lg font-medium">Novo Ganho</h2>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="valor"
                      className="block text-sm font-medium mb-1"
                    >
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
                    <label
                      htmlFor="categoria"
                      className="block text-sm font-medium mb-1"
                    >
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
                      {categoriasGanho.map((cat: Categoria) => (
                        <option key={cat.id} value={cat.nome}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="data"
                      className="block text-sm font-medium mb-1"
                    >
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
                    <label
                      htmlFor="descricao"
                      className="block text-sm font-medium mb-1"
                    >
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      rows={3}
                      value={formData.descricao}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Detalhes sobre o ganho..."
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
                      Ganho recorrente
                    </label>
                  </div>

                  {formData.recorrente && (
                    <div>
                      <label
                        htmlFor="periodo"
                        className="block text-sm font-medium mb-1"
                      >
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
                    className="w-full bg-shop-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-shop-primary/90 transition"
                  >
                    Registrar Ganho
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            {" "}
            <div className="p-6 border-b border-border/20 flex items-center gap-2">
              <Clock className="h-5 w-5 text-shop-primary" />
              <h2 className="text-lg font-medium">Histórico de Ganhos</h2>
            </div>
            <div className="p-6">
              {ganhos.length > 0 ? (
                <div className="space-y-4">
                  {ganhos.map((ganho: Transacao, index: number) => (
                    <motion.div
                      key={ganho.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="flex justify-between items-center p-4 rounded-md bg-secondary/20 border border-border/10 hover:bg-secondary/30 transition-colors"
                    >
                      {" "}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                          <Banknote className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{ganho.descricao}</p>
                          <div className="flex space-x-2 text-sm text-muted-foreground">
                            <span>{ganho.categoria}</span>
                            <span>•</span>
                            <span>
                              {new Date(ganho.data).toLocaleDateString("pt-BR")}
                            </span>
                            {ganho.recorrente && <span>•</span>}
                            {ganho.recorrente && (
                              <span className="text-shop-primary">
                                Recorrente
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-green-500">
                        + R${" "}
                        {ganho.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Banknote className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">
                    Nenhum ganho registrado ainda.
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
