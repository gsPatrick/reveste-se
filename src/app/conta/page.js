"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ShoppingBag, MapPin, Edit } from 'lucide-react';
import styles from './page.module.css';

export default function AccountPage() {
  const { user } = useAuth();

  // O layout já garante que 'user' existe aqui.
  if (!user) return null; 

  return (
    <div>
      <h1 className={styles.pageTitle}>Minha Conta</h1>
      <p className={styles.welcomeText}>Bem-vindo(a) de volta, {user.nome}! A partir daqui você pode gerenciar seus pedidos, endereços e informações pessoais.</p>

      <div className={styles.cardsGrid}>
        <Link href="/conta/pedidos" className={styles.card}>
          <ShoppingBag size={32} className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Meus Pedidos</h2>
          <p className={styles.cardDescription}>Acompanhe seus pedidos, veja o histórico e imprima detalhes.</p>
        </Link>

      </div>
    </div>
  );
}