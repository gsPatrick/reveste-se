"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/CartContext";
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useToast } from '@/context/ToastContext';
import { Trash2, Loader2 } from "lucide-react";
import api from "@/services/api.service";
import styles from "./page.module.css";

export default function Carrinho() {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { showToast } = useToast();
  
  // Estados para o cálculo de frete
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [zipCodeInput, setZipCodeInput] = useState('');
  const [shippingAddress, setShippingAddress] = useState(null);

  // Calcula o subtotal dos itens
  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (parseFloat(item.preco) || 0) * item.quantity, 0),
    [cartItems]
  );
  
  // Efeito para calcular o frete e buscar o endereço
  const handleCalculateShipping = async () => {
    const cep = zipCodeInput.replace(/\D/g, '');
    if (cartItems.length > 0 && cep.length === 8) {
      setIsCalculatingShipping(true);
      setShippingOptions([]);
      setSelectedShipping(null);
      setShippingAddress(null);
      try {
        // Busca os dados do endereço e as opções de frete em paralelo
        const [addressData, shippingData] = await Promise.all([
          api.getAddressByCep(cep),
          api.calculateShipping({
            enderecoDestino: { cep },
            itens: cartItems.map(item => ({ produtoId: item.id, quantidade: item.quantity })),
          })
        ]);

        setShippingAddress(addressData); // Armazena o objeto de endereço completo
        setShippingOptions(shippingData);

        if (shippingData.length > 0) {
          setSelectedShipping(shippingData[0]); // Pré-seleciona a primeira opção
        } else {
          showToast("Nenhuma opção de frete encontrada para este CEP.", "error");
        }
      } catch (error) {
        console.error("Erro ao calcular frete ou buscar CEP:", error);
        showToast(error.message || "Não foi possível calcular o frete.", "error");
      } finally {
        setIsCalculatingShipping(false);
      }
    } else {
      showToast("Por favor, insira um CEP válido com 8 dígitos.", "error");
    }
  };

  const shippingCost = selectedShipping ? parseFloat(selectedShipping.price) : 0;
  const total = subtotal + shippingCost;

  // Função para navegar para o checkout OU ABRIR O MODAL
  const handleGoToCheckout = () => {
    if (!selectedShipping || !shippingAddress) {
      showToast("Por favor, calcule e selecione um método de frete.", "error");
      return;
    }
    
    // Salva os dados para a página de checkout ler
    localStorage.setItem('checkoutData', JSON.stringify({
      address: shippingAddress,
      shipping: selectedShipping,
    }));

    if (user) {
      router.push('/checkout');
    } else {
      openAuthModal();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.carrinhoSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>Meu Carrinho</h1>
            
            {cartItems.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>Seu carrinho está vazio</p>
                <Link href="/loja" className={styles.shopButton}>Explorar Produtos</Link>
              </div>
            ) : (
              <div className={styles.carrinhoGrid}>
                <div className={styles.itemsList}>
                  {cartItems.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                      <div className={styles.itemImage}>
                        <Image src={item.imagem} alt={item.nome} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div className={styles.itemInfo}>
                        <h2 className={styles.itemName}>{item.nome}</h2>
                        <p className={styles.itemDetails}>Tamanho: {item.size}</p>
                        <p className={styles.itemPrice}>R$ {(parseFloat(item.preco) || 0).toFixed(2)}</p>
                      </div>
                      <div className={styles.itemActions}>
                        <p className={styles.itemQuantity}>Qtd: {item.quantity}</p>
                        <button onClick={() => removeFromCart(index)} className={styles.removeButton}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className={styles.itemTotal}>
                        R$ {((parseFloat(item.preco) || 0) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.summary}>
                  <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
                  
                  <div className={styles.shippingSection}>
                    <label>Calcular Frete</label>
                    <div className={styles.shippingInputGroup}>
                      <input 
                        type="text" 
                        placeholder="Digite seu CEP" 
                        value={zipCodeInput} 
                        onChange={(e) => setZipCodeInput(e.target.value)}
                        maxLength="9"
                      />
                      <button onClick={handleCalculateShipping} disabled={isCalculatingShipping}>
                        {isCalculatingShipping ? <Loader2 className={styles.spinner} /> : 'Calcular'}
                      </button>
                    </div>

                    {shippingOptions.length > 0 && (
                      <div className={styles.shippingOptions}>
                        {shippingOptions.map(opt => (
                           <label key={opt.id} className={styles.radioCard}>
                             <input type="radio" name="shipping" value={opt.id} checked={selectedShipping?.id === opt.id} onChange={() => setSelectedShipping(opt)} />
                             <div className={styles.cardContent}>
                               <strong>{opt.name}</strong>
                               <p>{opt.custom_description}</p>
                             </div>
                             <span>{parseFloat(opt.price) === 0 ? 'Grátis' : `R$ ${parseFloat(opt.price).toFixed(2)}`}</span>
                           </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.costSummary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Frete</span>
                      <span>{selectedShipping ? (shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`) : 'A calcular'}</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={styles.checkoutButton}
                    onClick={handleGoToCheckout}
                    disabled={!selectedShipping || !shippingAddress}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}