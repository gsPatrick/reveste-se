"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { Star, ThumbsUp } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import api from '@/services/api.service';
import styles from "./page.module.css";

export default function ProdutoClient({ produto }) {
  // Hooks de contexto
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Estado do produto
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Estados para o sistema de avaliação
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  // Estados do formulário de avaliação
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(''); // O backend não usa título, mas mantemos para a UI
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  // Efeito para buscar as avaliações quando o produto carregar
  useEffect(() => {
    const fetchReviews = async () => {
      if (!produto?.id) return;
      
      setIsLoadingReviews(true);
      try {
        const fetchedReviews = await api.getProductReviews(produto.id);
        setReviews(fetchedReviews);

        // Calcular média e contagem
        if (fetchedReviews.length > 0) {
          const totalRating = fetchedReviews.reduce((acc, review) => acc + review.nota, 0);
          setAverageRating(totalRating / fetchedReviews.length);
          
          const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          fetchedReviews.forEach(review => {
            if (counts[review.nota] !== undefined) {
              counts[review.nota]++;
            }
          });
          setRatingCounts(counts);
        }

      } catch (error) {
        console.error("Falha ao buscar avaliações:", error.message);
        showToast("Não foi possível carregar as avaliações.", "error");
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [produto?.id, showToast]);

  // Lógica para adicionar ao carrinho
  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Por favor, selecione um tamanho.', 'error');
      return;
    }
    addToCart(produto, selectedSize);
    showToast(`${produto.nome} (${selectedSize.nome}) foi adicionado ao carrinho!`, 'success');
  };

  // Lógica para submeter a avaliação
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment || !consent) {
      showToast("Por favor, preencha a nota, comentário e aceite os termos.", "error");
      return;
    }

    try {
      // ATENÇÃO: Esta chamada irá falhar com erro 401 se o usuário não estiver autenticado.
      // A lógica de autenticação (envio de token) precisa ser implementada no api.service.
      const newReviewData = { rating, comment, name, email };
      const createdReview = await api.submitProductReview(produto.id, newReviewData);
      
      // Adiciona a nova avaliação (já aprovada, para feedback imediato)
      setReviews([ { ...createdReview, Usuario: { nome: 'Você' } }, ...reviews]);
      showToast("Sua avaliação foi enviada para aprovação!", "success");

      // Resetar formulário
      setRating(0);
      setTitle('');
      setComment('');
      setName('');
      setEmail('');
      setConsent(false);

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error.message);
      showToast(error.message, "error");
    }
  };

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
                  priority // Prioriza o carregamento da imagem principal
                />
              </div>
              
              <div className={styles.produtoInfo}>
                <p className={styles.categoria}>{produto.categoria?.nome || 'Sem Categoria'}</p>
                <h1 className={styles.produtoNome}>{produto.nome}</h1>
                <p className={styles.preco}>R$ {parseFloat(produto.preco).toFixed(2)}</p>
                
                <div className={styles.detalhes}>
                  <h2 className={styles.detalhesTitle}>Descrição</h2>
                  <p className={styles.descricao}>{produto.descricao}</p>
                  
                  <div className={styles.tamanhosContainer}>
                    <h3 className={styles.tamanhosTitle}>Tamanhos Disponíveis</h3>
                    <div className={styles.tamanhos}>
                      {produto.variacoes?.map((variacao) => (
                        <button 
                          key={variacao.id} 
                          className={`${styles.tamanhoButton} ${selectedSize?.id === variacao.id ? styles.tamanhoButtonActive : ''}`}
                          onClick={() => setSelectedSize(variacao)}
                          disabled={variacao.estoque === 0}
                        >
                          {variacao.nome}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedSize && selectedSize.medidas && (
                    <div className={styles.measurementsContainer}>
                      <h4 className={styles.measurementsTitle}>Medidas do Tamanho {selectedSize.nome}:</h4>
                      <p className={styles.measurementsText}>{selectedSize.medidas}</p>
                    </div>
                  )}
                </div>
                
                <button className={styles.addButton} onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </button>
                
                <Link href="/loja" className={styles.backLink}>
                  ← Voltar para a Loja
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.avaliacoesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Avaliações de Clientes</h2>
            <div className={styles.avaliacoesGrid}>
              <div className={styles.sumarioContainer}>
                <div className={styles.sumarioBox}>
                  <p className={styles.averageRating}>{averageRating.toFixed(1)}</p>
                  <div className={styles.starRating}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill={i < Math.round(averageRating) ? "currentColor" : "none"} className={styles.starIcon} />
                    ))}
                  </div>
                  <p className={styles.totalReviews}>Baseado em {reviews.length} avaliação{reviews.length !== 1 && 's'}</p>
                  <div className={styles.ratingFilters}>
                    <button className={styles.filterButtonActive}>Todas ({reviews.length})</button>
                    {[5, 4, 3, 2, 1].map(star => (
                      <button key={star} className={styles.filterButton}>
                        {star} ★ ({ratingCounts[star]})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.listaAvaliacoes}>
                {isLoadingReviews ? (
                  <p>Carregando avaliações...</p>
                ) : reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div>
                          <span className={styles.reviewAuthor}>{review.Usuario?.nome || 'Anônimo'}</span>
                          {/* O backend precisa retornar um campo 'compraVerificada' se quisermos usar isso */}
                          {/* <span className={styles.verifiedPurchase}>Compra Verificada</span> */}
                        </div>
                        <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className={styles.starRating}>
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} fill={i < review.nota ? "currentColor" : "none"} className={styles.starIconSmall} />
                        ))}
                      </div>
                      {/* O backend não tem 'título', então comentamos ou removemos */}
                      {/* <h4 className={styles.reviewTitle}>{review.title}</h4> */}
                      <p className={styles.reviewComment}>{review.comentario}</p>
                      <div className={styles.reviewFooter}>
                        <button className={styles.helpfulButton}><ThumbsUp size={16} /> Útil (0)</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhuma avaliação encontrada. Seja o primeiro a avaliar!</p>
                )}
              </div>
            </div>

            <div className={styles.formContainer}>
               <h3 className={styles.formTitle}>Deixe sua Avaliação</h3>
               <p className={styles.formSubtitle}>Sua opinião nos ajuda a melhorar. Avalie {produto.nome}</p>
               <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Como você avalia este produto?</label>
                    <div className={styles.starRatingInput}>
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <Star
                            key={starValue}
                            className={styles.starIconInput}
                            fill={(hoverRating || rating) >= starValue ? 'currentColor' : 'none'}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(starValue)}
                          />
                        );
                      })}
                    </div>
                  </div>
                 <div className={styles.formGroup}>
                   <label htmlFor="comment" className={styles.label}>Seu Comentário</label>
                   <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} className={styles.textarea} placeholder="Compartilhe sua experiência com este produto..." maxLength="1000" required />
                 </div>
                 {/* Os campos de nome e email são opcionais, já que o backend usa o usuário autenticado */}
                 <div className={styles.formGrid}>
                   <div className={styles.formGroup}>
                     <label htmlFor="name" className={styles.label}>Seu Nome (Opcional)</label>
                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder="Como você gostaria de ser identificado?"/>
                   </div>
                   <div className={styles.formGroup}>
                     <label htmlFor="email" className={styles.label}>Email (Opcional)</label>
                     <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="seu@email.com"/>
                   </div>
                 </div>
                 <div className={styles.formGroupCheckbox}>
                    <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                    <label htmlFor="consent" className={styles.checkboxLabel}>Concordo que minha avaliação pode ser publicada no site e que meus dados pessoais podem ser usados conforme a política de privacidade.</label>
                 </div>
                 <button type="submit" className={styles.submitButton}>Enviar Avaliação</button>
               </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}