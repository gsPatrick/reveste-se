/**
 * Serviço Centralizado para Chamadas de API
 * 
 * Este arquivo encapsula toda a lógica de comunicação com o backend.
 * Ele usa variáveis de ambiente e injeta automaticamente tokens de autenticação.
 */

const API_BASE_URL = 'https://geral-revesteseapi.r954jc.easypanel.host/api';

/**
 * Função genérica para realizar chamadas fetch com tratamento de erro e injeção de token.
 * @param {string} endpoint - O endpoint da API (ex: '/produtos').
 * @param {object} options - Opções para a chamada fetch (método, headers, etc.).
 * @param {boolean} isProtected - Se a rota requer autenticação.
 * @returns {Promise<any>} - O JSON retornado pela API.
 */
async function fetchApi(endpoint, options = {}, isProtected = false) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // --- CORREÇÃO PRINCIPAL AQUI ---
  // Inicia os headers. Não definimos Content-Type ainda.
  const headers = { ...options.headers };

  if (isProtected) {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error("Token de autenticação não encontrado para rota protegida.");
      }
    } catch (error) {
        console.warn("localStorage não disponível.");
    }
  }

  const config = {
    next: { revalidate: 60 },
    ...options,
    headers,
  };

  // Se o corpo NÃO é FormData, então definimos o Content-Type para JSON.
  // Se for FormData, o próprio navegador definirá o Content-Type correto com o boundary.
  if (!(config.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  // ------------------------------------

  if (config.method && config.method !== 'GET') {
    config.cache = 'no-store';
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.erro || `Erro na API: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    }
    return {};
  } catch (error) {
    console.error(`[API Service] Erro ao chamar ${url}:`, error.message);
    throw error;
  }
}

const api = {
  // === AUTENTICAÇÃO ===
  login: (credentials) => fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData) => fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // === PRODUTOS ===
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    // --- CORREÇÃO APLICADA AQUI ---
    const data = await fetchApi(`/produtos?${query}`);
    return data.produtos || []; // Retorna o array de produtos ou um array vazio
  },
  getFeaturedProducts: (limit = 3) => fetchApi(`/produtos/lancamentos?limit=${limit}`),
  getMostSoldProducts: (limit = 3) => fetchApi(`/produtos/mais-vendidos?limit=${limit}`),
  getProductByIdOrSlug: (idOrSlug) => fetchApi(`/produtos/${idOrSlug}`),
  createProduct: (productData) => fetchApi('/produtos', {
    method: 'POST',
    body: JSON.stringify(productData),
  }, true),
  updateProduct: (id, productData) => fetchApi(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }, true),
  deleteProduct: (id) => fetchApi(`/produtos/${id}`, { method: 'DELETE' }, true),

  // === VARIAÇÕES DE PRODUTO (TAMANHOS) ===
  getProductVariations: (productId) => fetchApi(`/produtos/${productId}/variacoes`),
  createProductVariation: (productId, variationData) => fetchApi(`/produtos/${productId}/variacoes`, {
    method: 'POST',
    body: JSON.stringify(variationData),
  }, true),
  updateProductVariation: (productId, variationId, variationData) => fetchApi(`/produtos/${productId}/variacoes/${variationId}`, {
    method: 'PUT',
    body: JSON.stringify(variationData),
  }, true),
  deleteProductVariation: (productId, variationId) => fetchApi(`/produtos/${productId}/variacoes/${variationId}`, {
    method: 'DELETE',
  }, true),
  createProductVariationsInBatch: (productId, variationsArray) => fetchApi(`/produtos/${productId}/variacoes/lote`, {
    method: 'POST',
    body: JSON.stringify(variationsArray),
  }, true),

  // === CATEGORIAS ===
  getCategories: () => fetchApi('/categorias'),
  createCategory: (categoryData) => fetchApi('/categorias', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }, true),
  updateCategory: (id, categoryData) => fetchApi(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }, true),
  deleteCategory: (id) => fetchApi(`/categorias/${id}`, { method: 'DELETE' }, true),

  // === PEDIDOS ===
  createOrder: (orderData) => fetchApi('/pedidos', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }, true),
  getClientOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/pedidos/meus-pedidos?${query}`, {}, true);
  },
  getAllOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/pedidos?${query}`, {}, true);
  },
  getOrderById: (id) => fetchApi(`/pedidos/${id}`, {}, true),
  updateOrderStatus: (id, status) => fetchApi(`/pedidos/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, true),

  // === AVALIAÇÕES ===
  getProductReviews: (productId) => fetchApi(`/produtos/${productId}/avaliacoes`),
  submitProductReview: (productId, reviewData) => fetchApi(`/produtos/${productId}/avaliacoes`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }, true),
  getPendingReviews: () => fetchApi('/avaliacoes/admin/pendentes', {}, true),
  approveReview: (id) => fetchApi(`/avaliacoes/${id}/aprovar`, { method: 'POST' }, true),

  // === UPLOADS ===
  uploadProductImages: (productId, formData) => fetchApi(`/uploads/produtos/${productId}/imagens`, {
    method: 'POST',
    body: formData,
    headers: {},
  }, true),
  setMainImage: (productId, imageId) => fetchApi(`/uploads/produtos/${productId}/imagens/${imageId}/principal`, {
    method: 'PUT',
  }, true),
  deleteFile: (fileId) => fetchApi(`/uploads/arquivos/${fileId}`, { method: 'DELETE' }, true),

  // === ENDEREÇOS ===
  getClientAddresses: () => fetchApi('/enderecos', {}, true),
  createAddress: (addressData) => fetchApi('/enderecos', {
    method: 'POST',
    body: JSON.stringify(addressData),
  }, true),
  updateAddress: (id, addressData) => fetchApi(`/enderecos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(addressData),
  }, true),
  deleteAddress: (id) => fetchApi(`/enderecos/${id}`, { method: 'DELETE' }, true),
  setMainAddress: (id) => fetchApi(`/enderecos/${id}/principal`, { method: 'POST' }, true),
  
  // === CUPONS ===
  validateCoupon: (couponData) => fetchApi('/cupons/validar', {
    method: 'POST',
    body: JSON.stringify(couponData),
  }, true),

  // === FRETE ===
  calculateShipping: (shippingData) => fetchApi('/frete/calcular', {
    method: 'POST',
    body: JSON.stringify(shippingData),
  }),
   // === PAGAMENTOS ===
  createCheckout: (orderData) => fetchApi('/pagamentos/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData), // Ex: { pedidoId: 123 }
  }, true),

  getAddressByCep: (cep) => fetchApi(`/cep/${cep}`),

  // === DASHBOARD & RELATÓRIOS (Admin) ===
  getDashboardMetrics: () => fetchApi('/dashboard/metricas', {}, true),
  getSalesByPeriod: (periodo = 'mes') => fetchApi(`/dashboard/vendas?periodo=${periodo}`, {}, true),
  getTopSellingProducts: (limit = 10) => fetchApi(`/dashboard/produtos-mais-vendidos?limit=${limit}`, {}, true),
  getTopClients: (limit = 10) => fetchApi(`/dashboard/clientes-top?limit=${limit}`, {}, true),
};



export default api;