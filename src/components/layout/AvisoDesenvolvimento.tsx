import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function AvisoDesenvolvimento() {
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    // Mostrar o aviso sempre que o site for carregado/reiniciado
    setMostrarAviso(true);
  }, []);
  
  const fecharAviso = () => {
    setMostrarAviso(false);
    // Não salvar no localStorage para que apareça novamente ao reiniciar
  };

  return (
    <AnimatePresence>
      {mostrarAviso && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
              isDark 
                ? 'bg-gray-900/95' 
                : 'bg-white/95'
            }`}
            onClick={fecharAviso}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`${
                isDark 
                  ? 'bg-gray-800 text-gray-100 border-gray-700' 
                  : 'bg-white text-gray-800 border-[#fed282]/50'
              } border rounded-2xl shadow-2xl max-w-md w-full p-6 relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão de fechar */}
              <button
                onClick={fecharAviso}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
                aria-label="Fechar aviso"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Ícone de aviso */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-shop-warning/20' 
                    : 'bg-shop-warning/10'
                }`}>
                  <AlertTriangle className="h-6 w-6 text-shop-warning" />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${
                    isDark 
                      ? 'text-white' 
                      : 'text-gray-900'
                  }`}>
                    Site em Desenvolvimento
                  </h2>
                </div>
              </div>
              
              {/* Conteúdo do aviso */}
              <div className={`space-y-3 text-sm ${
                isDark 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
              }`}>
                <p>
                  Bem-vindo ao{" "}
                  <strong className={`${
                    isDark 
                      ? 'text-blue-400' 
                      : 'text-[#062140]'
                  }`}>MeuCofre</strong>! Este
                  site ainda está em desenvolvimento ativo.
                </p>

                <div className={`border rounded-lg p-3 ${
                  isDark 
                    ? 'bg-shop-warning/10 border-shop-warning/30' 
                    : 'bg-shop-warning/5 border-shop-warning/20'
                }`}>
                  <p className="text-shop-warning font-medium mb-2">
                    ⚠️ Importante:
                  </p>
                  <ul className={`space-y-1 text-xs ${
                    isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  }`}>
                    <li>
                      • Todos os dados mostrados são <strong>fictícios</strong>
                    </li>
                    <li>• As funcionalidades estão sendo aprimoradas</li>
                    <li>• Em breve teremos integração com servidor</li>
                    <li>
                      • Algumas features podem não funcionar perfeitamente
                    </li>
                  </ul>
                </div>

                <p className={`text-xs ${
                  isDark 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
                }`}>
                  Obrigado pela paciência enquanto melhoramos sua experiência!
                  🚀
                </p>
              </div>
              
              {/* Botão de ação */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={fecharAviso}
                  className={`flex-1 font-medium py-3 px-5 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-800 text-white border border-gray-600' 
                      : 'bg-[#062140] hover:bg-[#051426] text-white border border-[#fed282]'
                  }`}
                >
                  Entendi, continuar
                </button>
              </div>
              
              {/* Texto pequeno */}
              <p className={`text-xs text-center mt-3 ${
                isDark 
                  ? 'text-gray-400' 
                  : 'text-gray-500'
              }`}>
                Este aviso aparecerá sempre que a página for recarregada
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
