import Link from "next/link";
import Image from "next/image"; // 1. Importar o componente Image
import { Instagram, Facebook, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            
            {/* --- MUDANÇA 1: SUBSTITUIR TEXTO PELA LOGO --- */}
            <div className={styles.footerLogoContainer}>
              <Image
                src="/logo-completa-branca.png" // Caminho para a nova logo
                alt="Logo ReVeste-se"
                width={160} // Largura ajustada para a logo completa
                height={50}  // Altura ajustada (mantenha a proporção da sua imagem)
                className={styles.footerLogo}
              />
            </div>
            <p className={styles.footerDescription}>
              Moda Circular com Propósito. Dando nova vida a peças de qualidade.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Links Rápidos</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/loja" className={styles.footerLink}>Loja</Link></li>
              <li><Link href="/nossa-historia" className={styles.footerLink}>Nossa História</Link></li>
              <li><Link href="/faq" className={styles.footerLink}>FAQ</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Redes Sociais</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}><Instagram className={styles.socialIcon} /><span className="sr-only">Instagram</span></a>
              <a href="#" className={styles.socialLink}><Facebook className={styles.socialIcon} /><span className="sr-only">Facebook</span></a>
              <a href="#" className={styles.socialLink}><Mail className={styles.socialIcon} /><span className="sr-only">Email</span></a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ReVeste-se. Todos os direitos reservados.</p>
          
          {/* --- MUDANÇA 2: ADICIONAR CRÉDITOS DE DESENVOLVEDOR --- */}
          <p className={styles.developerCredit}>
            Desenvolvido por:{" "}
            <a 
              href="https://www.codebypatrick.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Patrick.Developer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}