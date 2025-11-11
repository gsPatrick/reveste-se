"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useToast } from '@/context/ToastContext';
import { X, Loader2 } from 'lucide-react';
import styles from './AuthModal.module.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Falha no login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.formGroup}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading && <Loader2 className={styles.spinner} />} Entrar
      </button>
    </form>
  );
};

const RegisterForm = ({ onRegisterSuccess }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register({ nome, email, password });
      onRegisterSuccess();
    } catch (err) {
      setError(err.message || 'Falha no cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.formGroup}>
        <label>Nome Completo</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
      </div>
      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading && <Loader2 className={styles.spinner} />} Cadastrar e Continuar
      </button>
    </form>
  );
};

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();
  const { showToast } = useToast();
  
  if (!isAuthModalOpen) return null;

  const handleSuccess = () => {
    showToast("Autenticação realizada com sucesso!", "success");
    closeAuthModal();
    router.push('/checkout');
  };

  return (
    <div className={styles.overlay} onMouseDown={closeAuthModal}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <button onClick={closeAuthModal} className={styles.closeButton}><X size={24} /></button>
        
        <div className={styles.tabs}>
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? styles.activeTab : ''}>Entrar</button>
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? styles.activeTab : ''}>Cadastrar</button>
        </div>

        <div className={styles.content}>
          {activeTab === 'login' ? <LoginForm onLoginSuccess={handleSuccess} /> : <RegisterForm onRegisterSuccess={handleSuccess} />}
        </div>
      </div>
    </div>
  );
}