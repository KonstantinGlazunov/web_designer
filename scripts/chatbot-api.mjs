#!/usr/bin/env node

const [, , ...args] = process.argv

function getArg(name, fallback) {
  const prefixed = `--${name}=`
  const found = args.find((arg) => arg.startsWith(prefixed))
  if (found) return found.slice(prefixed.length)
  const index = args.indexOf(`--${name}`)
  if (index >= 0 && args[index + 1]) return args[index + 1]
  return fallback
}

const baseUrl = getArg('base-url', 'https://erstellen-websiten.de')
const sessionId = getArg('session', `oc-${Date.now()}`)
const locale = getArg('locale', 'ru')
const message = getArg('message', '')
const raw = args.includes('--raw')

if (!message) {
  console.error('Usage: node scripts/chatbot-api.mjs --message "Иван" [--session demo-1] [--locale ru] [--base-url https://erstellen-websiten.de] [--raw]')
  process.exit(1)
}

const payload = { sessionId, message, locale }

const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/chat`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
})

const text = await response.text()

if (raw) {
  console.log(text)
  process.exit(response.ok ? 0 : 1)
}

let data
try {
  data = JSON.parse(text)
} catch {
  console.error(text)
  process.exit(1)
}

console.log(JSON.stringify({
  ok: response.ok,
  status: response.status,
  sessionId,
  reply: data.reply,
  options: data.options ?? [],
  brief: data.brief ?? null,
  error: data.error ?? null,
}, null, 2))

if (!response.ok) process.exit(1)
