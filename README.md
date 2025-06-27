# MeuCofre – Sistema de Gestão Financeira Pessoal

<p align="center">
  <img src="public/images/icons/apple-icon-180x180.png" width="120" alt="MeuCofre logo" />
</p>

<p align="center">
  <strong>Desenvolvido com ❤️ por Jeferson Reis</strong><br>
  <a href="https://github.com/Jeffinp" target="_blank">@Jeffinp</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Zustand-State_Management-4B3222?style=for-the-badge&logo=bear&logoColor=white" alt="Zustand">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="MIT License">
</p>

---

## ✨ Sobre o Projeto

O **MeuCofre** é um sistema web moderno e intuitivo para gestão financeira pessoal, projetado para oferecer uma visão clara e controle total sobre suas finanças. Com uma interface amigável e visualmente atraente, o objetivo é transformar a maneira como você organiza, analisa e planeja suas receitas e despesas, promovendo maior saúde e educação financeira.

Este projeto foi construído com as tecnologias mais recentes do ecossistema React, demonstrando uma arquitetura de front-end robusta, escalável e pronta para o mercado.

---

## 🚀 Funcionalidades Principais

- 📊 **Dashboard Interativo:** Visualize resumos financeiros, gráficos de despesas por categoria e projeções de gastos em tempo real.
- 💸 **Controle de Transações:** Adicione, edite e remova receitas e despesas de forma rápida, com categorização inteligente.
- 🛒 **Simulador de Compras:** Uma loja fictícia que permite simular o impacto de novas compras no seu orçamento mensal.
- 📅 **Agenda Financeira:** Um calendário para agendar pagamentos, recebimentos e outros eventos financeiros importantes.
- 📈 **Histórico Detalhado:** Filtre e pesquise transações por data, tipo ou categoria para uma análise aprofundada.
- 🌗 **Tema Dinâmico (Claro/Escuro):** Alterne entre os temas para uma experiência de uso mais confortável em qualquer ambiente.
- 📱 **Design Responsivo:** Acesso completo a todas as funcionalidades em qualquer dispositivo, seja desktop, tablet ou smartphone.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando um stack moderno e performático, focado em escalabilidade e na melhor experiência de desenvolvimento.

- **Core:**
  - **React 19:** Para a construção da interface de usuário.
  - **TypeScript:** Para um código mais seguro, legível e manutenível.
  - **Vite:** Build tool ultrarrápido que oferece um ambiente de desenvolvimento ágil.
- **Estilização:**
  - **Tailwind CSS:** Framework CSS utility-first para a criação de designs customizados de forma eficiente.
- **Gerenciamento de Estado:**
  - **Zustand:** Solução de gerenciamento de estado global simples, flexível e poderosa.
- **Roteamento:**
  - **React Router DOM:** Para a criação de rotas de navegação na aplicação.
- **Visualização de Dados:**
  - **Recharts:** Biblioteca de gráficos para a exibição de dados financeiros (em implementação).

---

## 📁 Estrutura do Projeto

A arquitetura do projeto foi organizada de forma modular e escalável, seguindo as melhores práticas do mercado:

```
src/
├── assets/         # Imagens, fontes e outros recursos estáticos
├── components/     # Componentes React reutilizáveis
│   ├── charts/       # Gráficos para visualização de dados
│   ├── dashboard/    # Componentes específicos do painel principal
│   ├── forms/        # Formulários, como o de adicionar transação
│   ├── layout/       # Estrutura principal (Navbar, Sidebar, etc.)
│   ├── shop/         # Componentes para a loja de simulação
│   ├── transactions/ # Listagem e itens de transações
│   └── ui/           # Pequenos elementos de interface (StatCard, etc.)
├── context/        # Contexto para o gerenciamento de tema (Claro/Escuro)
├── hooks/          # Hooks customizados para lógicas reutilizáveis
├── pages/          # Páginas da aplicação (Dashboard, Ganhos, Gastos, etc.)
├── store/          # Lógica de estado global com Zustand
├── types/          # Definições de tipos e interfaces TypeScript
├── utils/          # Funções utilitárias
├── App.tsx         # Componente raiz com a definição das rotas
└── main.tsx        # Ponto de entrada da aplicação
```

---

## 🧑‍💻 Como Rodar o Projeto Localmente

Para executar o **MeuCofre** em seu ambiente de desenvolvimento, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/jefersonreis/MeuCofre.git
   cd MeuCofre
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute a aplicação:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra seu navegador e acesse [http://localhost:5173](http://localhost:5173).

---

## 📈 Roadmap e Próximos Passos

Este projeto está em constante evolução. Os próximos passos incluem:

- [ ] **Autenticação de Usuários:** Implementação de login e registro.
- [ ] **Integração com Backend:** Conexão com uma API para persistência de dados.
- [ ] **Testes Unitários e de Integração:** Aumentar a cobertura de testes com Jest e Testing Library.
- [ ] **Exportação de Relatórios:** Funcionalidade para exportar dados em PDF e CSV.
- [ ] **Progressive Web App (PWA):** Habilitar funcionalidades offline.

---

## 🤝 Contribuições

Contribuições são muito bem-vindas! Se você tem alguma ideia para melhorar o projeto, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

1. Faça um *fork* do projeto.
2. Crie uma nova *branch* (`git checkout -b feature/sua-feature`).
3. Faça o *commit* das suas alterações (`git commit -m 'feat: Adiciona nova feature'`).
4. Envie para a *branch* original (`git push origin feature/sua-feature`).
5. Abra um *Pull Request*.

---

## 📝 Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<p align="center">
  Feito com paixão e código por <strong>Jeferson Reis</strong>
</p>