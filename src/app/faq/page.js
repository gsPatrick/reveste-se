import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

const faqs = [
  {
    pergunta: "Como funciona a compra no ReVeste-se?",
    resposta: "Navegue pelo nosso catálogo, escolha as peças que deseja, adicione ao carrinho e finalize a compra. Aceitamos diversos meios de pagamento e enviamos para todo o Brasil."
  },
  {
    pergunta: "As peças são realmente de segunda mão?",
    resposta: "Sim! Todas as nossas peças são de segunda mão, cuidadosamente selecionadas e higienizadas. Trabalhamos com moda circular para promover sustentabilidade e consumo consciente."
  },
  {
    pergunta: "Como é feita a higienização das peças?",
    resposta: "Todas as peças passam por um processo rigoroso de limpeza e higienização profissional antes de serem disponibilizadas para venda. Garantimos que cada item chegue em perfeitas condições de uso."
  },
  {
    pergunta: "Qual o prazo de entrega?",
    resposta: "O prazo de entrega varia de acordo com a sua região. Após a confirmação do pagamento, o envio é realizado em até 2 dias úteis. O prazo de entrega dos Correios varia entre 5 a 15 dias úteis."
  },
  {
    pergunta: "Posso trocar ou devolver um produto?",
    resposta: "Sim! Você tem até 7 dias após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. O produto deve estar nas mesmas condições em que foi enviado."
  },
  {
    pergunta: "Como solicitar uma troca ou devolução?",
    resposta: "Entre em contato conosco através do email ou WhatsApp informando o número do pedido e o motivo da troca/devolução. Nossa equipe irá orientá-lo sobre os próximos passos."
  },
  {
    pergunta: "As peças têm garantia de qualidade?",
    resposta: "Sim! Todas as peças são inspecionadas e selecionadas criteriosamente. Trabalhamos apenas com itens em excelente estado de conservação. Caso receba algum produto com defeito não informado, faremos a troca imediatamente."
  },
  {
    pergunta: "Como posso acompanhar meu pedido?",
    resposta: "Após o envio, você receberá um código de rastreamento por email para acompanhar a entrega em tempo real através do site dos Correios."
  },
  {
    pergunta: "Vocês aceitam quais formas de pagamento?",
    resposta: "Aceitamos cartão de crédito, débito, PIX e boleto bancário. O pagamento é processado de forma segura através de nossa plataforma."
  },
  {
    pergunta: "Posso vender minhas roupas para o ReVeste-se?",
    resposta: "No momento não estamos aceitando peças de terceiros, mas fique atento às nossas redes sociais para futuras novidades sobre esse serviço!"
  }
];

export const metadata = {
  title: "FAQ | ReVeste-se",
  description: "Perguntas frequentes sobre o ReVeste-se, políticas de troca e devolução.",
};

export default function FAQ() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>
              Perguntas Frequentes
            </h1>
            <p className={styles.pageDescription}>
              Tire suas dúvidas sobre nossos produtos, políticas de troca e devolução
            </p>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <details key={index} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    {faq.pergunta}
                  </summary>
                  <p className={styles.faqAnswer}>
                    {faq.resposta}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
