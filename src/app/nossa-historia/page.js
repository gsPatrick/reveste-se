import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Recycle, Heart } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "Nossa História | ReVeste-se",
  description: "Conheça a história do ReVeste-se e nosso compromisso com a moda circular e sustentável.",
};

export default function NossaHistoria() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/nossa-historia.jpg"
              alt="Nossa História"
              fill
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}></div>
          </div>
          <div className={styles.heroContent}>
            <div className="container">
              <h1 className={styles.heroTitle}>
                ReVeste-se: Moda Circular com Propósito
              </h1>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className={styles.historiaSection}>
          <div className="container">
            <div className={styles.historiaContent}>
              <h2 className={styles.sectionTitle}>
                Nossa História
              </h2>
              <div className={styles.textContent}>
                <p className={styles.paragraph}>
                  O ReVeste-se nasceu da paixão por moda atemporal e do compromisso com um futuro mais sustentável. 
                  Acreditamos que cada peça de roupa tem uma história para contar e merece uma segunda chance de brilhar.
                </p>
                <p className={styles.paragraph}>
                  Nossa jornada começou com a percepção de que a indústria da moda é uma das mais poluentes do mundo, 
                  gerando toneladas de resíduos têxteis anualmente. Decidimos fazer parte da solução, não do problema.
                </p>
                <blockquote className={styles.quote}>
                  "Nossa missão é dar uma nova vida a peças de qualidade, promovendo um consumo mais consciente, 
                  acessível e cheio de estilo."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Sustentabilidade */}
        <section className={styles.sustentabilidadeSection}>
          <div className="container">
            <div className={styles.sustentabilidadeContent}>
              <h2 className={styles.sectionTitle}>
                O Impacto da Sua Escolha
              </h2>
              <p className={styles.subtitle}>
                Por que a Moda Circular é o Futuro
              </p>

              <div className={styles.impactoGrid}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/sustentabilidade.jpg"
                    alt="Sustentabilidade"
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.textContainer}>
                  <p className={styles.paragraph}>
                    A moda circular é mais do que uma tendência — é uma necessidade. Ao escolher peças de segunda mão, 
                    você está contribuindo diretamente para a redução do lixo têxtil e diminuindo a demanda por produção 
                    em massa.
                  </p>
                  <p className={styles.paragraph}>
                    Cada compra no ReVeste-se é um voto por um planeta mais saudável e por um consumo mais consciente.
                  </p>
                </div>
              </div>

              <div className={styles.valoresGrid}>
                <div className={styles.valorCard}>
                  <div className={styles.valorIcon}>
                    <Leaf className={styles.icon} />
                  </div>
                  <h3 className={styles.valorTitle}>Sustentável</h3>
                  <p className={styles.valorDescription}>
                    Reduzimos o impacto ambiental dando nova vida a peças de qualidade
                  </p>
                </div>
                <div className={styles.valorCard}>
                  <div className={styles.valorIcon}>
                    <Recycle className={styles.icon} />
                  </div>
                  <h3 className={styles.valorTitle}>Circular</h3>
                  <p className={styles.valorDescription}>
                    Promovemos a economia circular e o consumo consciente
                  </p>
                </div>
                <div className={styles.valorCard}>
                  <div className={styles.valorIcon}>
                    <Heart className={styles.icon} />
                  </div>
                  <h3 className={styles.valorTitle}>Com Propósito</h3>
                  <p className={styles.valorDescription}>
                    Cada peça é cuidadosamente selecionada e higienizada
                  </p>
                </div>
              </div>

              <div className={styles.curadoriaBox}>
                <h3 className={styles.curadoriaTitle}>O Processo de Curadoria</h3>
                <p className={styles.paragraph}>
                  Todas as nossas peças passam por um rigoroso processo de seleção. Buscamos apenas roupas de alta 
                  qualidade, com tecidos duráveis e design atemporal. Cada item é cuidadosamente higienizado e 
                  inspecionado antes de chegar até você.
                </p>
                <p className={styles.paragraph}>
                  Quando você compra no ReVeste-se, está adquirindo não apenas uma peça de roupa, mas também a 
                  confiança de que está fazendo uma escolha consciente e de qualidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Vista-se de Propósito
              </h2>
              <p className={styles.ctaDescription}>
                Compre agora e faça parte da revolução da moda circular
              </p>
              <Link href="/loja" className={styles.ctaButton}>
                Explorar a Loja
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
