import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

export default function AvisoDesenvolvimento() {
    const [mostrarAviso, setMostrarAviso] = useState(false); useEffect(() => {
        // Mostrar o aviso sempre que o site for carregado/reiniciado
        setMostrarAviso(true);
    }, []); const fecharAviso = () => {
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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={fecharAviso}
                    >                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
                            onClick={(e) => e.stopPropagation()}
                        >                            {/* Botão de fechar */}                            <button
                            onClick={fecharAviso}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Fechar aviso"
                        >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>

                            {/* Ícone de aviso */}                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-shop-warning/10 flex items-center justify-center">
                                    <AlertTriangle className="h-6 w-6 text-shop-warning" />
                                </div><div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Site em Desenvolvimento
                                    </h2>
                                </div>
                            </div>                            {/* Conteúdo do aviso */}
                            <div className="space-y-3 text-sm text-gray-600">
                                <p>
                                    Bem-vindo ao <strong className="text-shop-primary">MeuCofre</strong>!
                                    Este site ainda está em desenvolvimento ativo.
                                </p>

                                <div className="bg-shop-warning/5 border border-shop-warning/20 rounded-lg p-3">
                                    <p className="text-shop-warning font-medium mb-2">⚠️ Importante:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>• Todos os dados mostrados são <strong>fictícios</strong></li>
                                        <li>• As funcionalidades estão sendo aprimoradas</li>
                                        <li>• Em breve teremos integração com servidor</li>
                                        <li>• Algumas features podem não funcionar perfeitamente</li>
                                    </ul>
                                </div>

                                <p className="text-xs">
                                    Obrigado pela paciência enquanto melhoramos sua experiência! 🚀
                                </p>
                            </div>

                            {/* Botão de ação */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={fecharAviso}
                                    className="flex-1 bg-shop-primary text-white font-medium py-2.5 px-4 rounded-lg hover:bg-shop-primary/90 transition-colors duration-200"
                                >
                                    Entendi, continuar
                                </button>
                            </div>                            {/* Texto pequeno */}
                            <p className="text-xs text-gray-500 text-center mt-3">
                                Este aviso aparecerá sempre que a página for recarregada
                            </p>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
