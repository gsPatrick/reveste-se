import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import api from "@/services/api.service";
import styles from "./page.module.css";

export const metadata = {
  title: "Loja | ReVeste-se",
  description: "Explore nossa coleção de peças vintage selecionadas com cuidado.",
};

export default async function Loja() {
  let produtos = [];

  try {
    // Agora, esta chamada retornará diretamente o array de produtos
    produtos = await api.getProducts();
  } catch (error) {
    console.error("Falha ao carregar produtos da loja:", error.message);
    // Em caso de erro, 'produtos' permanecerá um array vazio, evitando o erro .map()
  }

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
              {/* Agora 'produtos' é um array e o .map() funcionará */}
              {produtos.map((produto) => (
                <ProductCard 
                  key={produto.id} 
                  produto={{
                    ...produto,
                    // Garante que a prop 'imagem' seja passada para o ProductCard
                    imagem: produto.imagens[0] || '/placeholder.jpg' 
                  }} 
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}