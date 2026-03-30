import type { Brief } from './brief'
import type { ChatMessage } from './session-store'

export type LeadStage =
  | 'greeting'
  | 'intent_detection'
  | 'qualification'
  | 'project_branch'
  | 'scope_capture'
  | 'budget_timeline'
  | 'contact_capture'
  | 'summary'
  | 'handoff'
  | 'done'

export type ProjectType =
  | 'landing'
  | 'corporate'
  | 'ecommerce'
  | 'booking'
  | 'redesign'
  | 'maintenance'
  | 'unknown'

export type ContactStatus = 'missing' | 'partial' | 'complete'
export type UserIntent = 'buy_service' | 'support' | 'portfolio' | 'price_check' | 'unknown'
export type PreferredContact = 'email' | 'phone' | 'whatsapp' | 'telegram' | 'unknown'

export interface SalesWorkflowState {
  stage: LeadStage
  turnCount: number
  userIntent: UserIntent
  projectType: ProjectType
  contactStatus: ContactStatus
  preferredContact: PreferredContact
  missingCriticalFields: string[]
  leadScore: number
  needsHuman: boolean
}

interface ManagedTurnArgs {
  brief: Brief
  previousMessages: ChatMessage[]
  userMessage: string
  locale: 'ru' | 'de'
}

export interface ManagedTurn {
  reply: string
  options?: string[]
  workflow: SalesWorkflowState
}

function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase()
}

function isDeferredAnswer(text: string) {
  return /^(предпочту позже|укажу в сообщении|schreibe ich in nachricht|lieber später)$/i.test(text.trim())
}

function isContactChannelPrompt(text: string) {
  return /где вам удобнее продолжить|где вам удобнее продолжить общение|wo ist es für sie am bequemsten|whatsapp|telegram|email|e-mail|почт/i.test(text)
}

function countRecentDeferredContactReplies(previousMessages: ChatMessage[], userMessage: string) {
  let count = isDeferredAnswer(userMessage) ? 1 : 0

  for (let i = previousMessages.length - 1; i > 0; i -= 1) {
    const current = previousMessages[i]
    const prev = previousMessages[i - 1]
    if (current.role !== 'user' || prev.role !== 'assistant') continue
    if (!isDeferredAnswer(current.content) || !isContactChannelPrompt(prev.content)) break
    count += 1
  }

  return count
}

function buildContactReasonReply(
  locale: 'ru' | 'de',
  preferredContact: PreferredContact
) {
  if (preferredContact === 'email') {
    return locale === 'de'
      ? 'Ich frage nach Ihrer E-Mail, damit ich Ihnen die Zusammenfassung und den nächsten Schritt sauber schicken kann. Welche E-Mail passt dafür?'
      : 'Спрашиваю электронную почту, чтобы отправить вам краткое резюме и следующий шаг по проекту. Какой адрес лучше использовать?'
  }

  const channel = preferredContact === 'telegram' ? 'Telegram' : 'WhatsApp'
  return locale === 'de'
    ? `Ich frage nach ${channel}, damit wir Ihnen das Angebot und die nächsten Schritte direkt schicken können. Welcher Kontakt passt dafür?`
    : `Спрашиваю ${channel}, чтобы отправить вам предложение и следующий шаг без потери диалога. Какой контакт лучше указать?`
}

function detectExplicitProjectType(text: string): ProjectType {
  const normalized = normalize(text)
  if (/редизайн|redesign/.test(normalized)) return 'redesign'
  if (/поддержк|wartung|maintenance/.test(normalized)) return 'maintenance'
  if (/интернет-магазин|online-shop|shop|e-?commerce/.test(normalized)) return 'ecommerce'
  if (/онлайн-запись|online-buchung|booking|сайт\s*\+\s*онлайн-запись|website\s*\+\s*online-buchung/.test(normalized)) return 'booking'
  if (/лендинг|landing/.test(normalized)) return 'landing'
  if (/сайт компании|unternehmensseite|corporate|company|просто сайт|обычн(?:ый|ая)? сайт|сайт для услуг|прост(?:ой|ая) сайт|не знаю формат|нужна помощь выбрать|einfache website|normale website|hilfe bei auswahl|hilfe beim auswählen/.test(normalized)) return 'corporate'
  return 'unknown'
}

