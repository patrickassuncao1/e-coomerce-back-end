## E-commerce - Back-End  
 Desafio de Projeto da Dio : Integrando um Backend em Node.js com um Frontend em React para um E-commerce.

## Orm
- [Prisma][https://www.prisma.io/docs/getting-started]

## Repositório para o Front-end
[E-commerce-front-end](https://github.com/patrickassuncao1/e-commerce-front-end)

## 🛠️ Abrir e rodar o projeto
- Cria uma arquivo .env utilizar o .env.example como exemplo ([Prisma][https://www.prisma.io/docs/concepts/database-connectors/postgresql]) 

- Criar as migrations com o comando npx prisma migrate dev

- Iniciar o servidor npm start

- Realizei alguns teste de integração se optar por utilizar basta criar um arquivo .env.test (env.example para exemplo) e rodar o npm test no terminal.


## Visualizar imagens no Front-end
    - Algumas imagens são utilizada no front-end. A necessidade de fazer algums insert no banco:
        - Rota: (/products/create).
        - As imagens estão localizadas em src/public/img/products.
   
   - Ou optar por fazer o insert direto no banco os dados estão no product.sql.
