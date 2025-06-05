import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowLeft,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  Star
} from 'lucide-react';

// Simulação de dados do produto
const PRODUTO = {
  id: 2,
  nome: 'Calça Jeans Moderna',
  preco: 199.90,
  categorias: ['roupas', 'calças'],
  descricao: 'Calça jeans moderna com design diferenciado, tecido de alta qualidade e confortável para uso diário. Perfeita para diversas ocasiões, desde eventos casuais até encontros mais formais.',
  avaliacao: 4.2,
  totalAvaliacoes: 124,
  imagens: [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1604176424472-9d8c4699a3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  ],
  disponivel: true,
  promocao: true,
  precoPromocional: 159.90,
  cores: [
    { id: 1, nome: 'Azul Escuro', codigo: '#172554' },
    { id: 2, nome: 'Azul Claro', codigo: '#60a5fa' },
    { id: 3, nome: 'Preto', codigo: '#000000' },
  ],
  tamanhos: [
    { id: 1, tamanho: 'P', disponivel: true },
    { id: 2, tamanho: 'M', disponivel: true },
    { id: 3, tamanho: 'G', disponivel: true },
    { id: 4, tamanho: 'GG', disponivel: false },
  ],
  estoque: 15,
  prazoEntrega: '3-5 dias úteis',
  detalhes: [
    'Tecido: 98% Algodão, 2% Elastano',
    'Lavagem: Lavar à máquina em água fria',
    'Modelo: Slim fit',
    'Altura do modelo: 1,85m',
    'Tamanho do modelo: M',
  ],
  avaliacoes: [
    { id: 1, nome: 'João Silva', data: '12/08/2023', nota: 5, comentario: 'Excelente produto, qualidade surpreendente.' },
    { id: 2, nome: 'Maria Santos', data: '05/07/2023', nota: 4, comentario: 'Muito boa, só achei um pouco apertada no início.' },
    { id: 3, nome: 'Pedro Oliveira', data: '22/06/2023', nota: 3, comentario: 'Qualidade boa, mas a cor não é exatamente como na foto.' },
  ],
};

// Adicionar tipos explícitos
interface Tamanho {
  id: number;
  tamanho: string;
  disponivel: boolean;
}

interface ImagemZoomProps {
  src: string;
}

