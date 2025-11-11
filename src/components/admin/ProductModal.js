"use client";

import { useState, useEffect, useReducer } from 'react';
import { X, Loader2, Save, ChevronDown, ChevronRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import api from '@/services/api.service';
import ToggleSwitch from './ToggleSwitch';
import ImageUpload from './ImageUpload';
import styles from './ProductModal.module.css';

// Usar um reducer para gerenciar o estado complexo do formulário principal
// Isso torna as atualizações de estado mais previsíveis e centralizadas
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};

// Definir o estado inicial para os tamanhos fixos
const initialVariationsState = [
  { nome: 'P', ativo: false, estoque: '', medidas: '' },
  { nome: 'M', ativo: false, estoque: '', medidas: '' },
  { nome: 'G', ativo: false, estoque: '', medidas: '' },
  { nome: 'GG', ativo: false, estoque: '', medidas: '' },
];

export default function ProductModal({ isOpen, onClose, onProductCreated }) {
  const initialState = {
    nome: '',
    preco: '',
    descricao: '',
    categoriaId: '',
    ativo: true,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [variations, setVariations] = useState(initialVariationsState);
  
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle', 'creating', 'creating_variations', 'uploading', 'success', 'error'
  const { showToast } = useToast();

  // Efeito para buscar dados e resetar o estado quando o modal abre/fecha
  useEffect(() => {
    if (isOpen) {
      api.getCategories()
        .then(setCategories)
        .catch(() => showToast("Erro ao carregar categorias.", "error"));
    } else {
      // Adiciona um pequeno delay ao resetar para a animação de saída do modal ser mais suave
      setTimeout(() => {
        dispatch({ type: 'RESET', initialState });
        setVariations(initialVariationsState);
        setFilesToUpload([]);
        setStatus('idle');
        setShowNewCategory(false);
        setNewCategoryName('');
      }, 300);
    }
  }, [isOpen, showToast]);

  // Não renderiza nada se não estiver aberto
  if (!isOpen) return null;

  // Manipuladores de eventos
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'SET_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value,
    });
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === 'new') {
      setShowNewCategory(true);
      // Limpa a seleção de categoria para não enviar um ID inválido
      dispatch({ type: 'SET_FIELD', field: 'categoriaId', value: '' });
    } else {
      setShowNewCategory(false);
      handleFieldChange(e);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      showToast("O nome da categoria não pode ser vazio.", "error");
      return;
    }
    try {
      const newCategory = await api.createCategory({ nome: newCategoryName });
      setCategories(prev => [...prev, newCategory]);
      // Seleciona automaticamente a nova categoria
      dispatch({ type: 'SET_FIELD', field: 'categoriaId', value: newCategory.id });
      setShowNewCategory(false);
      setNewCategoryName('');
      showToast(`Categoria "${newCategory.nome}" criada com sucesso!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'idle' && status !== 'error') return;
    
    setStatus('creating');

    try {
      // --- CORREÇÃO PRINCIPAL AQUI ---
      // Montamos o payload com os dados mais recentes do estado 'state'
      // garantindo que o preço seja convertido para número.
      const productPayload = {
        nome: state.nome,
        preco: parseFloat(state.preco) || 0, // Garante que o preço seja um número
        descricao: state.descricao,
        categoriaId: state.categoriaId ? parseInt(state.categoriaId) : null,
        ativo: state.ativo,
      };
      
      // Validação rápida para garantir que os campos obrigatórios não estão vazios
      if (!productPayload.nome || !productPayload.preco) {
        throw new Error("Nome e Preço são campos obrigatórios.");
      }
      // ------------------------------------

      // 1. Cria o produto principal com o payload corrigido
      const newProduct = await api.createProduct(productPayload);
      showToast(`Produto "${newProduct.nome}" criado com sucesso!`, 'success');

      // 2. Prepara e envia as variações (tamanhos) que foram ativadas
      const activeVariations = variations
        .filter(v => v.ativo)
        .map(v => ({
          nome: v.nome,
          estoque: parseInt(v.estoque) || 0,
          medidas: v.medidas,
        }));

      if (activeVariations.length > 0) {
        setStatus('creating_variations');
        await api.createProductVariationsInBatch(newProduct.id, activeVariations);
        showToast('Tamanhos salvos com sucesso!', 'success');
      }

      // 3. Envia as imagens (se houver)
      if (filesToUpload.length > 0) {
        setStatus('uploading');
        const formData = new FormData();
        filesToUpload.forEach(file => formData.append('files', file));
        await api.uploadProductImages(newProduct.id, formData);
        showToast(`${filesToUpload.length} imagem(ns) enviada(s) com sucesso!`, 'success');
      }

      setStatus('success');
      onProductCreated();
      onClose();

    } catch (err) {
      setStatus('error');
      showToast(err.message || 'Ocorreu uma falha inesperada.', 'error');
    }
  };

  // Função auxiliar para o texto dinâmico do botão de salvar
  const getButtonText = () => {
    if (status === 'creating') return 'Salvando produto...';
    if (status === 'creating_variations') return 'Salvando tamanhos...';
    if (status === 'uploading') return 'Enviando imagens...';
    return 'Salvar e Fechar';
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h2>Novo Produto</h2>
            <button type-="button" onClick={onClose} className={styles.closeButton}><X size={24} /></button>
          </div>

          <div className={styles.content}>
            {/* PAINEL ESQUERDO: DADOS PRINCIPAIS */}
            <div className={styles.mainForm}>
              <div className={styles.formGroup}>
                <label>Nome do Produto</label>
                <input name="nome" value={state.nome} onChange={handleFieldChange} placeholder="Ex: Blazer Vintage Borgonha" required />
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Preço Fixo (R$)</label>
                  <input name="preco" type="number" step="0.01" min="0" value={state.preco} onChange={handleFieldChange} placeholder="189.90" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select name="categoriaId" value={state.categoriaId} onChange={handleCategoryChange}>
                    <option value="">Selecione...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    <option value="new">-- Criar Nova Categoria --</option>
                  </select>
                </div>
              </div>
              {showNewCategory && (
                <div className={styles.newCategoryGroup}>
                  <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nome da nova categoria" />
                  <button type="button" onClick={handleCreateCategory} className={styles.saveCategoryButton} title="Salvar Categoria"><Save size={16} /></button>
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <textarea name="descricao" rows="5" value={state.descricao} onChange={handleFieldChange} placeholder="Descreva os detalhes da peça, material, condição, etc."></textarea>
              </div>
              
              <div className={styles.variationsSection}>
                <h3 className={styles.sectionTitle}>Tamanhos e Estoque</h3>
                {variations.map((v, index) => (
                  <div key={v.nome} className={`${styles.variationItem} ${v.ativo ? styles.variationActive : ''}`}>
                    <label className={styles.variationHeader}>
                      <input type="checkbox" checked={v.ativo} onChange={(e) => handleVariationChange(index, 'ativo', e.target.checked)} />
                      <span>Tamanho {v.nome}</span>
                      {v.ativo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </label>
                    {v.ativo && (
                      <div className={styles.variationContent}>
                        <div className={styles.formGroup}>
                          <label>Estoque</label>
                          <input type="number" min="0" placeholder="0" value={v.estoque} onChange={(e) => handleVariationChange(index, 'estoque', e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Medidas (texto descritivo)</label>
                          <textarea rows="3" placeholder="Ex: Busto: 90cm, Cintura: 70cm..." value={v.medidas} onChange={(e) => handleVariationChange(index, 'medidas', e.target.value)} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PAINEL DIREITO: STATUS E IMAGENS */}
            <div className={styles.sidePanel}>
              <div className={styles.statusGroup}>
                <span>Status do Produto</span>
                <div className={styles.statusControl}>
                  <ToggleSwitch checked={state.ativo} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'ativo', value: e.target.checked })} />
                  <span className={state.ativo ? styles.statusActive : styles.statusInactive}>{state.ativo ? 'Ativo' : 'Inativo'}</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Imagens do Produto</label>
                <ImageUpload onFilesChange={setFilesToUpload} />
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={() => { dispatch({ type: 'RESET', initialState }); setVariations(initialVariationsState); }} className={styles.clearButton}>Limpar Campos</button>
            <div className={styles.footerActions}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
              <button type="submit" className={styles.saveButton} disabled={status !== 'idle' && status !== 'error'}>
                {(status !== 'idle' && status !== 'error' && status !== 'success') && <Loader2 size={18} className={styles.spinner} />}
                {getButtonText()}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}