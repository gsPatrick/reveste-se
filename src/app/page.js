import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Leaf, Recycle, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import api from "@/services/api.service"; // 1. Importar o serviço de API
import styles from "./page.module.css";

// 2. Transformar o componente em uma função assíncrona
export default async function Home() {
  let produtosDestaque = [];

  // 3. Chamar a API dentro de um bloco try...catch para tratamento de erros
  try {
    produtosDestaque = await api.getFeaturedProducts(3);
  } catch (error) {
    console.error("Falha ao carregar produtos em destaque:", error.message);
    // Em caso de erro, a página será renderizada com a lista de produtos vazia.
  }
  
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <Hero />

        <section className={styles.valoresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              Por que escolher o ReVeste-se?
            </h2>
            <div className={styles.valoresGrid}>
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}><Leaf className={styles.icon} /></div>
                <h3 className={styles.valorTitle}>Sustentável</h3>
                <p className={styles.valorDescription}>Reduzimos o impacto ambiental dando nova vida a peças de qualidade excepcional</p>
              </div>
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}><Recycle className={styles.icon} /></div>
                <h3 className={styles.valorTitle}>Circular</h3>
                <p className={styles.valorDescription}>Promovemos a economia circular e o consumo consciente através da moda</p>
              </div>
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}><Heart className={styles.icon} /></div>
                <h3 className={styles.valorTitle}>Com Propósito</h3>
                <p className={styles.valorDescription}>Cada peça é cuidadosamente selecionada, higienizada e verificada</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.produtosSection}>
          <div className="container">
            <div className={styles.produtosHeader}>
              <h2 className={styles.sectionTitle}>
                Produtos em Destaque
              </h2>
              <Link href="/loja" className={styles.verTodosButton}>
                Ver Todos
                <ArrowRight className={styles.buttonIcon} />
              </Link>
            </div>
            
            <div className={styles.produtosGrid}>
              {/* 4. Mapear os produtos da API */}
              {produtosDestaque.map((produto) => (
                // O ProductCard espera 'imagem', mas a API retorna 'imagens' (um array).
                // Passamos um objeto modificado para manter a compatibilidade.
                <ProductCard key={produto.id} produto={{
                  ...produto,
                  imagem: produto.imagens[0] || '/placeholder.jpg' // Usa a primeira imagem ou um placeholder
                }} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Faça Parte da Revolução da Moda Circular
              </h2>
              <p className={styles.ctaDescription}>
                Cada compra é um passo em direção a um futuro mais sustentável e consciente
              </p>
              <Link href="/nossa-historia" className={styles.ctaButton}>
                Conheça Nossa História
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}