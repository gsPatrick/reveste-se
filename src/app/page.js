import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Leaf, Recycle, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

const produtosDestaque = [
  {
    id: 1,
    nome: "Blazer Vintage Borgonha",
    preco: 189.90,
    imagem: "/produto-1.jpg",
    categoria: "Casacos"
  },
  {
    id: 2,
    nome: "Blusa Clássica Creme",
    preco: 89.90,
    imagem: "/produto-2.jpg",
    categoria: "Blusas"
  },
  {
    id: 3,
    nome: "Calça Alfaiataria Preta",
    preco: 129.90,
    imagem: "/produto-3.jpg",
    categoria: "Calças"
  }
];

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <Hero />

        {/* Valores Section */}
        <section className={styles.valoresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              Por que escolher o ReVeste-se?
            </h2>
            
            <div className={styles.valoresGrid}>
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}>
                  <Leaf className={styles.icon} />
                </div>
                <h3 className={styles.valorTitle}>Sustentável</h3>
                <p className={styles.valorDescription}>
                  Reduzimos o impacto ambiental dando nova vida a peças de qualidade excepcional
                </p>
              </div>
              
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}>
                  <Recycle className={styles.icon} />
                </div>
                <h3 className={styles.valorTitle}>Circular</h3>
                <p className={styles.valorDescription}>
                  Promovemos a economia circular e o consumo consciente através da moda
                </p>
              </div>
              
              <div className={styles.valorCard}>
                <div className={styles.valorIcon}>
                  <Heart className={styles.icon} />
                </div>
                <h3 className={styles.valorTitle}>Com Propósito</h3>
                <p className={styles.valorDescription}>
                  Cada peça é cuidadosamente selecionada, higienizada e verificada
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
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
              {produtosDestaque.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
