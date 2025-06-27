import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categorias: string[];
  descricao: string;
  avaliacao: number;
  imagem: string;
  disponivel: boolean;
  promocao: boolean;
  precoPromocional?: number;
}

interface ProductCardProps {
  produto: Produto;
  onAddToCart: (produto: Produto) => void;
  onToggleFavorite: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onAddToCart,
  onToggleFavorite,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(produto.id);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:shadow-lg group"
    >
      <div className="relative overflow-hidden">
        {/* Badge de promoção */}
        {produto.promocao && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[hsl(var(--shop-accent))] bg-opacity-10 text-[hsl(var(--shop-accent))]">
              Promoção
            </span>
          </div>
        )}

        {/* Badge de disponibilidade */}
        {!produto.disponivel && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[hsl(var(--shop-error))] bg-opacity-10 text-[hsl(var(--shop-error))]">
              Indisponível
            </span>
          </div>
        )}

        {/* Imagem com efeito de zoom */}
        <Link to={`/produto/${produto.id}`} className="block">
          <div className="overflow-hidden h-64 bg-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Botão de favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-popover shadow-sm hover:bg-popover/90 transition-all border border-border"
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-shop-accent fill-current" />
          ) : (
            <Heart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Informações do produto */}
      <div className="p-4">
        <Link to={`/produto/${produto.id}`}>
          <h3 className="text-lg font-semibold text-pretty hover:text-shop-primary transition-colors">
            {produto.nome}
          </h3>
        </Link>

        {/* Preço com formatação condicional para promoção */}
        <div className="mt-1 flex items-baseline gap-2">
          {produto.promocao ? (
            <>
              <span className="text-shop-accent font-bold text-fluid-lg">
                {produto.precoPromocional?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span className="text-gray-400 line-through text-sm">
                {produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </>
          ) : (
            <span className="text-shop-primary font-bold text-fluid-lg">
              {produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
        </div>

        {/* Avaliação */}
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(produto.avaliacao)
                    ? "text-yellow-400"
                    : i < produto.avaliacao
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-gray-500 text-sm">
            ({produto.avaliacao})
          </span>
        </div>

        {/* Botão de adicionar ao carrinho */}
        <div className="mt-4">
          <button
            onClick={() => onAddToCart(produto)}
            disabled={!produto.disponivel}
            className={`w-full flex items-center justify-center gap-2 ${
              produto.disponivel
                ? "bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-md"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>
              {produto.disponivel ? "Adicionar ao carrinho" : "Indisponível"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
