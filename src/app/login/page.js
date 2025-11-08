import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Login | ReVeste-se",
  description: "Faça login na sua conta ReVeste-se.",
};

export default function Login() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className="container">
            <div className={styles.loginContainer}>
              <h1 className={styles.pageTitle}>Entrar</h1>
              
              <form className={styles.loginForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={styles.input}
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>Senha</label>
                  <input 
                    type="password" 
                    id="password" 
                    className={styles.input}
                    placeholder="••••••••"
                  />
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Entrar
                </button>
              </form>
              
              <p className={styles.signupText}>
                Não tem uma conta? <Link href="/conta" className={styles.signupLink}>Cadastre-se</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
