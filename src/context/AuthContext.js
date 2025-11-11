"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUserFromStorage = useCallback(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth data from storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const login = async (email, password) => {
    // --- MUDANÇA CRÍTICA AQUI ---
    // Mapeamos a variável 'password' do front-end para a propriedade 'senha' que o back-end espera.
    const { usuario, token } = await api.login({ email, senha: password });
    // ----------------------------
    
    setUser(usuario);
    setToken(token);
    localStorage.setItem('authUser', JSON.stringify(usuario));
    localStorage.setItem('authToken', token);
    return usuario;
  };
  
  const register = async (userData) => {
    // Assumindo que o registro espera 'senha' também, fazemos a mesma lógica
    const { nome, email, password } = userData;
    const { usuario, token } = await api.register({ nome, email, senha: password });
    
    setUser(usuario);
    setToken(token);
    localStorage.setItem('authUser', JSON.stringify(usuario));
    localStorage.setItem('authToken', token);
    return usuario;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};