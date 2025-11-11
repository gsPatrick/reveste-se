import { Eye } from 'lucide-react';
import styles from './OrderList.module.css';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
};

export default function OrderList({ orders, isLoading, onViewDetails }) {
  if (isLoading) {
    return <div className={styles.loading}>Carregando pedidos...</div>;
  }

  if (orders.length === 0) {
    return <div className={styles.empty}>Nenhum pedido encontrado.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Data</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{order.Usuario?.nome || 'N/A'}</td>
              <td>R$ {parseFloat(order.total).toFixed(2)}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button className={styles.actionButton} onClick={() => onViewDetails(order)}>
                  <Eye size={16} /> Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}