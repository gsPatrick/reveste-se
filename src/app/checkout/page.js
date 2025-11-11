"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import api from '@/services/api.service';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { Loader2, Lock, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, isLoading: authIsLoading } = useAuth();
  const { showToast } = useToast();

  // Estado para os dados de endereço e frete vindos do carrinho
  const [checkoutData, setCheckoutData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Efeito para proteger a rota e carregar os dados
  useEffect(() => {
    // 1. Guarda de Autenticação: se não estiver logado, redireciona.
    if (!authIsLoading && !user) {
      showToast("Você precisa estar logado para finalizar a compra.", "error");
      router.replace('/login');
      return;
    }
    
    // 2. Carrega os dados de endereço e frete salvos no localStorage
    try {
      const data = localStorage.getItem('checkoutData');
      if (!data) {
        showToast("Dados do checkout não encontrados. Por favor, calcule o frete novamente no carrinho.", "error");
        router.replace('/carrinho');
        return;
      }
      setCheckoutData(JSON.parse(data));
    } catch (error) {
      showToast("Erro ao carregar dados do checkout.", "error");
      router.replace('/carrinho');
    }
  }, [user, authIsLoading, router, showToast]);

  // Cálculos de valores
  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + parseFloat(item.preco) * item.quantity, 0), [cartItems]);
  const shippingCost = checkoutData ? parseFloat(checkoutData.shipping.price) : 0;
  const total = subtotal + shippingCost;

  // Função principal para criar o pedido e redirecionar para o pagamento
  const handlePlaceOrder = async () => {
    if (!checkoutData) {
      showToast("Informações de entrega não encontradas.", "error");
      return;
    }
    setIsProcessing(true);
    try {
      // Etapa 1: Criar o pedido no nosso banco de dados
      const orderPayload = {
        itens: cartItems.map(item => ({ produtoId: item.id, variacaoId: item.variationId, quantidade: item.quantity })),
        enderecoEntrega: checkoutData.address,
        freteId: checkoutData.shipping.id,
      };
      const createdOrder = await api.createOrder(orderPayload);
      
      // Etapa 2: Com o ID do pedido, criar a preferência de pagamento no Mercado Pago
      const checkoutDataMP = await api.createCheckout({ pedidoId: createdOrder.id });
      
      // Etapa 3: Redirecionar o usuário para a URL de pagamento do Mercado Pago
      if (checkoutDataMP.checkoutUrl) {
        window.location.href = checkoutDataMP.checkoutUrl;
      } else {
        throw new Error("Não foi possível obter a URL de pagamento.");
      }

    } catch (error) {
      showToast(error.message, "error");
      setIsProcessing(false);
    }
  };

  // Renderiza um estado de carregamento enquanto verifica a autenticação e os dados
  if (authIsLoading || !user || !checkoutData) {
    return <div className={styles.loadingScreen}>Carregando informações do checkout...</div>;
  }
  
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Link href="/carrinho" className={styles.backLink}>
            <ArrowLeft size={16} /> Voltar e editar carrinho
          </Link>
          <h1 className={styles.pageTitle}>Confirmar e Pagar</h1>
          <div className={styles.checkoutGrid}>
            
            {/* Coluna da Esquerda: Confirmação de Dados */}
            <div className={styles.details}>
              <div className={styles.section}>
                <h2>Confirmação dos Dados</h2>
                <div className={styles.infoBlock}>
                  <strong>Endereço de Entrega</strong>
                  <p>{checkoutData.address.rua}, {checkoutData.address.numero}</p>
                  <p>{checkoutData.address.bairro} - {checkoutData.address.cidade}/{checkoutData.address.estado}</p>
                  <p>CEP: {checkoutData.address.cep}</p>
                </div>
                <div className={styles.infoBlock}>
                  <strong>Método de Frete</strong>
                  <p>{checkoutData.shipping.name}</p>
                  <p className={styles.shippingDescription}>{checkoutData.shipping.custom_description}</p>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Resumo e Botão de Pagar */}
            <div className={styles.summary}>
              <h2>Resumo do Pedido</h2>
              <div className={styles.itemList}>
                {cartItems.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <img src={item.imagem} alt={item.nome} />
                    <div className={styles.itemInfo}>
                      <p>{item.nome} ({item.size})</p>
                      <span>Qtd: {item.quantity}</span>
                    </div>
                    <p>R$ {(parseFloat(item.preco) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className={styles.costSummary}>
                <div><span>Subtotal</span> <span>R$ {subtotal.toFixed(2)}</span></div>
                <div><span>Frete</span> <span>{shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`}</span></div>
                <div className={styles.total}><span>Total a pagar</span> <span>R$ {total.toFixed(2)}</span></div>
              </div>

              <div className={styles.paymentNotice}>
                <Lock size={16} />
                <p>Você será redirecionado para o ambiente seguro do Mercado Pago para finalizar o pagamento.</p>
              </div>

              <button className={styles.payButton} onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? <Loader2 className={styles.spinner} /> : 'Ir para o Pagamento'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}//s