function inferUserIntent(brief: Brief, userMessage: string): UserIntent {
  const text = normalize(`${brief.want_website} ${userMessage}`)
  if (brief.contact.name.trim() || brief.niche.trim() || brief.goals.length || brief.site_status.trim()) return 'buy_service'
  if (/поддержк|исправ|ошибк|bug|support|fix/.test(text)) return 'support'
  if (/портфолио|примеры|кейсы|portfolio|examples/.test(text)) return 'portfolio'
  if (/цена|стоимость|сколько|budget|preis|kosten/.test(text)) return 'price_check'
  if (/сайт|лендинг|магазин|booking|website|landing|shop/.test(text)) return 'buy_service'
  if (brief.want_website.trim()) return 'buy_service'
  return 'unknown'
}

function computeContactStatus(brief: Brief): ContactStatus {
  const hasName = Boolean(brief.contact?.name?.trim())
  const hasContact = Boolean(brief.contact?.phone?.trim() || brief.contact?.email?.trim())
  if (hasName && hasContact) return 'complete'
  if (hasName || hasContact) return 'partial'
  return 'missing'
}

function inferPreferredContact(previousMessages: ChatMessage[], userMessage: string, brief: Brief): PreferredContact {
  if (brief.contact?.email?.trim()) return 'email'
  if (brief.contact?.phone?.trim()) {
    const assistantText = [...previousMessages].reverse().find((msg) => msg.role === 'assistant')?.content ?? ''
    if (/telegram/i.test(`${assistantText} ${userMessage}`)) return 'telegram'
    if (/whatsapp/i.test(`${assistantText} ${userMessage}`)) return 'whatsapp'
    return 'phone'
  }

  const text = normalize(userMessage)
  if (text === 'whatsapp') return 'whatsapp'
  if (text === 'telegram') return 'telegram'
  if (/email|e-mail|электронная почта|почта/.test(text)) return 'email'

  for (let i = previousMessages.length - 1; i > 0; i -= 1) {
    const current = previousMessages[i]
    const prev = previousMessages[i - 1]
    if (current.role !== 'user' || prev.role !== 'assistant') continue
    if (!isContactChannelPrompt(prev.content)) continue

    const choice = normalize(current.content)
    if (choice === 'whatsapp') return 'whatsapp'
    if (choice === 'telegram') return 'telegram'
    if (/email|e-mail|электронная почта|почта/.test(choice)) return 'email'
  }

  return 'unknown'
}

function inferProjectType(brief: Brief, previousMessages: ChatMessage[], userMessage: string): ProjectType {
  const userHistory = [
    userMessage,
    ...previousMessages
      .filter((message) => message.role === 'user')
      .map((message) => message.content)
      .reverse(),
  ]

  for (const text of userHistory) {
    const explicitType = detectExplicitProjectType(text)
    if (explicitType !== 'unknown') return explicitType
  }

  const text = normalize(
    [
      brief.site_status,
      brief.niche,
      brief.goals.join(' '),
      brief.features.join(' '),
      brief.services.join(' '),
      userMessage,
    ].join(' ')
  )

  if (/редизайн|обнов|update|redesign/.test(text)) return 'redesign'
  if (/поддержк|support|maintenance/.test(text)) return 'maintenance'
  if (/магазин|shop|e-?commerce|продавать онлайн|оплат/.test(text)) return 'ecommerce'
  if (/запис|booking|appointment|calendar|календар/.test(text)) return 'booking'
  if (/лендинг|landing/.test(text)) return 'landing'
  if (/сайт компании|corporate|company/.test(text)) return 'corporate'

  if (brief.site_status && /обнов/.test(normalize(brief.site_status))) return 'redesign'
  if (brief.goals.some((goal) => /продавать|shop|e-?commerce/.test(normalize(goal)))) return 'ecommerce'
  if (brief.features.some((feature) => /запис|booking|calendar/.test(normalize(feature)))) return 'booking'
  if (brief.niche.trim() && brief.services.length > 1) return 'corporate'
  return 'unknown'
}

