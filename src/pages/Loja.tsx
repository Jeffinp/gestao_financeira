import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, SlidersHorizontal, X, Trash } from "lucide-react";

// Importando o componente ProductCard extraído
import ProductCard from "../components/shop/ProductCard";

// Dados simulados de produtos
const PRODUTOS = [
  {
    id: 1,
    nome: "Camisa Premium",
    preco: 129.9,
    categorias: ["roupas", "camisas"],
    descricao: "Camisa de alta qualidade com tecido 100% algodão",
    avaliacao: 4.5,
    imagem:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
    disponivel: true,
    promocao: false,
  },
  {
    id: 2,
    nome: "Calça Jeans Moderna",
    preco: 199.9,
    categorias: ["roupas", "calças"],
    descricao: "Calça jeans confortável e durável",
    avaliacao: 4.2,
    imagem:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    disponivel: true,
    promocao: true,
    precoPromocional: 159.9,
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    preco: 299.9,
    categorias: ["calçados", "esportes"],
    descricao: "Tênis confortável para práticas esportivas",
    avaliacao: 4.7,
    imagem:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    disponivel: true,
    promocao: false,
  },
  {
    id: 4,
    nome: "Relógio Inteligente",
    preco: 499.9,
    categorias: ["acessórios", "tecnologia"],
    descricao: "Relógio inteligente com diversas funcionalidades",
    avaliacao: 4.8,
    imagem:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    disponivel: false,
    promocao: false,
  },
  {
    id: 5,
    nome: "Mochila Resistente",
    preco: 149.9,
    categorias: ["acessórios", "bolsas"],
    descricao: "Mochila resistente para o dia a dia",
    avaliacao: 4.3,
    imagem:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    disponivel: true,
    promocao: true,
    precoPromocional: 119.9,
  },
  {
    id: 6,
    nome: "Óculos de Sol",
    preco: 199.9,
    categorias: ["acessórios", "moda"],
    descricao: "Óculos de sol com proteção UV",
    avaliacao: 4.1,
    imagem:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    disponivel: true,
    promocao: false,
  },
];

// Adicionar tipos para os produtos e carrinho
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

interface ItemCarrinho extends Produto {
  quantidade: number;
}

