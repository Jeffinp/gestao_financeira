import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBagIcon, AdjustmentsHorizontalIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Dados simulados de produtos
const PRODUTOS = [
  {
    id: 1,
    nome: 'Camisa Premium',
    preco: 129.90,
    categorias: ['roupas', 'camisas'],
    descricao: 'Camisa de alta qualidade com tecido 100% algodão',
    avaliacao: 4.5,
    imagem: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
    disponivel: true,
    promocao: false,
  },
  {
    id: 2,
    nome: 'Calça Jeans Moderna',
    preco: 199.90,
    categorias: ['roupas', 'calças'],
    descricao: 'Calça jeans confortável e durável',
    avaliacao: 4.2,
    imagem: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    disponivel: true,
    promocao: true,
    precoPromocional: 159.90,
  },
  {
    id: 3,
    nome: 'Tênis Esportivo',
    preco: 299.90,
    categorias: ['calçados', 'esportes'],
    descricao: 'Tênis confortável para práticas esportivas',
    avaliacao: 4.7,
    imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    disponivel: true,
    promocao: false,
  },
  {
    id: 4,
    nome: 'Relógio Inteligente',
    preco: 499.90,
    categorias: ['acessórios', 'tecnologia'],
    descricao: 'Relógio inteligente com diversas funcionalidades',
    avaliacao: 4.8,
    imagem: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    disponivel: false,
    promocao: false,
  },
  {
    id: 5,
    nome: 'Mochila Resistente',
    preco: 149.90,
    categorias: ['acessórios', 'bolsas'],
    descricao: 'Mochila resistente para o dia a dia',
    avaliacao: 4.3,
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    disponivel: true,
    promocao: true,
    precoPromocional: 119.90,
  },
  {
    id: 6,
    nome: 'Óculos de Sol',
    preco: 199.90,
    categorias: ['acessórios', 'moda'],
    descricao: 'Óculos de sol com proteção UV',
    avaliacao: 4.1,
    imagem: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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

// Componente de Produto
const ProdutoCard: React.FC<{
  produto: Produto;
  onAddToCart: (produto: Produto) => void;
  onToggleFavorite: (id: number) => void;
}> = ({ produto, onAddToCart, onToggleFavorite }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(produto.id);
  };

  return (<motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-white rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:shadow-lg group"
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
        <div className="absolute top-2 right-2 z-10">            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[hsl(var(--shop-error))] bg-opacity-10 text-[hsl(var(--shop-error))]">
          Indisponível
        </span>
        </div>
      )}

      {/* Imagem com efeito de zoom */}
      <div className="overflow-hidden h-64 bg-gray-100">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Botão de favorito */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 shadow-sm hover:bg-opacity-100 transition-all"
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? (
          <HeartIconSolid className="w-5 h-5 text-shop-accent" />
        ) : (
          <HeartIcon className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>

    {/* Informações do produto */}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-pretty">{produto.nome}</h3>

      {/* Preço com formatação condicional para promoção */}
      <div className="mt-1 flex items-baseline gap-2">
        {produto.promocao ? (
          <>
            <span className="text-shop-accent font-bold text-fluid-lg">
              {produto.precoPromocional?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="text-gray-400 line-through text-sm">
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </>
        ) : (
          <span className="text-shop-primary font-bold text-fluid-lg">
            {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        )}
      </div>

      {/* Avaliação */}
      <div className="mt-2 flex items-center">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(produto.avaliacao)
                ? 'text-yellow-400'
                : i < produto.avaliacao
                  ? 'text-yellow-400'
                  : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-1 text-gray-500 text-sm">({produto.avaliacao})</span>
      </div>

      {/* Botão de adicionar ao carrinho */}
      <div className="mt-4">
        <button
          onClick={() => onAddToCart(produto)}
          disabled={!produto.disponivel}
          className={`w-full flex items-center justify-center gap-2 ${produto.disponivel
            ? 'bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-md'}`}
        >
          <ShoppingBagIcon className="w-5 h-5" />
          <span>{produto.disponivel ? 'Adicionar ao carrinho' : 'Indisponível'}</span>
        </button>
      </div>
    </div>
  </motion.div>
  );
};

// Componente de Filtro
const Filtro: React.FC<{
  categorias: string[];
  categoriaSelecionada: string | null;
  onCategoriaChange: (categoria: string | null) => void;
}> = ({ categorias, categoriaSelecionada, onCategoriaChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filtros</h2>
        <AdjustmentsHorizontalIcon className="w-6 h-6 text-shop-primary" />
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Categorias</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoriaChange(null)}
            className={`w-full text-left py-2 px-3 rounded-md transition-colors ${categoriaSelecionada === null
              ? 'bg-shop-primary text-white'
              : 'hover:bg-gray-100'
              }`}
          >
            Todas
          </button>
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => onCategoriaChange(categoria)}
              className={`w-full text-left py-2 px-3 rounded-md transition-colors ${categoriaSelecionada === categoria
                ? 'bg-shop-primary text-white'
                : 'hover:bg-gray-100'
                }`}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Preço</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="range" className="w-full" min="0" max="500" step="10" />
          </div>
          <div className="flex items-center justify-between">
            <span>R$ 0</span>
            <span>R$ 500</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Disponibilidade</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-shop-primary" />
            <span>Em estoque</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-shop-primary" />
            <span>Promoção</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Componente de Busca
const Busca: React.FC<{
  onSearch: (termo: string) => void;
}> = ({ onSearch }) => {
  const [termo, setTermo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(termo);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:border-shop-primary focus:ring-2 focus:ring-shop-primary/20 outline-none transition-all"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
  const total = carrinho.reduce(
    (acc, item) => acc + ((item.promocao && item.precoPromocional ? item.precoPromocional : item.preco) * item.quantidade),
    0
  );

  return (
    <motion.div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col ${visivel ? 'block' : 'hidden'}`}
      initial={{ x: "100%" }}
      animate={{ x: visivel ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBagIcon className="w-6 h-6" />
          Seu Carrinho
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {carrinho.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500">Seu carrinho está vazio</p>
            <button
              onClick={onClose}
              className="mt-4 bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {carrinho.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-2 border-b">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.nome}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-shop-primary font-medium">
                        {(item.promocao && item.precoPromocional ? item.precoPromocional : item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        x {item.quantidade}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemover(item.id)}
                      className="text-gray-400 hover:text-shop-error transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {carrinho.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold text-lg">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <button className="w-full bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 mb-2">
            Finalizar Compra
          </button>
          <button
            onClick={onClose}
            className="w-full border border-[hsl(var(--shop-primary))] text-[hsl(var(--shop-primary))] font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-[hsl(var(--shop-primary))] hover:text-white hover:scale-105 active:scale-95"
          >
            Continuar Comprando
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Componente principal da loja
export default function Loja() {
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [contagemCarrinho, setContagemCarrinho] = useState(0);

  // Extrair categorias únicas
  const categorias = [...new Set(PRODUTOS.flatMap(p => p.categorias))];

  // Filtrar produtos
  useEffect(() => {
    let produtosFiltrados = [...PRODUTOS];

    // Filtrar por categoria
    if (categoriaSelecionada) {
      produtosFiltrados = produtosFiltrados.filter(p => p.categorias.includes(categoriaSelecionada));
    }

    // Filtrar por termo de busca
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      produtosFiltrados = produtosFiltrados.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.categorias.some(c => c.toLowerCase().includes(termo))
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
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);

      if (existe) {
        return prev.map(item =>
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
    setCarrinho(prev => {
      const item = prev.find(i => i.id === id);

      if (item && item.quantidade > 1) {
        return prev.map(i =>
          i.id === id
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        );
      } else {
        return prev.filter(i => i.id !== id);
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
          <h1 className="text-fluid-3xl font-bold text-balance mb-2">Loja Online</h1>
          <p className="text-muted-foreground">Encontre os melhores produtos com os melhores preços.</p>
        </div>

        {/* Barra superior */}
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Mostrando {produtos.length} produtos</span>
          <button
            onClick={() => setCarrinhoVisivel(true)}
            className="flex items-center gap-2 p-2 rounded-md bg-shop-primary text-white relative"
          >
            <ShoppingBagIcon className="w-5 h-5" />
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
              <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Nenhum produto encontrado</h2>
              <p className="text-gray-500 mb-4">
                Tente ajustar seus filtros ou buscar por outro termo.
              </p>
              <button
                onClick={() => {
                  setCategoriaSelecionada(null);
                  setTermoBusca('');
                }}
                className="bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <ProdutoCard
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