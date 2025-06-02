# MeuCofre - Sistema de Gestão Financeira Pessoal

Sistema web para gestão financeira pessoal com foco em simplicidade, clareza na visualização e controle total de gastos e ganhos.

## Funcionalidades

- **Dashboard**: Visão geral do saldo atual, gráficos e resumos financeiros
- **Gastos**: Registro e categorização de gastos
- **Ganhos**: Registro e controle de receitas
- **Histórico**: Linha do tempo detalhada de todas as transações
- **Agenda**: Calendário de pagamentos e lembretes financeiros
- **Tema Claro/Escuro**: Alternância entre temas visuais

## Tecnologias

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Gerenciamento de Estado**: Zustand
- **Roteamento**: React Router DOM
- **Estilização**: Tailwind CSS
- **Gráficos**: Recharts (a ser implementado)
- **Calendário**: FullCalendar (a ser implementado)

## Estrutura do Projeto

```
src/
  ├── assets/        # Recursos estáticos
  ├── components/    # Componentes reutilizáveis
  │   └── layout/    # Componentes de layout (Navbar, etc)
  ├── constants/     # Constantes da aplicação
  ├── context/       # Contextos React (ThemeContext, etc)
  ├── hooks/         # Hooks personalizados
  ├── pages/         # Páginas da aplicação
  ├── store/         # Gerenciamento de estado (Zustand)
  ├── styles/        # Estilos globais
  ├── types/         # Definições de tipos TypeScript
  └── utils/         # Funções utilitárias
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/MeuCofre.git
cd MeuCofre
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em:

```
http://localhost:5173
```

## Desenvolvimento Futuro

- Autenticação de usuários
- Backend com Node.js e PostgreSQL
- Notificações push
- Integração com APIs bancárias
- Exportação de relatórios
- Versão mobile com React Native

## Licença

Este projeto está licenciado sob a licença MIT.
