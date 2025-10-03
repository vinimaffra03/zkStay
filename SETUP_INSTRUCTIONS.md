# 🚀 Setup Instructions

## ⚠️ PROBLEMA ATUAL

As dependências Starknet não estão instaladas. Você precisa executar:

## 📋 COMANDOS PARA EXECUTAR

### 1. Navegar para pasta frontend:

```bash
cd frontend
```

### 2. Instalar dependências:

```bash
npm install
```

### 3. Executar projeto:

```bash
npm run dev
```

## ✅ DEPENDÊNCIAS QUE SERÃO INSTALADAS

As seguintes dependências Starknet serão instaladas:

**Starknet Core:**

- `starknet@^6.11.0` - Biblioteca principal do Starknet
- `@starknet-react/core@^3.7.0` - Hooks React para Starknet

**Outras dependências:**

- `react`, `react-dom` - React framework
- `react-router-dom` - Roteamento
- `lucide-react` - Ícones
- `tailwindcss` - CSS Framework
- `clsx`, `tailwind-merge` - Utilitários
- `class-variance-authority` - Componentes

## 🎯 APÓS A INSTALAÇÃO

Depois de executar `npm install`, o projeto funcionará normalmente com:

1. **Conectar Wallet** - Botão azul para conectar carteira Starknet
2. **Selecionar Datas** - Inputs de check-in/check-out
3. **Reservar Apartamento** - Botão que chama o smart contract
4. **Confirmação** - Wallet solicita confirmação da transação
5. **Sucesso** - Mensagem verde de reserva confirmada

## 🚨 SE DER PROBLEMA

Se ainda der erro após `npm install`:

1. Deletar node_modules e package-lock.json:

```bash
rm -rf node_modules package-lock.json
npm install
```

2. Verificar versão do Node.js (recomendado: Node 18+):

```bash
node --version
```

## 🎉 RESULTADO ESPERADO

Após a instalação, você terá:

- ✅ Integração completa com Starknet
- ✅ Contratos conectados e funcionais
- ✅ Interface de reserva com blockchain
- ✅ Wallet connection integrada
