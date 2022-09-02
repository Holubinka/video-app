## Installation

```bash
$ yarn install

# DB & Minio
$ docker compose up
```

## Running the app

```bash

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Short description

This project demonstrates a setup & configuration of NestJS application with MinIO and Prisma(PostgreSQL). It is a part of proprietary software, therefore a big chunk of code was trimmed out. Only overall config, basic models and resolvers stayed intact for demo purposes. 3rd party services (Minio, Postgres) have been dockerized, but the application itself still runs locally. Examples of usage are attached below.

Stack:
NestJS, GraphQL, PostgreSQL, Prisma, Minio, PassportJS

![Register](demo/register.png?raw=true 'Register')
![Login](demo/login.png?raw=true 'Login')
![CreatePost](demo/createPost.png?raw=true 'CreatePost')
![Posts](demo/posts.png?raw=true 'Posts')
