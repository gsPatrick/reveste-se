import styles from './StatCard.module.css';

export default function StatCard({ icon, title, value, change }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
        {change && <p className={styles.change}>{change}</p>}
      </div>
    </div>
  );
}