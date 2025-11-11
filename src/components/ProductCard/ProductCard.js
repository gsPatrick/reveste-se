"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ produto }) {
  const { openModal } = useModal();

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
      <Link href={`/produto/${produto.slug || produto.id}`} className={styles.imageLink}>
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
          {/* --- CORREÇÃO APLICADA AQUI --- */}
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