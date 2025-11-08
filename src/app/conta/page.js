import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Minha Conta | ReVeste-se",
  description: "Gerencie sua conta no ReVeste-se.",
};

export default function Conta() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.contaSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>Minha Conta</h1>
            
            <div className={styles.accountGrid}>
              <div className={styles.accountCard}>
                <h2 className={styles.cardTitle}>Meus Pedidos</h2>
                <p className={styles.cardDescription}>Acompanhe seus pedidos e histórico de compras</p>
                <Link href="/conta/pedidos" className={styles.cardButton}>
                  Ver Pedidos
                </Link>
              </div>
              
              <div className={styles.accountCard}>
                <h2 className={styles.cardTitle}>Meus Dados</h2>
                <p className={styles.cardDescription}>Gerencie suas informações pessoais</p>
                <Link href="/conta/dados" className={styles.cardButton}>
                  Editar Dados
                </Link>
              </div>
              
              <div className={styles.accountCard}>
                <h2 className={styles.cardTitle}>Endereços</h2>
                <p className={styles.cardDescription}>Gerencie seus endereços de entrega</p>
                <Link href="/conta/enderecos" className={styles.cardButton}>
                  Ver Endereços
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
