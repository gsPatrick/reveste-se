"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password);
      
      // Redirecionamento baseado no tipo de usuário
      if (user.tipo === 'admin') {
        router.push('/admin');
      } else {
        router.push('/conta');
      }
    } catch (err) {
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className="container">
            <div className={styles.loginContainer}>
              <h1 className={styles.pageTitle}>Entrar</h1>
              
              <form onSubmit={handleSubmit} className={styles.loginForm}>
                {error && <p className={styles.errorText}>{error}</p>}
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={styles.input}
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>Senha</label>
                  <input 
                    type="password" 
                    id="password" 
                    className={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
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