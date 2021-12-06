# Sing me a Song API
## Descrição
RESTful API em Node/Express para a recomendação de músicas baseada em um sistema de votação.

<br/>

### Features

* Criar recomendações de músicas
* Votar em uma recomendação
* Receber uma recomendação aleatória
* Listar todas as melhores recomendações

<br/>


## Tecnologias utilizadas
<p align="center" style="display: flex;">
	<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
	<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
	<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
	<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
	<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>
</p>

<br/>


## Rodando localmente

Para utilizar a API Sing me a Song é necessário ter instalado em sua máquina:

* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)


### Instalando
```bash

$ git clone https://github.com/LeoDias-0/sing-me-a-song-api

$ cd sing-me-a-song-api-main

$ npm install

```


### Preparando o setup
Na raiz do projeto crie um arquivo `.env` com as suas credenciais do postgres assim como no arquivo `.env.example`.


### Criando a database

```bash

sudo su postgres

psql

\i ./create_database.sql

```



### Rodando no modo desenvolvedor
```bash

$ npm run start:dev

```

<br/>


## Endpoints da API

### `POST /recommendations`

### `POST /recommendations/:id/upvote`

### `POST /recommendations/:id/downvote`

### `GET /recommendations/random`

### `GET /recommendations/top/:amount`

<br/>


## Testes

```bash

npm run test

```
