
import Link from 'next/link';
import styles from './DashboardLists.module.css';

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR');

export default function RecentOrdersList({ orders }) {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>Pedidos Recentes</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Link href={`/admin/pedidos`} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>Pedido #{order.id}</p>
                <p className={styles.itemMeta}>{order.Usuario?.nome || 'Cliente'} - {formatDate(order.createdAt)}</p>
              </div>
              <span className={styles.itemValue}>R$ {parseFloat(order.total).toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}