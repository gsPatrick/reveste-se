import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>ReVeste-se</h3>
            <p className={styles.footerDescription}>
              Moda Circular com Propósito. Dando nova vida a peças de qualidade.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Links Rápidos</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/loja" className={styles.footerLink}>
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/nossa-historia" className={styles.footerLink}>
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.footerLink}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Redes Sociais</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Instagram className={styles.socialIcon} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <Facebook className={styles.socialIcon} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <Mail className={styles.socialIcon} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ReVeste-se. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
