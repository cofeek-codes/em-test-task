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

## Данные для тестирования

После запуска сидеров в таблице `User` появятся 2 записи:

- Пользователь с почтой `exampleuser@mail.ru` и паролем `user123`
- Администратор с почтой `exampleadmin@mail.ru` и паролем `admin123`

## Endpoints

### `user/*` - endpoint'ы пользователя (не админа)

---

#### `/user/getSelf`

<details>
 <summary><code>GET</code> <code><b>/user/getSelf</b></code> - <code>Пользователь получает информацию о себе</code></summary>

##### Parameters

None

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `User returned (example below)`                 |
> | `401`     | `application/json` | `{"message":"401; Unauthorized"}`               |
> | `403`     | `application/json` | `{"message":"403: Forbidden; You are blocked"}` |

#### Successeful Responce

```json
{
  "id": 1,
  "fullName": "example user fullname",
  "email": "exampleuser@mail.ru",
  "role": "USER",
  "status": "ACTIVE",
  "isBlocked": false
}
```

</details>

---

---

#### `/user/blockSelf`

<details>
 <summary><code>GET</code> <code><b>/user/blockSelf</b></code> - <code>Пользователь блокирует себя</code></summary>

> [!NOTE]  
> Здесь используется метод `GET` потому, что нет дополнительных параметров

##### Parameters

None

##### Responses

> | http code | content-type       | response                                                 |
> | --------- | ------------------ | -------------------------------------------------------- |
> | `200`     | `application/json` | `{"message":"user with id ${id} blocked successefully"}` |
> | `400`     | `application/json` | `{"message":"user with id ${id} is already blocked"}`    |
> | `401`     | `application/json` | `{"message":"401; Unauthorized"}`                        |
> | `403`     | `application/json` | `{"message":"403: Forbidden; You are blocked"}`          |

</details>

---

### `auth/*` - авторизация (регистрация и логин)

---

#### `/auth/register`

<details>
 <summary><code>POST</code> <code><b>/auth/register</b></code> <code><b>(fullName: string, email: string, password: string)</b></code> - <code>Пользователь регистрируется в системе</code></summary>

##### Parameters

> | name     | required | data type | description         |
> | -------- | -------- | --------- | ------------------- |
> | fullName | true     | string    | ФИО пользователя    |
> | email    | true     | string    | email пользователя  |
> | password | true     | string    | пароль пользователя |

##### Responses

> | http code | content-type       | response                                            |
> | --------- | ------------------ | --------------------------------------------------- |
> | `200`     | `application/json` | `User and jwt-token returned (example below)`       |
> | `400`     | `application/json` | `{"message":"User with this email already exists"}` |

#### Successeful Responce

> [!NOTE]
> Возвращает пользователя и jwt-token отдельным полем

```json
{
  "user": {
    "id": 2,
    "fullName": "admin full name",
    "email": "adminmail@mail.ru",
    "password": "$2b$10$Tcyg00C/xVoZ2KkKAorAeOf5F0WBimIv/gBHvRgaXkXkz2eUrtjo.",
    "role": "USER",
    "status": "ACTIVE",
    "isBlocked": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzYxOTM3MzkwfQ.DqxXpXxo5x1VvvxkauceTfmPhh8Uvqlns1VLYZ4jm0I"
}
```

</details>

---

---

#### `/auth/login`

<details>
 <summary><code>POST</code> <code><b>/auth/login</b></code> <code><b>(email: string, password: string)</b></code> - <code>Пользователь входит в систему</code></summary>

##### Parameters

> | name     | required | data type | description         |
> | -------- | -------- | --------- | ------------------- |
> | email    | true     | string    | email пользователя  |
> | password | true     | string    | пароль пользователя |

##### Responses

> | http code | content-type       | response                                           |
> | --------- | ------------------ | -------------------------------------------------- |
> | `200`     | `application/json` | `User and jwt-token returned (example below)`      |
> | `400`     | `application/json` | `{"message":"User with this email doesn't exist"}` |
> | `400`     | `application/json` | `{"message":"Invalid password"}`                   |

#### Successeful Responce

