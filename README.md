# E-commerce React Application

Este é um projeto de e-commerce desenvolvido em React que oferece uma experiência completa de compra online, incluindo gerenciamento administrativo.

## 🚀 Funcionalidades Principais

### 🛍️ Área do Cliente

- **Catálogo de Produtos**

  - Listagem de produtos com imagens, preços e descrições
  - Busca de produtos por nome ou descrição
  - Interface moderna
  - Feedback visual ao adicionar produtos ao carrinho

- **Carrinho de Compras**

  - Carrinho flutuante com contador de itens
  - Gerenciamento de quantidades
  - Cálculo automático do total
  - Persistência dos itens durante a navegação

- **Checkout**
  - Formulário de dados do cliente
  - Seleção de método de pagamento
    - Cartão de Crédito
    - Boleto
    - Dinheiro
    - PIX
  - Resumo do pedido
  - Confirmação de compra

### 👨‍💼 Área Administrativa

- **Dashboard**

  - Visão geral com estatísticas
    - Total de produtos
    - Total de categorias
    - Total de vendas
  - Acesso rápido às funcionalidades

- **Gerenciamento de Produtos**

  - Listagem de produtos
  - Adição de novos produtos
  - Edição de produtos existentes
  - Exclusão de produtos
  - Upload de imagens

- **Gerenciamento de Categorias**

  - Listagem de categorias
  - Criação de novas categorias
  - Edição de categorias
  - Exclusão de categorias

- **Relatório de Vendas**
  - Listagem de todas as vendas
  - Detalhes de cada venda
  - Filtro por cliente
  - Status do pedido

## 🔌 Integração com API

A aplicação se conecta com um backend através de uma API utilizando o Axios. As principais integrações incluem:

### Endpoints Utilizados

```javascript
// Configuração base do Axios
import axios from "axios";

export const api = axios.create({
  baseURL: "URL_DA_API",
});

// Endpoints
-GET / produtos / { usuario } - // Lista todos os produtos
  GET / categorias - // Lista todas as categorias
  GET / venda - // Lista todas as vendas
  POST / venda - // Cria uma nova venda
  DELETE / venda - // Remove uma venda
  POST / produtos - // Adiciona novo produto
  PUT / produtos - // Atualiza produto existente
  DELETE / produtos; // Remove produto
```

### Autenticação

- Sistema de login com token JWT
- Armazenamento do token no localStorage
- Rotas protegidas para área administrativa

## 📱 Telas do Sistema

### Área Pública

1. **Home (/)**

   - Listagem de produtos
   - Busca
   - Carrinho flutuante

2. **Carrinho (/carrinho)**

   - Lista de itens
   - Formulário de checkout
   - Seleção de pagamento

3. **Agradecimento (/agradecimento)**
   - Confirmação de compra
   - Botão para voltar à loja

### Área Administrativa

1. **Login (/login)**

   - Formulário de acesso
   - Validação de credenciais

2. **Painel (/painel)**

   - Dashboard com estatísticas
   - Menu de ações administrativas

3. **Produtos (/admin/produtos)**

   - CRUD de produtos
   - Upload de imagens

4. **Categorias (/admin/categorias)**

   - CRUD de categorias

5. **Vendas (/admin/vendas)**
   - Relatório de vendas
   - Detalhes de pedidos

## 🎨 Design System

O projeto utiliza um design system consistente com:

- **Cores**

  - Principal: #2ecc71 (Verde)
  - Secundária: #2c3e50 (Azul escuro)
  - Erro: #e74c3c (Vermelho)
  - Background: #f5f5f5 (Cinza claro)

- **Componentes**
  - Cards com sombras e hover effects
  - Botões com feedback visual
  - Loading spinners
  - Inputs estilizados
  - Ícones do React Icons

## 🔧 Instalação e Uso

1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências

```bash
npm install
```

4. Execute o projeto

```bash
npm start
```

## 📚 Bibliotecas Utilizadas

- **React Router Dom**: Navegação
- **Axios**: Requisições HTTP
- **React Icons**: Ícones