function getMissingCriticalFields(brief: Brief, projectType: ProjectType, contactStatus: ContactStatus) {
  const missing: string[] = []

  if (!brief.niche.trim()) missing.push('businessType')
  if (!brief.goals.length) missing.push('goals')
  if (projectType === 'unknown') missing.push('projectType')
  if (!brief.services.length) missing.push('services')
  if (!brief.features.length) missing.push('features')
  if (!brief.target_audience.trim()) missing.push('targetAudience')
  if (!brief.competitors.length) missing.push('competitors')
  if (!brief.usp.trim()) missing.push('usp')
  if (!brief.pain_points.length) missing.push('competitorGaps')
  if (!brief.design.references.length) missing.push('designRefs')
  if (!brief.extra_features.length) missing.push('extraFeatures')
  if (!brief.languages.length) missing.push('languages')
  if (!brief.design.style.trim()) missing.push('brandStyle')
  if (!brief.materials.length && !brief.content.has_images) missing.push('mediaAssets')
  if (!brief.profiles.length) missing.push('socialProfiles')
  if (!brief.budget.range.trim()) missing.push('budgetRange')
  if (!brief.deadline.trim()) missing.push('timeline')
  if (contactStatus !== 'complete') missing.push('contact')

  return missing
}

function calculateLeadScore(brief: Brief, projectType: ProjectType, contactStatus: ContactStatus, userIntent: UserIntent, turnCount: number) {
  let score = 0

  if (userIntent === 'buy_service') score += 20
  if (projectType !== 'unknown') score += 15
  if (brief.goals.length > 0) score += 10
  if (brief.features.length >= 2 || brief.features.length > 0) score += 10
  if (/3000|7000|\+/.test(brief.budget.range)) score += 15
  if (/сроч|urgent|1-2 нед|2-4/.test(normalize(brief.deadline))) score += 10
  if (contactStatus === 'complete') score += 20
  if (brief.site_status.trim()) score += 5
  if (turnCount > 12) score -= 5

  return Math.max(0, Math.min(score, 100))
}

function shouldMoveToContact(brief: Brief, userMessage: string) {
  const asksForCommercial = /сколько|цена|стоимость|срок|когда|созвон|budget|preis|kosten|call/i.test(userMessage)
  const hasEnoughValue = Boolean(
    brief.niche.trim() &&
    brief.goals.length &&
    brief.services.length &&
    brief.features.length &&
    (brief.budget.range.trim() || brief.deadline.trim())
  )

  return hasEnoughValue || asksForCommercial
}

function determineStage(brief: Brief, userIntent: UserIntent, projectType: ProjectType, contactStatus: ContactStatus, userMessage: string): LeadStage {
  if (userIntent === 'support' || userIntent === 'portfolio') return 'intent_detection'
  if (!brief.contact.name.trim()) return 'qualification'
  if (!brief.niche.trim() || !brief.business.location.trim() || !brief.goals.length || !brief.site_status.trim()) return 'qualification'
  if (projectType === 'unknown') return 'project_branch'
  if (!brief.services.length || !brief.features.length) return 'scope_capture'

  const discoveryMissing =
    !brief.target_audience.trim() ||
    !brief.competitors.length ||
    !brief.usp.trim() ||
    !brief.pain_points.length ||
    !brief.design.references.length ||
    !brief.extra_features.length ||
    !brief.languages.length ||
    !brief.design.style.trim() ||
    (!brief.materials.length && !brief.content.has_images) ||
    !brief.profiles.length ||
    !brief.budget.range.trim() ||
    !brief.deadline.trim()

  if (discoveryMissing) return 'budget_timeline'
  if (contactStatus !== 'complete' || shouldMoveToContact(brief, userMessage)) return contactStatus === 'complete' ? 'summary' : 'contact_capture'
  return 'summary'
}

function countAsked(messages: ChatMessage[], pattern: RegExp) {
  return messages.filter((msg) => msg.role === 'assistant' && pattern.test(msg.content)).length
}

function getNicheOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Friseursalon', 'Handwerk und Reparatur', 'Praxis oder Medizin', 'Kfz-Werkstatt']
    : ['Салон красоты', 'Строительство и ремонт', 'Медицинский центр', 'Автомастерская']
}

function getRegionOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Berlin, Muenchen oder Hamburg', 'Koeln, Frankfurt oder Stuttgart', 'Umland einer Grossstadt', 'Deutschlandweit']
    : ['Берлин, Мюнхен или Гамбург', 'Кёльн, Франкфурт или Штутгарт', 'Пригород крупного города', 'Работаю по всей Германии']
}

function getGoalOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Direkte Verkäufe', 'Leads sammeln', 'Image-Website', 'Preise und Leistungen informieren']
    : ['Прямые продажи', 'Сбор заявок/лидов', 'Визитка для имиджа', 'Информирование о ценах и услугах']
}

