"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ produto }) {
  const { openModal } = useModal();

  // --- MUDANÇA CRÍTICA AQUI ---
  // 1. Verificação de segurança: Se o produto não tiver um ID ou slug, não renderizamos o card.
  // Isso impede a criação de links quebrados para "/produto/undefined".
  const productIdentifier = produto.slug || produto.id;
  if (!productIdentifier) {
    // Este console.log aparecerá no terminal do seu servidor Next.js,
    // ajudando a identificar qual produto está com dados inválidos.
    console.warn("ProductCard recebeu um produto sem 'id' ou 'slug':", produto);
    return null; // Não renderiza nada para este produto.
  }

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(produto);
  };

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* 2. Usamos a variável segura que já verificamos. */}
      <Link href={`/produto/${productIdentifier}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className={styles.image}
          />
        </div>
      </Link>
      
      <div className={styles.content}>
        <p className={styles.category}>{produto.categoria?.nome || 'Sem Categoria'}</p>
        <h3 className={styles.name}>{produto.nome}</h3>
        <p className={styles.price}>
          R$ {(parseFloat(produto.preco) || 0).toFixed(2)}
        </p>
      </div>
      
      <div className={styles.footer}>
        <button onClick={handleOpenModal} className={styles.button}>
          <ShoppingCart size={16} />
          Adicionar ao Carrinho
        </button>
      </div>
    </motion.div>
  );
}