"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/context/ToastContext';
import api from '@/services/api.service';
import { DollarSign, ShoppingCart, Users, Archive } from 'lucide-react';

import StatCard from '@/components/admin/StatCard';
import SalesChart from '@/components/admin/SalesChart';
import RecentOrdersList from '@/components/admin/RecentOrdersList';
import TopProductsList from '@/components/admin/TopProductsList';

import styles from './AdminPages.module.css';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const { showToast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Usamos Promise.all para buscar todos os dados em paralelo, melhorando a performance
      const [metricsData, salesChartData, ordersData, productsData] = await Promise.all([
        api.getDashboardMetrics(),
        api.getSalesByPeriod('dia'), // Busca dados diários para o gráfico
        api.getAllOrders({ limit: 5 }), // Busca os 5 pedidos mais recentes
        api.getTopSellingProducts(5) // Busca os 5 produtos mais vendidos
      ]);

      setMetrics(metricsData);
      setSalesData(salesChartData);
      setRecentOrders(ordersData.pedidos);
      setTopProducts(productsData);

    } catch (error) {
      showToast("Erro ao carregar dados do dashboard.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <div className={styles.loadingScreen}>Carregando Dashboard...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      
      {/* Cards de Métricas Rápidas */}
      <div className={styles.grid}>
        <StatCard 
          icon={<DollarSign />} 
          title="Faturamento Hoje" 
          value={`R$ ${metrics?.faturamentoHoje?.toFixed(2) || '0,00'}`}
          change="+5.2% vs ontem"
        />
        <StatCard 
          icon={<ShoppingCart />} 
          title="Vendas Hoje" 
          value={metrics?.vendasHoje || 0}
          change="-1.8% vs ontem"
        />
        <StatCard 
          icon={<Users />} 
          title="Total de Clientes" 
          value={metrics?.clientesTotal || 0}
        />
        <StatCard 
          icon={<Archive />} 
          title="Total de Produtos" 
          value={metrics?.produtosTotal || 0}
        />
      </div>

      {/* Gráfico e Listas */}
      <div className={`${styles.grid} ${styles.mainGrid}`}>
        <div className={styles.chartContainer}>
          <SalesChart data={salesData} />
        </div>
        <div className={styles.listsContainer}>
          <RecentOrdersList orders={recentOrders} />
          <TopProductsList products={topProducts} />
        </div>
      </div>
    </div>
  );
}