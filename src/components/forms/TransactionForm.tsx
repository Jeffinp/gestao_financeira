import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, PlusCircle, ArrowDownCircle, CheckCircle, Tag } from "lucide-react";
import type { Categoria } from "../../types";

interface TransactionFormProps {
  tipo: "ganho" | "gasto";
  categorias: Categoria[];
  onSubmit: (data: TransactionFormData) => void;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}

export interface TransactionFormData {
  valor: number;
  categoria: string;
  data: string;
  descricao: string;
  recorrente: boolean;
  periodo: string;
  tipo: "ganho" | "gasto";
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  tipo,
  categorias,
  onSubmit,
  className = "",
  icon,
  title,
}) => {
  const [formData, setFormData] = useState<Omit<TransactionFormData, "tipo">>({
    valor: undefined as any,
    categoria: "",
    data: new Date().toISOString().split("T")[0],
    descricao: "",
    recorrente: false,
    periodo: "mensal",
  });

  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

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
    const transacao: TransactionFormData = {
      ...formData,
      valor: parseFloat(formData.valor as any),
      tipo,
    };

    onSubmit(transacao);

    // Feedback visual de sucesso
    setShowSuccessFeedback(true);
    setTimeout(() => {
      setShowSuccessFeedback(false);
    }, 3000);

    // Reset do formulário
    setFormData({
      valor: undefined as any,
      categoria: "",
      data: new Date().toISOString().split("T")[0],
      descricao: "",
      recorrente: false,
      periodo: "mensal",
    });
  };

  const isGasto = tipo === "gasto";
  const iconColor = isGasto ? "text-red-500" : "text-shop-primary";
  const buttonClass = isGasto
    ? "bg-red-500 hover:bg-red-600 text-white"
    : "bg-shop-primary hover:bg-shop-primary/90 text-white";

  return (
    <div className={`bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon || (
            isGasto ? (
              <ArrowDownCircle className={`h-5 w-5 ${iconColor}`} />
            ) : (
              <PlusCircle className={`h-5 w-5 ${iconColor}`} />
            )
          )}
          <h2 className="text-lg font-medium">{title || (isGasto ? "Novo Gasto" : "Novo Ganho")}</h2>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {showSuccessFeedback && (
              <div className="bg-shop-success bg-opacity-10 text-shop-success text-sm p-3 rounded-md flex items-center gap-2 transition-opacity duration-300">
                <CheckCircle className="h-5 w-5" />
                <span>{isGasto ? "Gasto" : "Ganho"} registrado com sucesso!</span>
              </div>
            )}

            <div>
              <label htmlFor="valor" className="block text-sm font-medium mb-1">
                Valor (R$) <span className="text-shop-error">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  id="valor"
                  name="valor"
                  type="number"
                  step="0.01"
                  required
                  value={formData.valor === undefined ? "" : formData.valor}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 focus:${
                    isGasto ? "border-red-500 focus:ring-red-500/20" : "border-shop-primary focus:ring-shop-primary/20"
                  } outline-none transition-all`}
                  placeholder="0,00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium mb-1">
                Categoria <span className="text-shop-error">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  id="categoria"
                  name="categoria"
                  required
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 focus:${
                    isGasto ? "border-red-500 focus:ring-red-500/20" : "border-shop-primary focus:ring-shop-primary/20"
                  } outline-none transition-all`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nome}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium mb-1">
                Data <span className="text-shop-error">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="data"
                  name="data"
                  type="date"
                  required
                  value={formData.data}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 focus:${
                    isGasto ? "border-red-500 focus:ring-red-500/20" : "border-shop-primary focus:ring-shop-primary/20"
                  } outline-none transition-all`}
                />
              </div>
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
                className={`w-full rounded-md border border-input bg-background px-3 py-2 focus:${
                  isGasto ? "border-red-500 focus:ring-red-500/20" : "border-shop-primary focus:ring-shop-primary/20"
                } outline-none transition-all`}
                placeholder={`Detalhes sobre o ${isGasto ? "gasto" : "ganho"}...`}
              ></textarea>
            </div>

            <div className="flex items-center bg-secondary/30 p-3 rounded-md">
              <input
                id="recorrente"
                name="recorrente"
                type="checkbox"
                checked={formData.recorrente}
                onChange={handleChange}
                className={`h-4 w-4 rounded border-input ${isGasto ? "text-red-500" : "text-shop-primary"}`}
              />
              <label htmlFor="recorrente" className="ml-2 block text-sm">
                {isGasto ? "Gasto" : "Ganho"} recorrente
              </label>
            </div>

            {formData.recorrente && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="periodo" className="block text-sm font-medium mb-1">
                  Período
                </label>
                <select
                  id="periodo"
                  name="periodo"
                  value={formData.periodo}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 focus:${
                    isGasto ? "border-red-500 focus:ring-red-500/20" : "border-shop-primary focus:ring-shop-primary/20"
                  } outline-none transition-all`}
                >
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>
              </motion.div>
            )}

            <button
              type="submit"
              className={`w-full ${buttonClass} font-medium py-2 px-4 rounded-md shadow-button hover:shadow-button-hover transition-all duration-300 hover:scale-102 active:scale-98 flex items-center justify-center gap-2`}
            >
              {isGasto ? (
                <ArrowDownCircle className="h-5 w-5" />
              ) : (
                <PlusCircle className="h-5 w-5" />
              )}
              <span>Registrar {isGasto ? "Gasto" : "Ganho"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm; 