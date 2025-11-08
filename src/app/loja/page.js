import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

const produtos = [
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
  },
  {
    id: 4,
    nome: "Blazer Vintage Borgonha",
    preco: 189.90,
    imagem: "/produto-1.jpg",
    categoria: "Casacos"
  },
  {
    id: 5,
    nome: "Blusa Clássica Creme",
    preco: 89.90,
    imagem: "/produto-2.jpg",
    categoria: "Blusas"
  },
  {
    id: 6,
    nome: "Calça Alfaiataria Preta",
    preco: 129.90,
    imagem: "/produto-3.jpg",
    categoria: "Calças"
  }
];

export const metadata = {
  title: "Loja | ReVeste-se",
  description: "Explore nossa coleção de peças vintage selecionadas com cuidado.",
};

export default function Loja() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>Nossa Loja</h1>
            <p className={styles.pageDescription}>
              Explore nossa coleção de peças vintage selecionadas com cuidado e amor
            </p>
          </div>
        </section>

        <section className={styles.produtosSection}>
          <div className="container">
            <div className={styles.produtosGrid}>
              {produtos.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
