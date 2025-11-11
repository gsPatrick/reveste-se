import ProdutoClient from './ProdutoClient';

// Mock de dados do produto - Esta função agora vive no servidor
const getProduto = (id) => {
  const produtos = {
    "1": {
      id: 1,
      nome: "Blazer Vintage Borgonha",
      preco: 189.90,
      imagem: "/produto-1.jpg",
      categoria: "Casacos",
      descricao: "Blazer vintage em tom borgonha, perfeito para compor looks elegantes e atemporais. Tecido de alta qualidade com excelente caimento.",
      tamanhos: ["P", "M", "G"],
      condicao: "Excelente",
      material: "Lã e Poliéster"
    },
    "2": {
      id: 2,
      nome: "Blusa Clássica Creme",
      preco: 89.90,
      imagem: "/produto-2.jpg",
      categoria: "Blusas",
      descricao: "Blusa clássica em tom creme, versátil e confortável. Ideal para o dia a dia ou ocasiões especiais.",
      tamanhos: ["P", "M", "G"],
      condicao: "Excelente",
      material: "Algodão"
    },
    "3": {
      id: 3,
      nome: "Calça Alfaiataria Preta",
      preco: 129.90,
      imagem: "/produto-3.jpg",
      categoria: "Calças",
      descricao: "Calça de alfaiataria preta, corte reto e elegante. Perfeita para looks formais e profissionais.",
      tamanhos: ["36", "38", "40", "42"],
      condicao: "Excelente",
      material: "Poliéster e Elastano"
    }
  };
  
  return produtos[id] || produtos["1"];
};

// A função generateMetadata continua aqui, pois é executada no servidor
export async function generateMetadata({ params }) {
  const produto = getProduto(params.id);
  
  return {
    title: `${produto.nome} | ReVeste-se`,
    description: produto.descricao,
  };
}

// Este é o Componente de Servidor da página
export default function ProdutoPage({ params }) {
  // 1. Resolvemos os dados no servidor
  const produto = getProduto(params.id);
  
  // 2. Passamos os dados resolvidos para o Componente de Cliente
  return <ProdutoClient produto={produto} />;
}