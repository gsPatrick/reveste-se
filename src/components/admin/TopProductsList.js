import Link from 'next/link';
import styles from './DashboardLists.module.css';

export default function TopProductsList({ products }) {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>Produtos Mais Vendidos</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/admin/produtos`} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{product.nome}</p>
                <p className={styles.itemMeta}>{product.quantidade} vendidos</p>
              </div>
              <span className={styles.itemValue}>R$ {parseFloat(product.faturamento).toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}