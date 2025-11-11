"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { cartItems } = useCart();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
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
            <Link href="/conta" className={styles.accountButton}>
              Minha Conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}