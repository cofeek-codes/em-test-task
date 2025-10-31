# Тестовое задание Effective Mobile

## Stack

- [Typescript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/)
- [PrismaORM](https://www.prisma.io/) - ORM - в качестве бд используется sqlite
- [jwt](https://www.npmjs.com/package/jsonwebtoken) - для авторизации
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - для хеширования пароля
- [dotenv](https://www.npmjs.com/package/dotenv) - для использования переменных окружения

Также для тестирования работы запросов использовался API-клиент [Insomnia](https://insomnia.rest/) и СУБД [TablePlus](https://tableplus.com/)

## Инструкции по установке

1. Склонировать репозиторий: `git clone https://github.com/cofeek-codes/em-test-task`
2. Установить зависимости: `yarn` (эта команда также создаст файл `.env` из `.env.example`)
3. Выполнить миграции: `npx prisma migrate dev`
4. Выполнить сидеры (если не были автоматически выполнены после миграции): `npx prisma db seed`
5. Запустить в prod-среде: `yarn build && yarn start` (или dev-среде: `yarn dev`)