function getProjectTypeOptions(locale: 'ru' | 'de', hasExistingSite: boolean) {
  if (locale === 'de') {
    return hasExistingSite
      ? ['Redesign', 'Unternehmensseite', 'Online-Shop', 'Wartung']
      : ['Landingpage', 'Unternehmensseite', 'Online-Shop', 'Online-Buchung']
  }

  return hasExistingSite
    ? ['Редизайн', 'Сайт компании', 'Интернет-магазин', 'Поддержка']
    : ['Лендинг', 'Сайт компании', 'Интернет-магазин', 'Онлайн-запись']
}

function getProjectTypeHelperOptions(locale: 'ru' | 'de', hasExistingSite: boolean) {
  if (locale === 'de') {
    return hasExistingSite
      ? ['Einfach eine Firmen-Website', 'Website + Online-Buchung', 'Online-Shop', 'Bestehende Website aktualisieren']
      : ['Einfach eine Firmen-Website', 'Website + Online-Buchung', 'Online-Shop', 'Ich brauche Hilfe bei der Auswahl']
  }

  return hasExistingSite
    ? ['Просто сайт для услуг', 'Сайт + онлайн-запись', 'Интернет-магазин', 'Обновить текущий сайт']
    : ['Просто сайт для услуг', 'Сайт + онлайн-запись', 'Интернет-магазин', 'Нужна помощь выбрать']
}

function getSiteStatusOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Noch keine Website, wir starten neu', 'Die Website ist veraltet und bringt keine Anfragen', 'Website aktualisieren oder Funktionen erweitern', 'Bisher nur soziale Netzwerke oder Google-Unternehmensprofil']
    : ['Сайта пока нет, нужен с нуля', 'Сайт есть, но старый и не приносит заявок', 'Сайт есть, хочу обновить или добавить функционал', 'Пока есть только соцсети или профиль в Google']
}

function getBudgetOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['< 1000€', '1000-3000€', '3000-7000€', '7000€+']
    : ['До 1000€', '1000-3000€', '3000-7000€', '7000€+']
}

function getTimelineOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Dringend', '2-4 Wochen', '1-2 Monate', 'Flexibel']
    : ['Срочно', '2-4 недели', '1-2 месяца', 'Гибко']
}

function getFeatureOptions(projectType: ProjectType, locale: 'ru' | 'de') {
  const options = locale === 'de'
    ? {
        landing: ['Lead-Formular', 'Quiz', 'Mehrsprachig', 'Schneller Start'],
        corporate: ['Texte und News selbst bearbeiten', 'Beispiele und Bewertungen zeigen', 'Website in zwei Sprachen', 'Besser in Google gefunden werden'],
        ecommerce: ['Online-Zahlung', 'Katalog', 'Lieferung', 'CRM-Integration'],
        booking: ['Online-Buchung', 'Kalender', 'Erinnerungen', 'Online-Zahlung'],
        redesign: ['Neues Design', 'Inhalte uebernehmen', 'SEO erhalten', 'Aktuelles CMS behalten'],
        maintenance: ['Fehler beheben', 'Inhalte pflegen', 'Neue Blöcke', 'Performance'],
        unknown: ['Online-Buchung', 'Preisliste', 'Galerie', 'Kontaktformular'],
      }
    : {
        landing: ['Форма заявки', 'Квиз', 'Мультиязычность', 'Быстрый запуск'],
        corporate: ['Самостоятельно менять тексты и новости', 'Показывать примеры работ и отзывы', 'Сайт на двух языках', 'Чтобы сайт лучше находили в Google'],
        ecommerce: ['Онлайн-оплата', 'Каталог', 'Доставка', 'Интеграция с CRM'],
        booking: ['Онлайн-запись', 'Календарь', 'Напоминания', 'Онлайн-оплата'],
        redesign: ['Новый дизайн', 'Перенос контента', 'Сохранить SEO', 'Оставить текущую систему управления'],
        maintenance: ['Исправления', 'Обновление контента', 'Новые блоки', 'Ускорение сайта'],
        unknown: ['Онлайн-запись', 'Прайс', 'Галерея работ', 'Форма заявки'],
      }

  return options[projectType]
}