// Componente de Zoom refatorado com Tailwind CSS
const ImagemZoom: React.FC<ImagemZoomProps> = ({ src }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    // Calcular a posição relativa do cursor (0-100%)
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

    setPosition({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden bg-gray-100 rounded-lg h-[500px] w-full cursor-zoom-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Imagem principal */}
      <img
        src={src}
        alt="Produto"
        className="w-full h-full object-cover"
      />

      {/* Lente de zoom e área de zoom */}
      {isHovering && (
        <>
          {/* Overlay com lente de zoom */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none">
            <div
              className="absolute w-20 h-20 border-2 border-white rounded-md transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
            />
          </div>

          {/* Área de zoom */}
          <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-lg w-48 h-48 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundSize: '400%',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

interface ContadorProps {
  quantidade: number;
  onIncrement: () => void;
  onDecrement: () => void;
  max: number;
}

// Componente de Contador
const Contador: React.FC<ContadorProps> = ({ quantidade, onIncrement, onDecrement, max }) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
      <button
        onClick={onDecrement}
        disabled={quantidade <= 1}
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuir quantidade"
      >
        <span className="text-lg font-medium">-</span>
      </button>
      <div className="w-10 py-1 text-center font-medium">{quantidade}</div>
      <button
        onClick={onIncrement}
        disabled={quantidade >= max}
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar quantidade"
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
};

// Componente principal
export default function ProdutoDetalhe() {
  const [produto] = useState(PRODUTO); // Em uma app real, você buscaria o produto pelo ID
  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const [corSelecionada, setCorSelecionada] = useState(produto.cores[0]);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [isFavorito, setIsFavorito] = useState(false);
  const [mostrarMais, setMostrarMais] = useState(false);

  const incrementarQuantidade = () => {
    if (quantidade < produto.estoque) {
      setQuantidade(quantidade + 1);
    }
  };

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const toggleFavorito = () => {
    setIsFavorito(!isFavorito);
  };

  const adicionarAoCarrinho = () => {
    if (!tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    console.log('Adicionado ao carrinho:', {
      produto: produto.id,
      nome: produto.nome,
      cor: corSelecionada,
      tamanho: tamanhoSelecionado,
      quantidade,
      preco: produto.promocao ? produto.precoPromocional : produto.preco
    });

    // Aqui você enviaria para seu gerenciador de estado
  };

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-[hsl(var(--shop-primary))] transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link to="/loja" className="text-gray-500 hover:text-[hsl(var(--shop-primary))] transition-colors">
              Loja
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link to="/loja/roupas" className="text-gray-500 hover:text-[hsl(var(--shop-primary))] transition-colors">
              Roupas
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <span className="text-gray-900 font-medium">Calça Jeans</span>
          </li>
        </ol>
      </nav>

      {/* Botão Voltar */}
      <Link
        to="/loja"
        className="inline-flex items-center mb-6 text-[hsl(var(--shop-primary))] hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Voltar para a loja</span>
      </Link>

      {/* Produto */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Galeria */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Imagem principal com zoom */}
          <ImagemZoom src={produto.imagens[imagemSelecionada]} />

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-4">
            {produto.imagens.map((imagem, index) => (
              <button
                key={index}
                onClick={() => setImagemSelecionada(index)}
                className={`overflow-hidden rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--shop-primary))] ${imagemSelecionada === index
                  ? 'ring-2 ring-[hsl(var(--shop-primary))] ring-opacity-100'
                  : 'border border-gray-200 hover:border-gray-300'
                  }`}
                aria-label={`Ver imagem ${index + 1}`}
                aria-current={imagemSelecionada === index ? 'true' : 'false'}
              >
                <div className="relative h-24 w-full">
                  <img
                    src={imagem}
                    alt={`Miniatura ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {imagemSelecionada === index && (
                    <div className="absolute inset-0 bg-[hsl(var(--shop-primary))] bg-opacity-10"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Informações do produto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Cabeçalho */}
          <div>
            <h1 className="text-fluid-3xl font-bold text-balance">
              {produto.nome}
            </h1>

            {/* Avaliação */}
            <div className="flex items-center mt-2">
              <div className="flex">                {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(produto.avaliacao) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              </div>
              <span className="ml-2 text-gray-600">
                {produto.avaliacao} ({produto.totalAvaliacoes} avaliações)
              </span>
            </div>

            {/* Preço */}
            <div className="mt-4">
              {produto.promocao ? (
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-[hsl(var(--shop-accent))] font-bold text-fluid-2xl">
                    {produto.precoPromocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[hsl(var(--shop-accent))] bg-opacity-10 text-[hsl(var(--shop-accent))]">
                    {Math.round((1 - produto.precoPromocional / produto.preco) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-[hsl(var(--shop-primary))] font-bold text-fluid-2xl">
                  {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <p className="text-gray-600 text-pretty">
              {mostrarMais
                ? produto.descricao
                : `${produto.descricao.substring(0, 100)}...`}
            </p>
            <button
              onClick={() => setMostrarMais(!mostrarMais)}
              className="mt-2 text-[hsl(var(--shop-primary))] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[hsl(var(--shop-primary))] focus:ring-offset-2 rounded"
              aria-expanded={mostrarMais}
            >
              {mostrarMais ? 'Mostrar menos' : 'Ler mais'}
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* Seletor de cores */}
          <div>
            <h3 className="font-medium mb-2">Cor: <span className="text-gray-600">{corSelecionada.nome}</span></h3>
            <div className="flex items-center gap-3">
              {produto.cores.map((cor) => (
                <button
                  key={cor.id}
                  onClick={() => setCorSelecionada(cor)}
                  className={`relative w-10 h-10 rounded-full transition-all duration-300 ${corSelecionada.id === cor.id
                    ? 'ring-2 ring-offset-2 ring-[hsl(var(--shop-primary))] scale-110'
                    : 'hover:scale-105'
                    }`}
                  aria-label={`Cor ${cor.nome}`}
                  title={cor.nome}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: cor.codigo }}
                  />
                  {corSelecionada.id === cor.id && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Seletor de tamanhos */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-medium">
                Tamanho: {tamanhoSelecionado ? <span className="text-gray-600">{tamanhoSelecionado.tamanho}</span> : ''}
              </h3>
              <button className="text-[hsl(var(--shop-primary))] text-sm hover:underline">
                Guia de tamanhos
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {produto.tamanhos.map((tamanho) => (
                <button
                  key={tamanho.id}
                  onClick={() => tamanho.disponivel && setTamanhoSelecionado(tamanho)}
                  disabled={!tamanho.disponivel}
                  className={`w-12 h-12 rounded-md flex items-center justify-center transition-all duration-300 ${tamanhoSelecionado?.id === tamanho.id
                    ? 'bg-[hsl(var(--shop-primary))] text-white font-medium border-0'
                    : tamanho.disponivel
                      ? 'border border-gray-200 hover:border-[hsl(var(--shop-primary))] hover:text-[hsl(var(--shop-primary))]'
                      : 'border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  aria-label={`Tamanho ${tamanho.tamanho}${!tamanho.disponivel ? ' (indisponível)' : ''}`}
                >
                  {tamanho.tamanho}
                </button>
              ))}
            </div>
          </div>

          {/* Estoque */}
          <div className="flex items-center text-sm">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${produto.estoque > 10
              ? 'bg-green-500'
              : produto.estoque > 0
                ? 'bg-yellow-500'
                : 'bg-red-500'
              }`}></span>
            <span>
              {produto.estoque > 10
                ? 'Em estoque'
                : produto.estoque > 0
                  ? `Apenas ${produto.estoque} em estoque`
                  : 'Fora de estoque'}
            </span>
          </div>

          {/* Quantidade e botões */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Quantidade:</h3>
              <Contador
                quantidade={quantidade}
                onIncrement={incrementarQuantidade}
                onDecrement={decrementarQuantidade}
                max={produto.estoque}
              />
              <span className="text-sm text-gray-500">
                {produto.estoque > 0 ? `(Máx: ${produto.estoque})` : '(Indisponível)'}
              </span>
            </div>

            <div className="flex items-center gap-4">                <motion.button
              onClick={adicionarAoCarrinho}
              disabled={!produto.disponivel}
              className="flex-1 flex items-center justify-center bg-[hsl(var(--shop-primary))] text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Adicionar ao carrinho
            </motion.button>

              <motion.button
                onClick={toggleFavorito}
                className="p-3 rounded-md border border-gray-200 hover:border-[hsl(var(--shop-accent))] transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
                aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >                {isFavorito ? (
                <Heart className="w-6 h-6 text-[hsl(var(--shop-accent))] fill-current" />
              ) : (
                <Heart className="w-6 h-6 text-gray-600" />
              )}
              </motion.button>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[hsl(var(--shop-primary))]" />
              <div>
                <h4 className="font-medium">Entrega</h4>
                <p className="text-sm text-gray-600">Prazo de {produto.prazoEntrega}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[hsl(var(--shop-primary))]" />
              <div>
                <h4 className="font-medium">Garantia</h4>
                <p className="text-sm text-gray-600">30 dias para troca ou devolução</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detalhes e avaliações */}
      <div className="mt-16">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button className="border-b-2 border-[hsl(var(--shop-primary))] text-[hsl(var(--shop-primary))] font-medium pb-4 px-1">
              Detalhes do produto
            </button>
            <button className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors duration-300">
              Avaliações ({produto.avaliacoes.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Especificações</h2>

            <div className="space-y-4">
              <p className="text-gray-600 text-pretty">
                {produto.descricao}
              </p>

              <ul className="space-y-2">
                {produto.detalhes.map((detalhe, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--shop-primary))] mt-2 mr-2"></span>
                    {detalhe}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Avaliações Recentes</h2>

            <div className="space-y-6">
              {produto.avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{avaliacao.nome}</h3>
                    <time className="text-sm text-gray-500" dateTime={avaliacao.data.split('/').reverse().join('-')}>
                      {avaliacao.data}
                    </time>
                  </div>
                  <div className="flex my-1">                    {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < avaliacao.nota
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        }`}
                      aria-hidden="true"
                    />
                  ))}
                    <span className="sr-only">{avaliacao.nota} de 5 estrelas</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{avaliacao.comentario}</p>
                </div>
              ))}

              <button className="w-full rounded-md border border-[hsl(var(--shop-primary))] py-2 text-[hsl(var(--shop-primary))] transition-colors duration-300 hover:bg-[hsl(var(--shop-primary))] hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--shop-primary))] focus:ring-offset-2">
                Ver todas as avaliações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Você também pode gostar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Aqui seriam exibidos os produtos relacionados */}
          {/* Mockup de produtos relacionados */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <div className="h-64 w-full animate-pulse bg-gray-200"></div>
              </div>
              <div className="p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 mb-2"></div>
                <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                </div>
              </div>

              {/* Overlay de carregamento simulado */}
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10">
                <div className="transform opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                  <div className="rounded-md px-4 py-2 bg-[hsl(var(--shop-primary))] text-white font-medium invisible group-hover:visible">
                    Ver produto
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}