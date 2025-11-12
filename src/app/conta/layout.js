"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import Header from '@/components/Header/Header'; // 1. Importar o Header
import Footer from '@/components/Footer/Footer'; // 2. Importar o Footer
import styles from './layout.module.css';

const navLinks = [
  { href: '/conta', label: 'Minha Conta', icon: User },
  { href: '/conta/pedidos', label: 'Meus Pedidos', icon: ShoppingBag },
];

export default function AccountLayout({ children }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Efeito para proteger a rota
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  // Loader de tela inteira enquanto verifica a autenticação
  if (isLoading || !user) {
    return (
      <div className={styles.fullPageLoader}>
        <Header />
        <div className={styles.loadingScreen}>Carregando sua conta...</div>
        <Footer />
      </div>
    );
  }

  // 3. Estrutura principal com Header, conteúdo e Footer
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.layoutGrid}>
            <aside className={styles.sidebar}>
              <div className={styles.welcomeMessage}>
                <p>Olá,</p>
                <h3>{user.nome}</h3>
              </div>
              <nav className={styles.nav}>
                {navLinks.map(link => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                      <link.icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <button onClick={logout} className={`${styles.navLink} ${styles.logoutButton}`}>
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </nav>
            </aside>
            <section className={styles.content}>
              {children}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}