function getServiceOptions(niche: string, locale: 'ru' | 'de') {
  const text = normalize(niche)
  if (/авто|сто|werkstatt|auto/.test(text)) {
    return locale === 'de'
      ? ['Fahrwerk-Reparatur', 'Karosserie-Reparatur', 'Motor-Reparatur', 'Getriebe-Reparatur']
      : ['Ремонт ходовой', 'Кузовной ремонт', 'Ремонт двигателя', 'Ремонт трансмиссии']
  }
  if (/парикмах|salon|friseur/.test(text)) {
    return locale === 'de'
      ? ['Haarschnitte', 'Coloration', 'Styling', 'Pflege']
      : ['Стрижки', 'Окрашивание', 'Укладка', 'Уход']
  }
  if (/юрист|юрид|прав|anwalt|kanzlei/.test(text)) {
    return locale === 'de'
      ? ['Beratung', 'Vertragsrecht', 'Arbeitsrecht', 'Vertretung']
      : ['Консультации', 'Договорное право', 'Трудовые споры', 'Представительство']
  }
  return locale === 'de'
    ? ['Beratung', 'Verkauf', 'Service', 'Montage']
    : ['Консультации', 'Продажа', 'Сервис', 'Монтаж']
}

function getExtraFeatureOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Online-Buchung oder Reservierung', 'Kostenrechner', 'Persönliches Konto', 'Seitensuche und Filter', 'Kein spezieller Zusatz']
    : ['Онлайн-запись или бронирование', 'Калькулятор стоимости услуг', 'Личный кабинет пользователя', 'Поиск по сайту и фильтры', 'Без спецфункций']
}

function getLanguageOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Eine Sprache', 'Zwei Sprachen', 'Drei und mehr Sprachen']
    : ['Один язык', 'Два языка', 'Три и более языков']
}

function getBrandStyleOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Ja, alles ist vorhanden', 'Teilweise vorhanden', 'Nein, wir entwickeln es von null']
    : ['Да, все есть', 'Есть частично', 'Нет, делаем с нуля']
}

function getMediaAssetOptions(locale: 'ru' | 'de') {
  return locale === 'de'
    ? ['Ja, Fotos und Videos sind bereit', 'Teilweise vorhanden', 'Nein, wir brauchen Produktion']
    : ['Да, фото и видео готовы', 'Есть частично', 'Нет, нужна съемка']
}

function buildSummaryReply(brief: Brief, locale: 'ru' | 'de') {
  const namePart = brief.contact.name.trim() ? `${brief.contact.name}, ` : ''
  return locale === 'de'
    ? `${namePart}perfekt. Ich habe die Grundlage: ${brief.niche || 'Projekt'}, Ziel ${brief.goals[0] || 'haben wir geklaert'}, Budget ${brief.budget.range || 'klaeren wir im Detail'}. Ich melde mich mit einem konkreten Vorschlag bei Ihnen.`
    : `${namePart}отлично. Базу по проекту я собрал: ${brief.niche || 'проект'}, цель ${brief.goals[0] || 'уточнили'}, бюджет ${brief.budget.range || 'обсудим отдельно'}. Дальше вернусь к вам с конкретным предложением.`
}

export function isReadyForHandoff(brief: Brief) {
  const hasContact = Boolean(brief.contact.name.trim() && (brief.contact.phone.trim() || brief.contact.email.trim()))
  const commercialSignals = [
    brief.niche.trim(),
    brief.site_status.trim(),
    brief.goals[0] ?? '',
    brief.services[0] ?? '',
    brief.features[0] ?? '',
    brief.budget.range.trim(),
    brief.deadline.trim(),
  ].filter(Boolean).length

  return hasContact && commercialSignals >= 5
}

export function deriveSalesWorkflowState(
  brief: Brief,
  previousMessages: ChatMessage[],
  userMessage: string
): SalesWorkflowState {
  const turnCount = previousMessages.filter((msg) => msg.role === 'user').length + 1
  const userIntent = inferUserIntent(brief, userMessage)
  const projectType = inferProjectType(brief, previousMessages, userMessage)
  const contactStatus = computeContactStatus(brief)
  const preferredContact = inferPreferredContact(previousMessages, userMessage, brief)
  const stage = determineStage(brief, userIntent, projectType, contactStatus, userMessage)
  const missingCriticalFields = getMissingCriticalFields(brief, projectType, contactStatus)
  const leadScore = calculateLeadScore(brief, projectType, contactStatus, userIntent, turnCount)
  const needsHuman = turnCount > 18 || leadScore >= 80

  return {
    stage,
    turnCount,
    userIntent,
    projectType,
    contactStatus,
    preferredContact,
    missingCriticalFields,
    leadScore,
    needsHuman,
  }
}

