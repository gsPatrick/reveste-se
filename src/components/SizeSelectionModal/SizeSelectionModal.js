"use client";

import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './SizeSelectionModal.module.css';

export default function SizeSelectionModal() {
  const { isModalOpen, closeModal, modalProduct } = useModal();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState(null);

  // Não renderiza nada se o modal não estiver aberto ou não tiver um produto
  if (!isModalOpen || !modalProduct) {
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Por favor, selecione um tamanho.', 'error');
      return;
    }
    
    // Passa o produto e o objeto de variação completo para o carrinho
    addToCart(modalProduct, selectedSize);
    showToast(`${modalProduct.nome} (${selectedSize.nome}) foi adicionado ao carrinho!`, 'success');
    
    // Limpa o estado e fecha o modal após o sucesso
    setSelectedSize(null);
    closeModal();
  };
  
  // Função para fechar o modal e limpar a seleção
  const handleClose = () => {
    setSelectedSize(null);
    closeModal();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={24} />
        </button>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image 
              src={modalProduct.imagem} 
              alt={modalProduct.nome} 
              fill 
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.productName}>{modalProduct.nome}</h2>
            <p className={styles.productPrice}>
              {/* --- CORREÇÃO APLICADA --- */}
              R$ {(parseFloat(modalProduct.preco) || 0).toFixed(2)}
            </p>
            <div className={styles.sizesContainer}>
              <h3 className={styles.sizesTitle}>Selecione o Tamanho</h3>
              <div className={styles.sizes}>
                {modalProduct.variacoes?.map((variacao) => (
                  <button 
                    key={variacao.id} 
                    className={`${styles.sizeButton} ${selectedSize?.id === variacao.id ? styles.sizeButtonActive : ''}`}
                    onClick={() => setSelectedSize(variacao)}
                    disabled={variacao.estoque === 0}
                  >
                    {variacao.nome}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Exibe as medidas do tamanho selecionado */}
            {selectedSize && selectedSize.medidas && (
              <div className={styles.measurementsContainer}>
                <h4 className={styles.measurementsTitle}>Medidas do Tamanho {selectedSize.nome}:</h4>
                <p className={styles.measurementsText}>{selectedSize.medidas}</p>
              </div>
            )}

            <button className={styles.addButton} onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}