# Lab Cidades UESC
[![Angular](https://img.shields.io/badge/Angular-17.3-red.svg?logo=angular)](https://angular.dev/)
[![Node](https://img.shields.io/badge/Node-v22.14.0-green.svg?logo=node.js)](https://nodejs.org/en)
[![Material UI](https://img.shields.io/badge/Material--UI-17.3-blue.svg?logo=angular)](https://v17.material.angular.io/)

<img width="1912" height="1044" alt="Image" src="https://github.com/user-attachments/assets/4ae096a2-a2f4-436c-98e7-0a802fcf2b73" />

Este repositório contém a aplicação front-end da plataforma web do projeto **Lab Cidades UESC**. A plataforma tem como objetivo centralizar, catalogar, indexar e facilitar o acesso a documentos de políticas urbanas e planejamento público municipal (tais como planos diretores, leis de zoneamento, relatórios técnicos, artigos e mapas).

---

## 🚀 Funcionalidade Principal: Filtragem Dinâmica

<img width="1913" height="1044" alt="Image" src="https://github.com/user-attachments/assets/03d4b65f-3faf-4bd1-9814-d15ae6ddc9b8" />

O grande destaque da plataforma é a sua ferramenta de **Busca Avançada com Filtragem Dinâmica**. A lógica de pesquisa foi desenhada para permitir que pesquisadores e gestores públicos realizem cruzamentos complexos e precisos de informações:

*   **Encadeamento Dinâmico de Filtros:** O usuário pode adicionar dinamicamente até **7 filtros diferentes** de pesquisa concorrente.
*   **Operadores Lógicos:** Permite o encadeamento dos filtros usando operadores lógicos (`AND` / `OR`).
*   **Seleção de Campos:** Cada filtro pode ser direcionado a campos específicos (como título, descrição, autor, localidade) com correspondência flexível.
*   **Filtro por Tipo de Documento:** Integração com listagens dinâmicas de tipos de documentos cadastrados (ex: Lei, Decreto, Artigo, Mapa, Relatório).
*   **Paginação Inteligente:** Resultados paginados de forma automática e integrada ao estado da busca (simples ou avançada).

---

## 📁 Estrutura de Funcionalidades

A aplicação está dividida em módulos focados em recursos específicos:

1.  **Buscador (`/buscador`):** Interface principal de pesquisa simples e avançada com listagem de arquivos e visualização de detalhes dos documentos.
2.  **Dashboard Administrativo (`/dashboard`):** Painel administrativo protegido por guardas de rota ([auth.guard.ts](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/src/app/core/guards/auth.guard.ts)), permitindo a gestão completa de:
    *   **Documentos:** Upload, indexação e metadados de novos arquivos (veja a interface de dados em [Document.ts](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/src/app/core/models/Document.ts)).
    *   **Tipos de Documento:** Cadastro e controle das categorias de políticas urbanas.
    *   **Localidades:** Gestão geográfica de Estados, Cidades e Mesorregiões.
3.  **Segurança com reCAPTCHA:** Utilização do Google reCAPTCHA v2 para prevenir submissões automatizadas maliciosas nos formulários do sistema.
4.  **SEO & SSR (Server-Side Rendering):** Configuração com Angular SSR (`@angular/ssr` e `server.ts`) e pré-renderização nativa ativada para garantir indexação perfeita pelos motores de busca (SEO) e velocidade máxima no primeiro carregamento de tela.

---

## 🛠️ Tecnologias e Dependências

As principais tecnologias declaradas no arquivo [package.json](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/package.json) são:

*   **Framework Principal:** Angular v17.3
*   **UI & Design:** Angular Material & CDK v17.3
*   **Estilização:** SCSS nativo estruturado e modularizado
*   **Segurança:** Google reCAPTCHA v2 (`ng-recaptcha` v13)
*   **Notificações Toast:** `ngx-toastr` v19
*   **Renderização:** Express v4 & Angular SSR
*   **Utilitários:** RxJS v7.8, jQuery v3.7

---

## ⚙️ Pré-requisitos & Instalação

### Requisitos Mínimos
*   **Node.js:** `v22.14.0` (ou compatível com Angular 17)
*   **Gerenciador de Pacotes:** `npm` ou `yarn`

### 1. Clonar o Repositório e Instalar Dependências
```bash
# Instalar as dependências do projeto
npm install
```

### 2. Configurar Variáveis de Ambiente
Antes de rodar o projeto, é necessário configurar as credenciais e chaves do Google reCAPTCHA. Edite os parâmetros no arquivo:
*   [environment.development.ts](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/src/environments/environment.development.ts) (para desenvolvimento)
*   [environment.ts](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/src/environments/environment.ts) (para produção)

Configuração padrão de desenvolvimento:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1', // Endereço da API do Back-end
  recaptcha: {
    siteKey: 'SUA_KEY_RECAPTCHA_AQUI',   // Gerado em: https://cloud.google.com/security/products/recaptcha
  },
};
```

---

## 💻 Comandos Úteis

Os seguintes scripts estão disponíveis na configuração do [package.json](file:///home/joao/Documentos/Projetos/lab-cidades-frontend/package.json):

| Comando | Descrição |
| :--- | :--- |
| `npm start` ou `ng serve` | Executa o servidor de desenvolvimento local em `http://localhost:4200/` |
| `npm run build` | Compila o aplicativo para produção (com suporte a SSR e prerendering) na pasta `dist/` |
| `npm run watch` | Compila o aplicativo em modo de desenvolvimento assistido (recompilação automática) |
| `npm test` | Executa a suíte de testes unitários através do Karma/Jasmine |
| `npm run serve:ssr:lab-cidades` | Inicia o servidor local Node de produção com suporte SSR |

---

## 🗂️ Arquitetura do Projeto

A organização de pastas do projeto segue a arquitetura limpa e escalável para aplicações Angular baseada no artigo [Estrutura de pastas para Angular: escalável, limpa e fácil](https://belmirofss.medium.com/minha-nova-estrutura-de-pastas-para-angular-escal%C3%A1vel-limpa-e-f%C3%A1cil-93b6ffb203d9):

```text
src/
├── app/
│   ├── core/           # Módulos globais de instância única (guards, interceptors, models, DTOs)
│   ├── features/       # Páginas e fluxos completos da aplicação (buscador, dashboard, login, sobre, etc.)
│   ├── shared/         # Componentes reutilizáveis, diretivas, pipes e serviços comuns a múltiplos módulos
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
├── assets/             # Imagens, ícones e arquivos estáticos locais
├── environments/       # Configurações de variáveis de ambiente
├── styles/             # Variáveis, mixins e arquivos de temas SCSS
└── main.ts             # Ponto de entrada da aplicação
```