export function buildManagedSalesTurn(args: ManagedTurnArgs): ManagedTurn | null {
  const { brief, previousMessages, userMessage, locale } = args
  const workflow = deriveSalesWorkflowState(brief, previousMessages, userMessage)
  const deferredContactCount = countRecentDeferredContactReplies(previousMessages, userMessage)

  if (!['buy_service', 'price_check', 'unknown'].includes(workflow.userIntent)) {
    return null
  }

  if (workflow.stage === 'summary' && isReadyForHandoff(brief)) {
    return {
      reply: buildSummaryReply(brief, locale),
      workflow,
    }
  }

  if (workflow.stage === 'intent_detection') {
    return {
      reply: locale === 'de'
        ? 'Damit ich Sie sauber beraten kann: Welche Art Website ist für Sie gerade am ehesten relevant?'
        : 'Чтобы предложить вам подходящий формат, подскажите: какой сайт вам сейчас ближе всего?',
      options: getProjectTypeOptions(locale, false),
      workflow,
    }
  }

  if (workflow.stage === 'qualification') {
    if (!brief.contact.name.trim()) {
      const namePromptCount = countAsked(previousMessages, /wie darf ich sie ansprechen|как я могу к вам обращаться|ваше имя|ihr name/i)
      return {
        reply: locale === 'de'
          ? namePromptCount > 0
            ? 'Danke. Nennen Sie mir bitte nur Ihren Vornamen, damit ich das Projekt korrekt anlegen kann.'
            : 'Guten Tag! Ich bin Max Webberater und helfe kleinen Unternehmen in Deutschland, Kunden ueber Websites zu gewinnen. Wie darf ich Sie ansprechen?'
          : namePromptCount > 0
            ? 'Спасибо. Напишите, пожалуйста, только ваше имя, чтобы я корректно оформил проект.'
            : 'Здравствуйте! Меня зовут Max Webberater, я помогаю малому бизнесу в Германии получать клиентов через сайты. Подскажите, пожалуйста, как я могу к вам обращаться?',
        workflow,
      }
    }

    if (!brief.niche.trim()) {
      return {
        reply: locale === 'de'
          ? `${brief.contact.name}, angenehm. Damit ich nichts Unnoetiges anbiete: In welcher Branche arbeiten Sie?`
          : `${brief.contact.name}, приятно познакомиться. Чтобы не предлагать лишнего, подскажите, чем вы занимаетесь?`,
        options: getNicheOptions(locale),
        workflow,
      }
    }

    if (!brief.business.location.trim()) {
      return {
        reply: locale === 'de'
          ? `${brief.contact.name}, in welcher Stadt oder Region in Deutschland arbeiten Sie? Das ist wichtig fuer lokales SEO und Google Business Profile.`
          : `${brief.contact.name}, в каком городе или регионе Германии вы работаете? Это важно для локального SEO и профиля компании в Google.`,
        options: getRegionOptions(locale),
        workflow,
      }
    }

    if (!brief.goals.length) {
      return {
        reply: locale === 'de'
          ? `${brief.contact.name}, welche Hauptaufgabe soll die Website fuer Ihr Geschaeft loesen?`
          : `${brief.contact.name}, какая сейчас главная задача сайта для вашего бизнеса?`,
        options: getGoalOptions(locale),
        workflow,
      }
    }

    if (!brief.site_status.trim()) {
      return {
        reply: locale === 'de'
          ? `${brief.contact.name}, haben Sie schon eine Website oder sprechen wir ueber einen Start von null?`
          : `${brief.contact.name}, скажите, у вас уже есть сайт или мы говорим о запуске с нуля?`,
        options: getSiteStatusOptions(locale),
        workflow,
      }
    }
  }

  if (workflow.stage === 'project_branch') {
    const hasExistingSite = /уже есть|обнов|vorhanden|aktualisieren|already exists/i.test(brief.site_status)
    const askedCount = countAsked(previousMessages, /лендинг|landingpage|редизайн|online-shop|интернет-магазин|формат сайта|welches format/i)

    if (askedCount > 0) {
      return {
        reply: locale === 'de'
          ? 'Das ist vollkommen normal - Sie muessen keine Website-Formate kennen. Sagen Sie einfach, was Ihnen naeher ist, ich waehle die passende Struktur fuer Sie.'
          : 'Это абсолютно нормально, вам не нужно разбираться в форматах сайта. Просто выберите, что вам ближе, а структуру я подберу сам.',
        options: getProjectTypeHelperOptions(locale, hasExistingSite),
        workflow,
      }
    }

    return {
      reply: locale === 'de'
        ? 'Welches Format passt für Ihr Projekt am besten?'
        : 'Какой формат сайта для вашего проекта подходит лучше всего?',
      options: getProjectTypeOptions(locale, hasExistingSite),
      workflow,
    }
  }

  if (workflow.stage === 'scope_capture') {
    if (!brief.services.length) {
      return {
        reply: locale === 'de'
          ? 'Welche Leistungen oder Angebote sollen wir auf der Website zuerst zeigen?'
          : 'Какие услуги или направления нужно показать на сайте в первую очередь?',
        options: getServiceOptions(brief.niche, locale),
        workflow,
      }
    }

    if (!brief.features.length) {
      return {
        reply: locale === 'de'
          ? 'Welche praktische Funktion ist für Sie am wichtigsten?'
          : 'Какая практическая функция для вас на сайте наиболее важна?',
        options: getFeatureOptions(workflow.projectType, locale),
        workflow,
      }
    }
  }

  if (workflow.stage === 'budget_timeline') {
    if (!brief.target_audience.trim()) {
      return {
        reply: locale === 'de'
          ? 'Wer ist Ihr idealer Kunde? Beschreiben Sie kurz Alter, Bedarf und warum er gerade Sie wählt.'
          : 'Кто ваш идеальный клиент? Коротко опишите возраст, боли и почему выбирают именно вас.',
        workflow,
      }
    }

    if (!brief.competitors.length) {
      return {
        reply: locale === 'de'
          ? 'Nennen Sie bitte Ihre wichtigsten Wettbewerber.'
          : 'Назовите своих конкурентов.',
        workflow,
      }
    }

    if (!brief.usp.trim()) {
      return {
        reply: locale === 'de'
          ? 'Was ist Ihr USP? Worin sind Sie besser als die Konkurrenz?'
          : 'В чем ваше уникальное торговое предложение (УТП)? Чем вы лучше конкурентов?',
        workflow,
      }
    }

    if (!brief.pain_points.length) {
      return {
        reply: locale === 'de'
          ? 'Und in welchen Punkten sind Wettbewerber aktuell stärker als Sie?'
          : 'Чем конкуренты лучше вас?',
        workflow,
      }
    }

    if (!brief.design.references.length) {
      return {
        reply: locale === 'de'
          ? 'Welche 3-5 Wettbewerber-Websites gefallen Ihnen? Was genau gefällt: Design, UX oder Funktionen?'
          : 'Какие 3–5 сайтов конкурентов вам нравятся? Что именно нравится: дизайн, удобство или функции?',
        workflow,
      }
    }

    if (!brief.extra_features.length) {
      return {
        reply: locale === 'de'
          ? 'Brauchen Sie spezifische Zusatzfunktionen?'
          : 'Нужен ли специфический функционал?',
        options: getExtraFeatureOptions(locale),
        workflow,
      }
    }

    if (!brief.languages.length) {
      return {
        reply: locale === 'de'
          ? 'Auf wie vielen Sprachen soll die Website sein?'
          : 'На скольких языках будет сайт?',
        options: getLanguageOptions(locale),
        workflow,
      }
    }

    if (!brief.design.style.trim()) {
      return {
        reply: locale === 'de'
          ? 'Haben Sie bereits einen Brand-Style (Logo, Brandbook, Schriften, Farben)?'
          : 'Есть ли у вас готовый фирменный стиль? (Логотип, брендбук, шрифты, цвета).',
        options: getBrandStyleOptions(locale),
        workflow,
      }
    }

    if (!brief.materials.length && !brief.content.has_images) {
      return {
        reply: locale === 'de'
          ? 'Haben Sie hochwertige Foto- und Videomaterialien?'
          : 'Есть ли у вас качественные фото и видеоматериалы?',
        options: getMediaAssetOptions(locale),
        workflow,
      }
    }

    if (!brief.profiles.length) {
      return {
        reply: locale === 'de'
          ? 'Ist Ihr Unternehmen in sozialen Netzwerken präsent? Senden Sie bitte Links.'
          : 'Представлена ли ваша компания в соцсетях? Пришлите ссылки.',
        workflow,
      }
    }

    if (!brief.budget.range.trim()) {
      return {
        reply: locale === 'de'
          ? 'Damit ich realistisch beraten kann: In welchem Budgetrahmen sehen Sie das Projekt?'
          : 'Чтобы сориентировать вас реалистично, в каком бюджете вы рассматриваете проект?',
        options: getBudgetOptions(locale),
        workflow,
      }
    }

    if (!brief.deadline.trim()) {
      return {
        reply: locale === 'de'
          ? 'Und wann möchten Sie idealerweise mit der Website an den Start gehen?'
          : 'И в какие сроки вам в идеале нужен запуск?',
        options: getTimelineOptions(locale),
        workflow,
      }
    }
  }

  if (workflow.stage === 'contact_capture') {
    if (deferredContactCount >= 2) {
      return {
        reply: locale === 'de'
          ? 'Verstanden. Ich habe die Projektdaten schon notiert. Wenn es für Sie passt, schicken Sie den Kontakt einfach später in einer Nachricht nach.'
          : 'Понял. Основные данные по проекту я уже зафиксировал. Когда вам будет удобно, просто пришлите контакт следующим сообщением.',
        workflow,
      }
    }

    if (workflow.preferredContact === 'email' && !brief.contact.email.trim()) {
      return {
        reply: locale === 'de'
          ? deferredContactCount === 1
            ? buildContactReasonReply(locale, workflow.preferredContact)
            : 'Schicken Sie mir bitte Ihre E-Mail, und ich bereite den nächsten Schritt für Sie vor.'
          : deferredContactCount === 1
            ? buildContactReasonReply(locale, workflow.preferredContact)
            : 'Тогда напишите, пожалуйста, вашу электронную почту, и я подготовлю для вас следующий шаг.',
        options: locale === 'de' ? ['Schreibe ich in Nachricht', 'Lieber später'] : ['Укажу в сообщении', 'Предпочту позже'],
        workflow,
      }
    }

    if (['whatsapp', 'telegram', 'phone'].includes(workflow.preferredContact) && !brief.contact.phone.trim()) {
      return {
        reply: locale === 'de'
          ? deferredContactCount === 1
            ? buildContactReasonReply(locale, workflow.preferredContact)
            : `Perfekt. Dann schicken Sie bitte den Kontakt für ${workflow.preferredContact === 'telegram' ? 'Telegram' : 'WhatsApp'}.`
          : deferredContactCount === 1
            ? buildContactReasonReply(locale, workflow.preferredContact)
            : `Отлично. Тогда пришлите, пожалуйста, контакт для ${workflow.preferredContact === 'telegram' ? 'Telegram' : 'WhatsApp'}.`,
        options: locale === 'de' ? ['Schreibe ich in Nachricht', 'Lieber später'] : ['Укажу в сообщении', 'Предпочту позже'],
        workflow,
      }
    }

    if (!brief.contact.phone.trim() && !brief.contact.email.trim()) {
      return {
        reply: locale === 'de'
          ? 'Jetzt habe ich schon genug Kontext. Wo ist es für Sie am bequemsten, wenn wir den Kontakt fortsetzen?'
          : 'Сейчас у меня уже есть понятная картина по проекту. Где вам удобнее продолжить общение?',
        options: locale === 'de' ? ['WhatsApp', 'Telegram', 'E-Mail'] : ['WhatsApp', 'Telegram', 'Электронная почта'],
        workflow,
      }
    }

    if (!brief.contact.name.trim()) {
      return {
        reply: locale === 'de'
          ? 'Damit ich Sie korrekt im Projekt notiere: Wie darf ich Sie ansprechen?'
          : 'Чтобы я корректно зафиксировал ваш проект, как я могу к вам обращаться?',
        options: locale === 'de' ? ['Schreibe ich in Nachricht', 'Lieber später'] : ['Укажу в сообщении', 'Предпочту позже'],
        workflow,
      }
    }
  }

  return {
    reply: locale === 'de'
      ? 'Ich habe den Kern verstanden. Wenn es für Sie passt, gehe ich jetzt zum nächsten praktischen Schritt.'
      : 'Базовую картину я уже собрал. Если вам подходит, перехожу к следующему практическому шагу.',
    workflow,
  }
}
