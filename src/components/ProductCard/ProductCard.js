"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./ProductCard.module.css";

export default function ProductCard({ produto }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/produto/${produto.id}`} className={styles.imageLink}>
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
        <p className={styles.category}>{produto.categoria}</p>
        <h3 className={styles.name}>{produto.nome}</h3>
        <p className={styles.price}>
          R$ {produto.preco.toFixed(2)}
        </p>
      </div>
      
      <div className={styles.footer}>
        <Link href={`/produto/${produto.id}`} className={styles.button}>
          Ver Detalhes
        </Link>
      </div>
    </motion.div>
  );
}
