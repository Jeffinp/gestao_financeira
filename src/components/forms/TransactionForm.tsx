import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, PlusCircle, ArrowDownCircle, CheckCircle, Tag } from "lucide-react";
import type { Categoria } from "../../types";
import { useTheme } from "../../context/ThemeContext";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
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
  const iconColor = isGasto 
    ? isDark ? 'text-error-500' : 'text-error-600' 
    : isDark ? 'text-success-500' : 'text-success-600';
  
  const buttonClass = isGasto
    ? isDark ? 'bg-error-500 hover:bg-error-600' : 'bg-error-500 hover:bg-error-600'
    : isDark ? 'bg-success-500 hover:bg-success-600' : 'bg-success-500 hover:bg-success-600';

  return (
    <div className={`rounded-xl shadow-card hover:shadow-card-hover transition-all duration-250 overflow-hidden ${className} ${
      isDark 
        ? 'bg-dark-card border border-dark-border' 
        : 'bg-light-card border border-accent-400/20'
    }`}>
      <div className={`p-6 border-b ${
        isDark ? 'border-dark-border' : 'border-light-border'
      } flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {icon || (
            isGasto ? (
              <ArrowDownCircle className={iconColor} />
            ) : (
              <PlusCircle className={iconColor} />
            )
          )}
          <h2 className={`text-lg font-medium ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>{title || (isGasto ? "Novo Gasto" : "Novo Ganho")}</h2>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {showSuccessFeedback && (
              <div className="bg-success-500/10 text-success-500 text-fluid-sm p-3 rounded-md flex items-center gap-2 transition-opacity duration-300">
                <CheckCircle className="h-5 w-5" />
                <span>{isGasto ? "Gasto" : "Ganho"} registrado com sucesso!</span>
              </div>
            )}

            {/* Campo de valor */}
            <div>
              <label 
                htmlFor="valor" 
                className={`block text-fluid-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                Valor*
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  R$
                </span>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  step="0.01"
                  min="0"
                  required
                  value={formData.valor || ""}
                  onChange={handleChange}
                  className={`block w-full pl-8 pr-4 py-2.5 rounded-md border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-dark-text-primary focus:border-primary-500' 
                      : 'bg-white border-gray-300 text-light-text-primary focus:border-primary-500'
                  } focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                  placeholder="0,00"
                />
              </div>
            </div>

            {/* Campo de categoria */}
            <div>
              <label 
                htmlFor="categoria" 
                className={`block text-fluid-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                Categoria*
              </label>
              <div className="relative">
                <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`} />
                <select
                  id="categoria"
                  name="categoria"
                  required
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`block w-full pl-8 pr-4 py-2.5 rounded-md border appearance-none ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-dark-text-primary focus:border-primary-500' 
                      : 'bg-white border-gray-300 text-light-text-primary focus:border-primary-500'
                  } focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias
                    .filter((cat) => cat.tipo === tipo || cat.tipo === "ambos")
                    .map((cat) => (
                      <option key={cat.id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className={`h-4 w-4 ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Campo de data */}
            <div>
              <label 
                htmlFor="data" 
                className={`block text-fluid-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                Data*
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`} />
                <input
                  type="date"
                  id="data"
                  name="data"
                  required
                  value={formData.data}
                  onChange={handleChange}
                  className={`block w-full pl-8 pr-4 py-2.5 rounded-md border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-dark-text-primary focus:border-primary-500' 
                      : 'bg-white border-gray-300 text-light-text-primary focus:border-primary-500'
                  } focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                />
              </div>
            </div>

            {/* Campo de descrição */}
            <div>
              <label 
                htmlFor="descricao" 
                className={`block text-fluid-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={3}
                value={formData.descricao}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 rounded-md border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-dark-text-primary focus:border-primary-500' 
                    : 'bg-white border-gray-300 text-light-text-primary focus:border-primary-500'
                } focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none`}
                placeholder="Detalhes sobre a transação..."
              />
            </div>

            {/* Campo de recorrência */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recorrente"
                name="recorrente"
                checked={formData.recorrente}
                onChange={handleChange}
                className={`h-4 w-4 rounded ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-primary-500 focus:ring-primary-500/20' 
                    : 'bg-white border-gray-300 text-primary-500 focus:ring-primary-500/20'
                }`}
              />
              <label 
                htmlFor="recorrente" 
                className={`ml-2 text-fluid-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                Transação recorrente
              </label>
            </div>

            {/* Campo de período (condicional) */}
            {formData.recorrente && (
              <div>
                <label 
                  htmlFor="periodo" 
                  className={`block text-fluid-sm font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}
                >
                  Período
                </label>
                <select
                  id="periodo"
                  name="periodo"
                  value={formData.periodo}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2.5 rounded-md border appearance-none ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-dark-text-primary focus:border-primary-500' 
                      : 'bg-white border-gray-300 text-light-text-primary focus:border-primary-500'
                  } focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
                >
                  <option value="diário">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                  <option value="bimestral">Bimestral</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="semestral">Semestral</option>
                  <option value="anual">Anual</option>
                </select>
              </div>
            )}

            {/* Botão de envio */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${buttonClass} text-white font-medium py-2.5 px-4 rounded-md shadow-button hover:shadow-button-hover transition-all duration-250 flex items-center justify-center gap-2 mt-2`}
            >
              {isGasto ? (
                <ArrowDownCircle className="h-5 w-5" />
              ) : (
                <PlusCircle className="h-5 w-5" />
              )}
              <span>Registrar {isGasto ? "Gasto" : "Ganho"}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm; 