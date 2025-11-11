"use client";

import { useState, useEffect, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import api from '@/services/api.service';
import { useToast } from '@/context/ToastContext';

// Importe o novo modal que vamos criar
import ProductModal from '@/components/admin/ProductModal'; 

import styles from '../AdminPages.module.css';

export default function AdminProdutos() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  // Função para buscar os produtos da API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts({ limit: 100 }); // Puxa até 100 produtos
      setProducts(data.produtos);
    } catch (error) {
      showToast("Erro ao carregar produtos.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Busca os produtos quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Função para ser chamada pelo modal após a criação de um produto
  const handleProductCreated = () => {
    fetchProducts(); // Re-busca a lista de produtos
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

      {/* Tabela de produtos (simplificada por enquanto) */}
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
              <tr><td colSpan="5">Carregando...</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.nome}</td>
                  <td>R$ {parseFloat(product.preco).toFixed(2)}</td>
                  <td>{product.categoria?.nome || 'N/A'}</td>
                  <td>{product.ativo ? 'Ativo' : 'Inativo'}</td>
                  <td>{/* Botões de Editar/Excluir virão aqui */}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Renderização condicional do Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
}