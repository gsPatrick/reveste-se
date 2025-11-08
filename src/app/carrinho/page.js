import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Carrinho | ReVeste-se",
  description: "Seu carrinho de compras no ReVeste-se.",
};

export default function Carrinho() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.carrinhoSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>Meu Carrinho</h1>
            
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>Seu carrinho está vazio</p>
              <Link href="/loja" className={styles.shopButton}>
                Explorar Produtos
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
