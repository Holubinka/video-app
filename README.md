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

Once ready, the app should resemble TikTok, with possibility for user to register/authenticate, upload and view short videos of other users. Currently there's not much, but there already are a few resolvers, scalars and services for future use.

Stack:
NestJS, GraphQL, PostgreSQL, Prisma, Minio, PassportJS
