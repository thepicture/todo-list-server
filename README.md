# todo-list-server

Серверная часть приложения todo-list-client

## Требования

-   PostgreSQL 14.7+ (без Docker)

## Установка

```bash
npm i
```

## Запуск

### Без Docker

-   Создать БД в PostgreSQL

```bash
CREATE DATABASE tododb;
```

-   Дать права админа пользователю `testuser`

```bash
CREATE USER testuser WITH ENCRYPTED PASSWORD 'testcreds';

GRANT ALL PRIVILEGES ON DATABASE tododb TO testuser;
```

-   Заполнить БД тестовыми данными

```bash
knex migrate:latest
npx knex seed:run
```

-   Запуск

```bash
npm start
```

### С Docker

-   Запуск контейнера

```bash
sudo docker compose up
```

-   Миграции

```bash
sudo docker exec -it container_name /bin/sh
```

```bash
npx knex migrate:latest
npx knex run:seed
```

-   Для работы CORS нужно зайти с `localhost`

```bash
google-chrome http://localhost:8000
```

## Роуты

`/api/auth` - JSON авторизация

## Тестовые данные

### Ответственный

-   Логин `responsible`
-   Пароль `123`

-   Логин `responsible2`
-   Пароль `123`

-   Логин `responsible3`
-   Пароль `123`

-   Логин `responsible4`
-   Пароль `123`

### Руководитель

-   Логин `admin1`
-   Пароль `123`

-   Логин `admin2`
-   Пароль `123`
