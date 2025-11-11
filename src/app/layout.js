import "./globals.css";

// Importação dos Provedores de Contexto
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { ModalProvider } from "@/context/ModalContext";
import { AuthModalProvider } from "@/context/AuthModalContext";

// Importação dos Componentes de Modal Globais
import SizeSelectionModal from "@/components/SizeSelectionModal/SizeSelectionModal";
import AuthModal from "@/components/AuthModal";

// Metadados da aplicação
export const metadata = {
  title: "ReVeste-se | Moda Circular com Propósito",
  description: "Peças vintage de qualidade que contam histórias. Vista-se com estilo e consciência.",
};

/**
 * RootLayout é o layout principal que envolve toda a aplicação.
 * Ele é responsável por "instalar" todos os provedores de contexto globais
 * e renderizar os componentes de modal que precisam estar disponíveis em qualquer página.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* 
          A ordem dos provedores é importante. Provedores que dependem de outros 
          devem estar aninhados dentro de suas dependências. 
          Neste caso, a ordem não é estritamente dependente, mas agrupar por 
          funcionalidade é uma boa prática.
        */}
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <ModalProvider>
                <AuthModalProvider>
                  
                  {/* 'children' representa a página atual que está sendo renderizada */}
                  {children}
                  
                  {/* 
                    Renderizamos os modais aqui, fora do 'children', 
                    para que eles possam ser acionados de qualquer página 
                    e apareçam sobre todo o conteúdo.
                  */}
                  <SizeSelectionModal />
                  <AuthModal />
                  
                </AuthModalProvider>
              </ModalProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}