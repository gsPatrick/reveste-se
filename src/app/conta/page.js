"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register({ nome, email, password });
      router.push('/'); // Redireciona para a home após o cadastro na página dedicada
    } catch (err) {
      setError(err.message || 'Falha no cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.registerSection}>
          <div className="container">
            <div className={styles.registerContainer}>
              <h1 className={styles.pageTitle}>Criar Conta</h1>
              <form onSubmit={handleSubmit} className={styles.registerForm}>
                {error && <p className={styles.errorText}>{error}</p>}
                <div className={styles.formGroup}>
                  <label>Nome Completo</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Senha</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading && <Loader2 className={styles.spinner} />} Criar Conta
                </button>
              </form>
              <p className={styles.loginText}>
                Já tem uma conta? <Link href="/login" className={styles.loginLink}>Faça login</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}