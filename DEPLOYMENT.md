# Deployment Guide — ProgrammerSites (Oracle Cloud)

Деплой на Oracle Cloud VM **79.76.120.221** по аналогии с BewerbungAi (130.162.224.203).

## Требования

- Oracle Linux VM (пользователь `opc`)
- Node.js 18+ (устанавливается при первом деплое)
- Без Docker (слабый сервер)

## GitHub Secrets

В **Settings → Secrets and variables → Actions** добавь:

| Секрет       | Значение                                      |
|--------------|-----------------------------------------------|
| `VM_SSH_KEY` | Приватный SSH-ключ (содержимое `~/.ssh/id_ed25519`) |
| `VM_USER`    | `opc`                                         |
| `VM_HOST`    | `79.76.120.221`                               |

## Первоначальная настройка сервера

Подключись к серверу и установи Node.js:

```bash
ssh -i ~/.ssh/твой_ключ opc@79.76.120.221
```

Установка Node.js 20 (Oracle Linux):

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v   # должно быть v20.x
```

Создай `variables.env` с переменными окружения:

```bash
cd /home/opc/programmersites
cp variables.env.example variables.env
nano variables.env   # вставь OPENAI_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

Или скопируй с локальной машины (переименуй нужные переменные):

```bash
scp .env.local opc@79.76.120.221:/home/opc/programmersites/variables.env
```

## Автодеплой

При каждом `push` в `main` GitHub Actions:

1. Останавливает приложение
2. Копирует код через rsync
3. Запускает `./deploy.sh deploy` (build + start)

## Ручное управление

```bash
ssh opc@79.76.120.221 "/home/opc/programmersites/deploy.sh status"
ssh opc@79.76.120.221 "/home/opc/programmersites/deploy.sh deploy"
ssh opc@79.76.120.221 "/home/opc/programmersites/deploy.sh logs"
```

## Структура на сервере

```
/home/opc/programmersites/
├── .next/standalone/   # standalone-сборка
├── variables.env      # переменные (не в git)
├── app.pid
├── app.log
└── deploy.sh
```

## Ограничения памяти

- `NODE_OPTIONS=--max-old-space-size=512` при сборке
- Standalone output — минимальный размер деплоя

## Переменные окружения (variables.env)

- `OPENAI_API_KEY` — OpenAI API
- `TELEGRAM_BOT_TOKEN` — Telegram-бот
- `TELEGRAM_CHAT_ID` — ID чата
- `NEXT_PUBLIC_GA_ID` — Google Analytics (опционально)
- `PORT` — порт (по умолчанию 3000)

Приложение доступно по адресу: `http://79.76.120.221:3000`
