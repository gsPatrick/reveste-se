"use client";

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import api from '@/services/api.service';
import styles from './OrderDetailModal.module.css';

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'pago', label: 'Pago' },
  { value: 'processando', label: 'Processando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'cancelado', label: 'Cancelado' },
];

export default function OrderDetailModal({ order, onClose, onOrderUpdate }) {
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
    }
  }, [order]);

  if (!order) return null;

  const handleStatusUpdate = async () => {
    if (newStatus === order.status) return;
    setIsUpdating(true);
    try {
      await api.updateOrderStatus(order.id, newStatus);
      showToast(`Status do pedido #${order.id} atualizado para "${newStatus}"!`, 'success');
      onOrderUpdate(); // Atualiza a lista
      onClose();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Detalhes do Pedido #{order.id}</h2>
          <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Cliente</h3>
              <p>{order.Usuario?.nome}</p>
              <p>{order.Usuario?.email}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Endereço de Entrega</h3>
              <p>{order.enderecoEntrega?.rua}, {order.enderecoEntrega?.numero}</p>
              <p>{order.enderecoEntrega?.bairro} - {order.enderecoEntrega?.cidade}/{order.enderecoEntrega?.estado}</p>
              <p>CEP: {order.enderecoEntrega?.cep}</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Itens do Pedido</h3>
            <div className={styles.itemList}>
              {order.itens.map((item, index) => (
                <div key={index} className={styles.item}>
                  <img src={item.produto?.imagemUrl || '/placeholder.jpg'} alt={item.nome} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.nome}</p>
                    <p className={styles.itemMeta}>Qtd: {item.quantidade} | Preço Unit.: R$ {parseFloat(item.preco).toFixed(2)}</p>
                  </div>
                  <p className={styles.itemTotal}>R$ {parseFloat(item.subtotal).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.summary}>
            <div>Subtotal: <span>R$ {(order.total - order.valorFrete + order.desconto).toFixed(2)}</span></div>
            <div>Frete: <span>R$ {parseFloat(order.valorFrete).toFixed(2)}</span></div>
            {order.desconto > 0 && <div>Desconto: <span className={styles.discount}>- R$ {parseFloat(order.desconto).toFixed(2)}</span></div>}
            <div className={styles.total}>Total: <span>R$ {parseFloat(order.total).toFixed(2)}</span></div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.statusUpdater}>
            <label>Alterar Status:</label>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <button className={styles.saveButton} onClick={handleStatusUpdate} disabled={isUpdating || newStatus === order.status}>
            {isUpdating ? <Loader2 size={18} className={styles.spinner} /> : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}