// Componentes de filtro e busca
const Filtro: React.FC<{
  categorias: string[];
  categoriaSelecionada: string | null;
  onCategoriaChange: (categoria: string | null) => void;
}> = ({ categorias, categoriaSelecionada, onCategoriaChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filtros</h2>
        <SlidersHorizontal className="w-6 h-6 text-shop-primary" />
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onCategoriaChange(null)}
          className={`block w-full text-left px-3 py-2 rounded-md transition-all ${
            categoriaSelecionada === null
              ? "bg-shop-primary text-white font-medium"
              : "hover:bg-gray-100"
          }`}
        >
          Todas as categorias
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => onCategoriaChange(categoria)}
            className={`block w-full text-left px-3 py-2 rounded-md transition-all ${
              categoriaSelecionada === categoria
                ? "bg-shop-primary text-white font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

const Busca: React.FC<{
  onSearch: (termo: string) => void;
}> = ({ onSearch }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.elements.namedItem("busca") as HTMLInputElement;
          onSearch(input.value);
        }}
        className="relative"
      >
        <input
          type="text"
          name="busca"
          placeholder="Buscar produtos..."
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </form>
    </div>
  );
};

// Componente de CarrinhoRapido
const CarrinhoRapido: React.FC<{
  carrinho: ItemCarrinho[];
  visivel: boolean;
  onClose: () => void;
  onRemover: (id: number) => void;
}> = ({ carrinho, visivel, onClose, onRemover }) => {
  // Calcular total do carrinho
  const total = carrinho.reduce(
    (acc, item) => acc + item.quantidade * (item.promocao ? (item.precoPromocional || item.preco) : item.preco),
    0
  );

  if (!visivel) return null;

  return (
    <div className="fixed right-4 top-24 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-shop-primary" />
          <h3 className="font-medium">Seu Carrinho</h3>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {carrinho.length} {carrinho.length === 1 ? "item" : "itens"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {carrinho.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {carrinho.map((item) => (
              <div key={item.id} className="p-4 flex gap-3">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{item.nome}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-shop-primary font-medium">
                        R${" "}
                        {(
                          (item.promocao
                            ? item.precoPromocional || item.preco
                            : item.preco) * item.quantidade
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.quantidade} x R${" "}
                        {(
                          item.promocao
                            ? item.precoPromocional || item.preco
                            : item.preco
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemover(item.id)}
                      className="p-1 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          </div>
        )}
      </div>

      {carrinho.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-bold text-lg">
              R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <button className="w-full py-2 bg-shop-primary text-white rounded-md font-medium hover:bg-shop-primary/90 transition-colors">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

// Componente principal da loja
export default function Loja() {
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [contagemCarrinho, setContagemCarrinho] = useState(0);

  // Extrair categorias únicas
  const categorias = [...new Set(PRODUTOS.flatMap((p) => p.categorias))];

  // Filtrar produtos
  useEffect(() => {
    let produtosFiltrados = [...PRODUTOS];

    // Filtrar por categoria
    if (categoriaSelecionada) {
      produtosFiltrados = produtosFiltrados.filter((p) =>
        p.categorias.includes(categoriaSelecionada)
      );
    }

    // Filtrar por termo de busca
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      produtosFiltrados = produtosFiltrados.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo) ||
          p.categorias.some((c) => c.toLowerCase().includes(termo))
      );
    }

    setProdutos(produtosFiltrados);
  }, [categoriaSelecionada, termoBusca]);

  // Atualizar contagem do carrinho
  useEffect(() => {
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    setContagemCarrinho(total);
  }, [carrinho]);

  // Adicionar ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });

    // Feedback visual
    setCarrinhoVisivel(true);
  };

  // Remover do carrinho
  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === id);

      if (item && item.quantidade > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      } else {
        return prev.filter((i) => i.id !== id);
      }
    });
  };

  // Toggle favorito
  const toggleFavorito = (id: number) => {
    console.log(`Toggle favorito para produto ${id}`);
  };

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      {/* Sobreposição escura quando o carrinho está visível */}
      {carrinhoVisivel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCarrinhoVisivel(false)}
        />
      )}

      {/* Carrinho rápido */}
      <CarrinhoRapido
        carrinho={carrinho}
        visivel={carrinhoVisivel}
        onClose={() => setCarrinhoVisivel(false)}
        onRemover={removerDoCarrinho}
      />

      {/* Cabeçalho da loja */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-fluid-3xl font-bold text-balance mb-2">
            Loja Online
          </h1>
          <p className="text-muted-foreground">
            Encontre os melhores produtos com os melhores preços.
          </p>
        </div>

        {/* Barra superior */}
        <div className="flex items-center gap-4">
          <span className="text-gray-500">
            Mostrando {produtos.length} produtos
          </span>
          <button
            onClick={() => setCarrinhoVisivel(true)}
            className="flex items-center gap-2 p-2 rounded-md bg-shop-primary text-white relative"
          >
            {" "}
            <ShoppingBag className="w-5 h-5" />
            <span>Carrinho</span>
            {contagemCarrinho > 0 && (
              <span className="absolute -top-2 -right-2 bg-shop-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
                {contagemCarrinho}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Busca */}
      <Busca onSearch={setTermoBusca} />

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Coluna de filtros */}
        <div className="lg:col-span-1">
          <Filtro
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaChange={setCategoriaSelecionada}
          />
        </div>

        {/* Grid de produtos */}
        <div className="lg:col-span-3">
          {produtos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-card p-8 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">
                Nenhum produto encontrado
              </h2>
              <p className="text-gray-500 mb-4">
                Tente ajustar seus filtros ou buscar por outro termo.
              </p>
              <button
                onClick={() => {
                  setCategoriaSelecionada(null);
                  setTermoBusca("");
                }}
                className="bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  onAddToCart={adicionarAoCarrinho}
                  onToggleFavorite={toggleFavorito}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
