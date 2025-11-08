import "./globals.css";

export const metadata = {
  title: "ReVeste-se | Moda Circular com Propósito",
  description: "Peças vintage de qualidade que contam histórias. Vista-se com estilo e consciência.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
