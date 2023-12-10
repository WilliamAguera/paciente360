# Teste Paciente360

Esse é um projeto CRUD em angularjs escrito para o teste do Paciente360, as tecnologias utilizadas são:

- Angularjs ^1.7.9
- Nodejs v16.19.0
- Postgres v16
- Sass ^1.32.4

Alguns pacotes adicionais foram utilizados como:

- webpack ^4.8.1
- npm v8.19.3
- angular-ui-mask ^1.8.7
- angular-ui-router ^0.4.3
- pg ^8.11.3

e outros a nivel de desenvolvimento

## Como Executar

Para rodar o projeto siga as intruções seguintes

- Criar banco de dados no Postgres 16 com o nome `paciente`

```bash
    user: 'postgres',
    host: 'localhost',
    database: 'paciente',
    password: 'postgres',
    port: 5432,
```

```bash
    CREATE DATABASE paciente;
```

dentro de `paciente`

```bash
    CREATE TABLE profissao (
        id SERIAL PRIMARY KEY,
        prof_nome VARCHAR(255)
    );

    CREATE TABLE pessoa (
        id SERIAL PRIMARY KEY,
        pes_nome VARCHAR(255),
        pes_data_nascimento date,
        pes_cpf varchar(14),
        pes_telefone varchar(14),
        prof_id INT REFERENCES profissao(id),
        pes_observacoes varchar(255)
    );
```

- Executar npm install para baixar os pacotes

```bash
  npm run install
```

- Para rodar o projeto em DEV

```bash
  npm run build:dev
  npm run start:dev
```

- Para rodar o projeto em PROD

```bash
  npm run build:prod
  npm run start:prod
```

## Authors

- [@WilliamAguera](https://www.github.com/WilliamAguera)
