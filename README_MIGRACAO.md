# ReVeste-se - Migração para Next.js 14+

## 🎯 Sobre a Migração

Este projeto foi migrado de **React + Vite** para **Next.js 14+ com App Router**, mantendo a identidade visual e funcionalidades do projeto original.

## 🏗️ Arquitetura

### Stack Tecnológica
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** JavaScript (sem TypeScript)
- **Estilização:** CSS Modules
- **Animações:** Framer Motion
- **Gerenciador de Pacotes:** pnpm

### Estrutura de Pastas

```
reveste-se-nextjs/
├── src/
│   ├── app/                    # Páginas e rotas (App Router)
│   │   ├── layout.js           # Layout raiz
│   │   ├── page.js             # Página inicial
│   │   ├── loja/               # Página da loja
│   │   ├── nossa-historia/     # Página Nossa História
│   │   ├── faq/                # Página FAQ
│   │   ├── carrinho/           # Página do carrinho
│   │   ├── login/              # Página de login
│   │   ├── conta/              # Página da conta
│   │   └── produto/[id]/       # Página dinâmica de produto
│   │
│   └── components/             # Componentes reutilizáveis
│       ├── Header/
│       │   ├── Header.js
│       │   └── Header.module.css
│       ├── Footer/
│       │   ├── Footer.js
│       │   └── Footer.module.css
│       ├── Hero/
│       │   ├── Hero.js
│       │   └── Hero.module.css
│       └── ProductCard/
│           ├── ProductCard.js
│           └── ProductCard.module.css
│
└── public/                     # Assets estáticos (imagens)
```

## 🎨 Design System

### Paleta de Cores
- **Primária (Borgonha):** `#800020`
- **Primária Light:** `#a0002a`
- **Acento (Ouro Envelhecido):** `#b8860b`
- **Background (Bege Claro):** `#f5f5dc`
- **Muted (Bege Escuro):** `#e8e8d0`

### Tipografia
- **Títulos:** Cinzel (serif)
- **Corpo:** Inter (sans-serif)

## 🚀 Como Executar

### Instalação

```bash
# Instalar dependências
pnpm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
# Criar build otimizado
pnpm build

# Executar build de produção
pnpm start
```

## 📄 Páginas Implementadas

✅ **Home** (`/`) - Página inicial com hero, valores e produtos em destaque  
✅ **Loja** (`/loja`) - Catálogo completo de produtos  
✅ **Nossa História** (`/nossa-historia`) - História da marca e valores  
✅ **FAQ** (`/faq`) - Perguntas frequentes com acordeão nativo  
✅ **Produto** (`/produto/[id]`) - Página dinâmica de detalhes do produto  
✅ **Carrinho** (`/carrinho`) - Página do carrinho (estrutura básica)  
✅ **Login** (`/login`) - Página de login (estrutura básica)  
✅ **Conta** (`/conta`) - Página da conta do usuário (estrutura básica)

## 🧩 Componentes

### Header
- Navegação responsiva
- Links para todas as páginas
- Ícones de carrinho e conta

### Footer
- Links rápidos
- Redes sociais
- Copyright

### Hero
- Banner principal com animação Framer Motion
- Título e descrição
- Call-to-action

### ProductCard
- Card de produto com imagem
- Categoria, nome e preço
- Botão de ação
- Animação hover

## 🎭 Animações

Todas as animações são feitas com **Framer Motion** e são sutis:

- **Hero:** Fade in + slide up
- **ProductCard:** Hover com scale e shadow
- **Botões:** Hover com translateY e shadow

## 📝 Próximos Passos

### Funcionalidades a Implementar

1. **Autenticação**
   - Sistema de login/cadastro
   - Gerenciamento de sessão
   - Proteção de rotas

2. **Carrinho de Compras**
   - Adicionar/remover produtos
   - Atualizar quantidades
   - Persistência com localStorage ou banco de dados

3. **Integração com Backend**
   - API para produtos
   - API para pedidos
   - API para usuários

4. **Pagamento**
   - Integração com gateway de pagamento
   - Checkout

5. **Otimizações**
   - SEO avançado
   - Performance
   - Acessibilidade

## 🔧 Configurações

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Adicionar domínios externos se necessário
  },
};

export default nextConfig;
```

### CSS Modules

Todos os estilos são escopados por componente/página usando CSS Modules:

```javascript
import styles from './Component.module.css';

<div className={styles.container}>...</div>
```

### Variáveis CSS Globais

Definidas em `src/app/globals.css`:

```css
:root {
  --color-primary: #800020;
  --color-accent: #b8860b;
  --color-background: #f5f5dc;
  /* ... */
}
```

## 📦 Dependências

```json
{
  "dependencies": {
    "next": "^15.1.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.18.0",
    "lucide-react": "^0.469.0"
  }
}
```

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 📞 Suporte

Para dúvidas ou sugestões sobre a migração, consulte a documentação oficial do Next.js:
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

---

**Desenvolvido com ❤️ para ReVeste-se - Moda Circular com Propósito**
