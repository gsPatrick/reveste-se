"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        <Image
          src="/hero-banner.jpg"
          alt="ReVeste-se - Moda Circular"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
      </div>
      
      <div className={styles.heroContent}>
        <div className="container">
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>
              Moda Circular com Propósito
            </h1>
            <p className={styles.heroDescription}>
              Peças vintage de qualidade que contam histórias. Vista-se com estilo e consciência.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/loja" className={styles.primaryButton}>
                Explorar a Loja
                <ArrowRight className={styles.buttonIcon} />
              </Link>
              <Link href="/nossa-historia" className={styles.secondaryButton}>
                Nossa História
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
