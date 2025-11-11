"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter } from 'lucide-react';
import api from '@/services/api.service';
import { useToast } from '@/context/ToastContext';

import OrderList from '@/components/admin/OrderList';
import OrderDetailModal from '@/components/admin/OrderDetailModal';

import styles from '../AdminPages.module.css';

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'pago', label: 'Pago' },
  { value: 'processando', label: 'Processando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'cancelado', label: 'Cancelado' },
];

export default function AdminPedidos() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({ busca: '', status: '' });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const { showToast } = useToast();

  const fetchOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: 15,
        busca: filters.busca,
        status: filters.status,
      };
      const data = await api.getAllOrders(params);
      setOrders(data.pedidos);
      setPagination({ currentPage: data.currentPage, totalPages: data.totalPages });
    } catch (error) {
      showToast("Erro ao carregar pedidos.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderUpdate = () => {
    fetchOrders(pagination.currentPage); // Recarrega os pedidos na página atual
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gerenciar Pedidos</h1>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchInput}>
          <Search size={18} />
          <input
            type="text"
            name="busca"
            placeholder="Buscar por ID ou nome do cliente..."
            value={filters.busca}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterSelect}>
          <Filter size={18} />
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos os Status</option>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <OrderList
        orders={orders}
        isLoading={isLoading}
        onViewDetails={setSelectedOrder}
      />

      {/* Paginação virá aqui no futuro */}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
}