# Lab Cidades Uesc front-end
Nesse repositório contém todos os arquivos relacionado ao front-end do projeto LabCidades Uesc.

## Instalação & Execução
Foi utilizado:
<br>[Node](https://nodejs.org/en) v.22.14.0
<br>[Angular](https://angular.dev/) v17
<br>[Angular Matreial](https://v17.material.angular.io/) v17

### Key necessária do projeto

1. reCAPTCHA Google 
<br>Na aplicacação é utilizado o google reCAPTCHA v2. É necessário gerar a **key** no site do google: https://cloud.google.com/security/products/recaptcha
<br>Depois de gerado insira no arquivo: [environment.development.ts](https://github.com/joaocarlosjunior/lab-cidades-frontend/blob/main/src/environments/environment.development.ts)

Instalar as depenências do projeto:
```
npm i
```
Executar servidor:
```
ng s
```

Acessar no navegador:
```
http://localhost:4200/
```

## Estrutura do Projeto

A estruta de pastas do projeto segue a ideia do artigo: [Estrutura de pastas para Angular: escalável, limpa e fácil](https://belmirofss.medium.com/minha-nova-estrutura-de-pastas-para-angular-escal%C3%A1vel-limpa-e-f%C3%A1cil-93b6ffb203d9)
