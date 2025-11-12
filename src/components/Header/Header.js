"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // 1. Importar o hook de autenticação
import styles from "./Header.module.css";

export default function Header() {
  const { cartItems } = useCart();
  const { user } = useAuth(); // 2. Obter as informações do usuário logado

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          
          <Link href="/" className={styles.logo}>
            <Image
              src="/mini-logo.png"
              alt="Logo ReVeste-se com ícone de cabide"
              width={40}
              height={40}
              className={styles.logoIcon}
            />
            <h1>ReVeste-se</h1>
          </Link>
          
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Início
            </Link>
            <Link href="/loja" className={styles.navLink}>
              Loja
            </Link>
            <Link href="/nossa-historia" className={styles.navLink}>
              Nossa História
            </Link>
            <Link href="/faq" className={styles.navLink}>
              FAQ
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/carrinho" className={styles.cartButton}>
              <ShoppingCart className={styles.cartIcon} />
              {cartItems.length > 0 && (
                <span className={styles.cartCount}>{cartItems.length}</span>
              )}
              <span className="sr-only">Carrinho</span>
            </Link>

            {/* --- MUDANÇA PRINCIPAL AQUI --- */}
            {/* 3. Lógica condicional para o botão da conta */}
            {user && user.tipo === 'admin' ? (
              // Se o usuário está logado E é um admin, mostra "Painel Admin"
              <Link href="/admin" className={styles.accountButton}>
                Painel Admin
              </Link>
            ) : (
              // Para todos os outros casos (usuário cliente ou deslogado), mostra "Minha Conta"
              <Link href="/conta" className={styles.accountButton}>
                Minha Conta
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}