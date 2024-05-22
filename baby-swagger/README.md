# HTTP, Fetch API

## Домашнее задание

Имеется API – стандартный CRUD для сущности пользователя: 
- Получение списка пользователей GET /users
- Добавление пользователя POST /users
- Получение конкретного пользователя GET /users/{id}
- Обновление данных пользователя PUT /users/{id}
- Удаление пользователя DELETE /users/{id}
- Получение данных пользователя по email GET /Users/get-by-email/{email}

Необходимо разработать аналог интерфейса Swagger к данному API:
![1](https://github.com/LehaIvanov/2-baby-swagger/assets/13798121/7ad4a944-e68c-402d-80e1-2410dc8bf905)

Интерфейс должен предоставлять данные запроса и ответа. Например, для запроса PUT пользователь может ввести query-параметр и тело запроса в виде json-строки. После нажатия кнопки Execute пользователь должен увидеть в блоке ответа:
- Получившийся url запроса
- Код ответа
- Тело ответа
- Заголовки ответа
![2024-05-07_05-58-30](https://github.com/LehaIvanov/2-baby-swagger/assets/13798121/247d8f2d-fc38-42fb-917b-b6f3ff9aaa6f)

## Запуск приложения

Для запуска backend-а необходим .net 8 sdk.

1. Переходим в папку [Frontend-приложения](https://github.com/LehaIvanov/2-lab-baby-swagger/tree/main/Frontend/ClientApp), и запускаем в ней команду `npm install`
2. Затем запускаем файл [run.bat](https://github.com/LehaIvanov/2-lab-baby-swagger/blob/main/run.bat)
3. Должно запуститься 3 консоли: API, Frontent и vite-сервер
4. Далее в браузере открываем url [http://localhost:5006](http://localhost:5006), должно открыться приложение
5. Клиентский код находится в папке [Frontend/ClientApp](https://github.com/LehaIvanov/2-lab-baby-swagger/tree/main/Frontend/ClientApp)
