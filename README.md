# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## AI-чат-бот

Чат-бот собирает техническое задание (бриф) на разработку сайта через диалог с клиентом.

### Переменные окружения (.env.local)

Скопируйте `.env.local.example` в `.env.local` и заполните:

- `OPENAI_API_KEY` — ключ OpenAI API
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота
- `TELEGRAM_CHAT_ID` — ID группы для уведомлений

### API

- `POST /api/chat` — отправка сообщения, получение ответа AI
- `POST /api/finish` — завершение брифа, отправка в Telegram
- `GET /api/session?sessionId=...` — получение истории сессии