> [!NOTE]
> Возвращает пользователя и jwt-token отдельным полем

```json
{
  "user": {
    "id": 2,
    "fullName": "example admin fullname",
    "email": "exampleadmin@mail.ru",
    "password": "$2b$10$6nMImNONPv9RSii8QEIbBOPulERLB689klGqxaT5X7qTfHwPPIh5y",
    "role": "ADMIN",
    "status": "ACTIVE",
    "isBlocked": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzYxOTU2MjMxfQ.V7PDvtTdGAVo-kz5XViiGYvAjeYxeakFTJ0J2QJ77f8"
}
```

</details>

---

### `admin/*` - endpoint'ы админа

---

#### `/admin/users/all`

<details>
 <summary><code>GET</code> <code><b>/admin/users/all</b></code> - <code>Админ получает информацию всех пользователях</code></summary>

##### Parameters

None

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `Users returned (example below)`                |
> | `401`     | `application/json` | `{"message":"401; Unauthorized"}`               |
> | `403`     | `application/json` | `{"message":"403: Forbidden; You are blocked"}` |

#### Successeful Responce

```json
[
  {
    "id": 1,
    "fullName": "example user fullname",
    "email": "exampleuser@mail.ru",
    "password": "$2b$10$Us2DheC01BbAznFkstdPduKRKes7yaSKP8I6o.2Ninn25UIORNDBC",
    "role": "USER",
    "status": "ACTIVE",
    "isBlocked": false
  },
  {
    "id": 2,
    "fullName": "example admin fullname",
    "email": "exampleadmin@mail.ru",
    "password": "$2b$10$6nMImNONPv9RSii8QEIbBOPulERLB689klGqxaT5X7qTfHwPPIh5y",
    "role": "ADMIN",
    "status": "ACTIVE",
    "isBlocked": false
  }
]
```

</details>

---

---

#### `/admin/users/:id`

<details>
 <summary><code>GET</code> <code><b>/admin/users/:id</b></code> <code><b>(id: number)</b></code> - <code>Админ получает информацию пользователе по id</code></summary>

##### Parameters

> | name | required | data type | description     |
> | ---- | -------- | --------- | --------------- |
> | id   | true     | number    | id пользователя |

##### Responses

> | http code | content-type       | response                                        |
> | --------- | ------------------ | ----------------------------------------------- |
> | `200`     | `application/json` | `User returned (example below)`                 |
> | `401`     | `application/json` | `{"message":"401; Unauthorized"}`               |
> | `403`     | `application/json` | `{"message":"403: Forbidden; You are blocked"}` |
> | `404`     | `application/json` | `{"message":"User with id ${id} is not found"}` |

#### Successeful Responce

```json
{
  "id": 1,
  "fullName": "example user fullname",
  "email": "exampleuser@mail.ru",
  "password": "$2b$10$Us2DheC01BbAznFkstdPduKRKes7yaSKP8I6o.2Ninn25UIORNDBC",
  "role": "USER",
  "status": "ACTIVE",
  "isBlocked": false
}
```

</details>

---

---

#### `/admin/users/block/:id`

<details>
 <summary><code>GET</code> <code><b>/admin/users/block/:id</b></code> <code><b>(id: number)</b></code> - <code>Админ блокирует пользователя по id</code></summary>

##### Parameters

> | name | required | data type | description     |
> | ---- | -------- | --------- | --------------- |
> | id   | true     | number    | id пользователя |

##### Responses

> | http code | content-type       | response                                                 |
> | --------- | ------------------ | -------------------------------------------------------- |
> | `200`     | `application/json` | `{"message":"User with id ${id} blocked successefully"}` |
> | `400`     | `application/json` | `{"message":"User with id ${id} is already blocked"}`    |
> | `401`     | `application/json` | `{"message":"401; Unauthorized"}`                        |
> | `403`     | `application/json` | `{"message":"403: Forbidden; You are blocked"}`          |
> | `404`     | `application/json` | `{"message":"User with id ${id} is not found"}`          |

#### Successeful Responce

```json
{
  "message": "User with id 1 blocked successefully"
}
```

</details>

---
