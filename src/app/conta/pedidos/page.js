"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api.service';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';

// Função para formatar a data
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
};

export default function PedidosPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await api.getClientOrders();
        setOrders(response.pedidos || []);
      } catch (error) {
        showToast('Erro ao carregar seus pedidos.', 'error');
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [showToast]);

  return (
    <div>
      <h1 className={styles.pageTitle}>Meus Pedidos</h1>

      {isLoading ? (
        <p>Carregando seus pedidos...</p>
      ) : orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Pedido #{order.id}</h2>
                  <p>Realizado em: {formatDate(order.createdAt)}</p>
                </div>
                <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                  {order.status}
                </div>
              </div>
              <div className={styles.cardBody}>
                {order.itens.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <span className={styles.itemName}>{item.nome} (Qtd: {item.quantidade})</span>
                    <span className={styles.itemPrice}>R$ {(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <strong>Total: R$ {parseFloat(order.total).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}