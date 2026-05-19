# Vibe Studio

Landing page and lead-capture experience for a web studio focused on small businesses in Germany. The project is built with Next.js App Router, Tailwind CSS, Framer Motion, a guided quiz flow, and an AI-assisted sales chat that structures leads and forwards updates to Telegram.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

## Local Development

1. Copy `.env.local.example` to `.env.local`.
2. Fill in the required environment variables.
3. Install dependencies with `npm install`.
4. Start the app with `npm run dev`.

Useful scripts:

- `npm run dev` — local development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — fast ESLint pass for app code
- `npm run lint:all` — full repository ESLint pass
- `npm run typecheck` — TypeScript checks
- `npm run test:e2e:smoke` — minimal Playwright smoke suite

## Environment Variables

Required for the AI sales flow:

- `OPENAI_API_KEY` — OpenAI API key for chat orchestration

Optional but recommended:

- `TELEGRAM_BOT_TOKEN` — Telegram bot token for lead notifications
- `TELEGRAM_CHAT_ID` — Telegram chat/group ID for notifications
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID

## Main Flows

### AI Sales Chat

- `POST /api/chat` — accepts a message, updates the brief, and returns the next assistant turn
- `GET /api/session?sessionId=...` — restores chat history and current brief
- `POST /api/finish` — marks the lead as ready

### Quiz Lead Form

- `POST /api/quiz` — sends a structured quiz summary to Telegram

## Architecture Notes

- `app/api/chat/route.ts` handles message validation, brief extraction, workflow orchestration, and notifications.
- `lib/sales-workflow.ts` contains the deterministic sales workflow layer.
- `lib/openai.ts` is used as an extraction/generation helper rather than the primary state machine.
- `lib/session-store.ts` provides the in-memory session store used during runtime.
- `lib/telegram.ts` formats and sends lead notifications.

## Quality and Safety

- Request validation is applied to chat/session/quiz endpoints.
- Session storage is cleaned up periodically to avoid unbounded in-memory growth.
- Security headers are configured in `next.config.ts`.
- Analytics load only when consent allows them.

## Deployment

The repository includes `deploy.sh`, `setup-server.sh`, and `DEPLOYMENT.md` for server setup and deployment notes. Review legal pages and placeholder company data before going live.
