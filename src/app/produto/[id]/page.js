// /app/produto/[id]/page.js

import api from '@/services/api.service';
import ProdutoClient from './ProdutoClient';
import { notFound } from 'next/navigation';
import { use } from 'react'; // Importe o hook 'use' do React

/**
 * generateMetadata - Função para gerar metadados de SEO.
 * Ela é 'async', então podemos usar 'await' normalmente aqui.
 */
export async function generateMetadata({ params }) {
  try {
    const identifier = params.id;
    if (!identifier || identifier === 'undefined') {
      throw new Error("Identificador de produto inválido.");
    }

    const produto = await api.getProductByIdOrSlug(identifier);

    if (!produto) {
      throw new Error("Produto não encontrado na API.");
    }
    
    const imageUrl = (produto.imagens && produto.imagens.length > 0)
      ? produto.imagens[0]
      : '/placeholder-og.jpg';

    return {
      title: `${produto.nome} | ReVeste-se`,
      description: produto.descricao || `Compre ${produto.nome}. Peças vintage de qualidade que contam histórias.`,
      openGraph: {
        title: `${produto.nome} | ReVeste-se`,
        description: produto.descricao || "Peças vintage de qualidade que contam histórias.",
        images: [{ url: imageUrl, width: 1200, height: 630, alt: produto.nome }],
      },
    };
  } catch (error) {
    console.error("[generateMetadata] Erro:", error.message);
    return {
      title: "Produto não encontrado | ReVeste-se",
      description: "O produto que você está procurando não existe ou foi removido.",
    };
  }
}

/**
 * Componente de Servidor da página.
 * AVISO: Note que este componente NÃO É MAIS 'async'. O hook 'use' substitui o 'await'.
 */
export default function ProdutoPage({ params }) {
  // --- MUDANÇA CRÍTICA AQUI ---
  // O erro do Next.js diz que 'params' é uma Promise.
  // Usamos o hook 'use()' do React para "desembrulhar" a Promise de forma síncrona.
  // Isso é um padrão moderno para Componentes de Servidor.
  const resolvedParams = use(params);
  const identifier = resolvedParams.id;

  // O restante do seu fluxo de dados agora vai para um subcomponente assíncrono.
  // Isso mantém a organização e permite o tratamento de erros adequado.
  return <ProdutoLoader identifier={identifier} />;
}

/**
 * Subcomponente assíncrono para carregar os dados do produto.
 * Este é o novo local onde a chamada à API é feita.
 */
async function ProdutoLoader({ identifier }) {
  try {
    if (!identifier || identifier === 'undefined') {
      notFound();
    }
    
    const produto = await api.getProductByIdOrSlug(identifier);

    if (!produto) {
      notFound();
    }
    
    const produtoParaCliente = {
      ...produto,
      imagem: (produto.imagens && produto.imagens.length > 0) 
        ? produto.imagens[0] 
        : '/placeholder.jpg'
    };
    
    return <ProdutoClient produto={produtoParaCliente} />;

  } catch (error) {
    if (error.message.toLowerCase().includes('não encontrado')) {
      notFound();
    }
    
    console.error("[ProdutoLoader] Erro crítico:", error.message);
    return (
      <div style={{ textAlign: 'center', padding: '5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1>Erro ao Carregar o Produto</h1>
        <p>Não foi possível carregar as informações. Tente novamente mais tarde.</p>
      </div>
    );
  }
}