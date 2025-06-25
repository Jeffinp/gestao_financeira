import { useFinancasStore } from "../store/financasStore";
import { motion } from "framer-motion";
import { PlusCircle, Banknote } from "lucide-react";
import type { Categoria, Transacao } from "../types";

// Importando o componente TransactionForm
import TransactionForm from "../components/forms/TransactionForm";
import type { TransactionFormData } from "../components/forms/TransactionForm";

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

  // Handler para o formulário de transação
  const handleSubmitTransaction = (data: TransactionFormData) => {
    adicionarTransacao(data);
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
          <TransactionForm 
            tipo="ganho"
            categorias={categoriasGanho}
            onSubmit={handleSubmitTransaction}
            icon={<PlusCircle className="h-5 w-5 text-shop-primary" />}
            title="Novo Ganho"
          />
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-card hover-lift rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-shop-primary" />
                <h2 className="text-lg font-medium">Histórico de Ganhos</h2>
              </div>
              <span className="text-sm bg-secondary/30 px-3 py-1 rounded-full">
                {ganhos.length} registros
              </span>
            </div>

            <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
              {ganhos.length > 0 ? (
                ganhos.map((ganho) => (
                  <div
                    key={ganho.id}
                    className="p-4 hover:bg-secondary/20 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">
                        {ganho.descricao || "Sem descrição"}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                          {ganho.categoria}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(ganho.data).toLocaleDateString("pt-BR")}
                        </span>
                        {ganho.recorrente && (
                          <>
                            <span>•</span>
                            <span className="text-shop-primary">Recorrente</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-shop-primary whitespace-nowrap">
                      + R${" "}
                      {ganho.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
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
