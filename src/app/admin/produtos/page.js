"use client";

import { useState, useEffect, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import api from '@/services/api.service';
import { useToast } from '@/context/ToastContext';
import ProductModal from '@/components/admin/ProductModal'; 
import styles from '../AdminPages.module.css';

export default function AdminProdutos() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      // A função api.getProducts já retorna o array de produtos.
      const productArray = await api.getProducts({ limit: 100 });
      
      // --- CORREÇÃO APLICADA AQUI ---
      // Usamos diretamente a resposta da API, que já é o array.
      setProducts(productArray);
      // -----------------------------

    } catch (error) {
      showToast("Erro ao carregar produtos.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductCreated = () => {
    fetchProducts(); // Re-busca a lista de produtos para exibir o novo item
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gerenciar Produtos</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={20} />
          Novo Produto
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Carregando produtos...</td></tr>
            ) : (
              // Agora 'products' é garantidamente um array
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.nome}</td>
                  <td>R$ {(parseFloat(product.preco) || 0).toFixed(2)}</td>
                  <td>{product.categoria?.nome || 'N/A'}</td>
                  <td>{product.ativo ? 'Ativo' : 'Inativo'}</td>
                  <td>{/* Botões de Editar/Excluir virão aqui */}</td>
                </tr>
              ))
            )}
            {!isLoading && products.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
}