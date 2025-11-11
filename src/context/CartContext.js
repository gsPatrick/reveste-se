"use client";

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- MUDANÇA IMPORTANTE ---
  // A função agora espera o objeto 'variation' completo
  const addToCart = (product, variation) => {
    setCartItems(prevItems => [
      ...prevItems, 
      { 
        ...product, 
        size: variation.nome, // Mantém a compatibilidade com a exibição
        variationId: variation.id, // Armazena o ID da variação
        medidas: variation.medidas, // Armazena as medidas
        quantity: 1 
      }
    ]);
  };

  const removeFromCart = (itemIndex) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== itemIndex));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};