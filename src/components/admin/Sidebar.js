"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Tag, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/categorias', label: 'Categorias', icon: Tag },
  { href: '/admin/frete', label: 'Config. de Frete', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/admin">ReVeste-se Admin</Link>
      </div>
      <nav className={styles.nav}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>
        <button onClick={logout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </aside>
  );
}