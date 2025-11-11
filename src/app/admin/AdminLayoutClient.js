"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayoutClient({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o carregamento terminou e não há usuário ou o usuário não é admin...
    if (!isLoading && (!user || user.tipo !== 'admin')) {
      // ...redireciona para a página de login.
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  // Enquanto carrega ou se o usuário não é admin, mostra um loader ou nada
  if (isLoading || !user || user.tipo !== 'admin') {
    return <div className={styles.loadingScreen}>Carregando painel...</div>;
  }

  // Se o usuário é admin, renderiza o layout e o conteúdo
  return (
    <>
      <Sidebar />
      <main className={styles.mainContent}>
        {/* Aqui poderia ir um Header de admin se necessário */}
        {children}
      </main>
    </>
  );
}