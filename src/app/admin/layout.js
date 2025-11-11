import AdminLayoutClient from './AdminLayoutClient';
import styles from './AdminLayout.module.css';

export const metadata = {
  title: 'Painel Admin | ReVeste-se',
};

export default function AdminLayout({ children }) {
  // Este componente de servidor envolve o de cliente para proteção.
  return (
    <div className={styles.adminWrapper}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}