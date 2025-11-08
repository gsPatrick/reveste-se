import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

// Mock de dados do produto
const getProduto = (id) => {
  const produtos = {
    "1": {
      id: 1,
      nome: "Blazer Vintage Borgonha",
      preco: 189.90,
      imagem: "/produto-1.jpg",
      categoria: "Casacos",
      descricao: "Blazer vintage em tom borgonha, perfeito para compor looks elegantes e atemporais. Tecido de alta qualidade com excelente caimento.",
      tamanhos: ["P", "M", "G"],
      condicao: "Excelente",
      material: "Lã e Poliéster"
    },
    "2": {
      id: 2,
      nome: "Blusa Clássica Creme",
      preco: 89.90,
      imagem: "/produto-2.jpg",
      categoria: "Blusas",
      descricao: "Blusa clássica em tom creme, versátil e confortável. Ideal para o dia a dia ou ocasiões especiais.",
      tamanhos: ["P", "M", "G"],
      condicao: "Excelente",
      material: "Algodão"
    },
    "3": {
      id: 3,
      nome: "Calça Alfaiataria Preta",
      preco: 129.90,
      imagem: "/produto-3.jpg",
      categoria: "Calças",
      descricao: "Calça de alfaiataria preta, corte reto e elegante. Perfeita para looks formais e profissionais.",
      tamanhos: ["36", "38", "40", "42"],
      condicao: "Excelente",
      material: "Poliéster e Elastano"
    }
  };
  
  return produtos[id] || produtos["1"];
};

export async function generateMetadata({ params }) {
  const produto = getProduto(params.id);
  
  return {
    title: `${produto.nome} | ReVeste-se`,
    description: produto.descricao,
  };
}

export default function Produto({ params }) {
  const produto = getProduto(params.id);
  
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.produtoSection}>
          <div className="container">
            <div className={styles.produtoGrid}>
              <div className={styles.imageContainer}>
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  className={styles.produtoImage}
                />
              </div>
              
              <div className={styles.produtoInfo}>
                <p className={styles.categoria}>{produto.categoria}</p>
                <h1 className={styles.produtoNome}>{produto.nome}</h1>
                <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
                
                <div className={styles.detalhes}>
                  <h2 className={styles.detalhesTitle}>Descrição</h2>
                  <p className={styles.descricao}>{produto.descricao}</p>
                  
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Condição:</span>
                      <span className={styles.infoValue}>{produto.condicao}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Material:</span>
                      <span className={styles.infoValue}>{produto.material}</span>
                    </div>
                  </div>
                  
                  <div className={styles.tamanhosContainer}>
                    <h3 className={styles.tamanhosTitle}>Tamanhos Disponíveis</h3>
                    <div className={styles.tamanhos}>
                      {produto.tamanhos.map((tamanho) => (
                        <button key={tamanho} className={styles.tamanhoButton}>
                          {tamanho}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className={styles.addButton}>
                  Adicionar ao Carrinho
                </button>
                
                <Link href="/loja" className={styles.backLink}>
                  ← Voltar para a Loja
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
