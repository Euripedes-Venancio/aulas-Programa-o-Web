# Pastelaria Iogi

Projeto acadêmico de Programação Web com frontend em Angular e backend em Spring Boot.

## Estrutura

```txt
pastelaria-iogi/
├── frontend/  # Angular
└── backend/   # Spring Boot + MySQL
```

## Como executar o frontend

```bash
cd frontend
npm install
npm start
```

Acesse: http://localhost:4200

## Como executar o backend

Antes de iniciar, tenha o MySQL rodando localmente.

Edite o arquivo:

```txt
backend/src/main/resources/application.properties
```

Configure o usuário e senha do MySQL.

Depois execute:

```bash
cd backend
mvn spring-boot:run
```

A API sobe em: http://localhost:8080

## Banco de dados

O backend cria as tabelas automaticamente com `spring.jpa.hibernate.ddl-auto=update`.

Depois de subir o backend uma vez, execute o arquivo abaixo no MySQL para cadastrar os produtos iniciais:

```txt
backend/src/main/resources/dados-iniciais.sql
```

## Observação

Não envie senhas reais do banco ou do e-mail para o GitHub. Use senhas locais apenas no seu computador.
