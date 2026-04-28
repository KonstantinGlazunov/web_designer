import type { LucideIcon } from 'lucide-react'
import {
  CalendarCheck,
  FileText,
  Image,
  MessageCircle,
  MoreHorizontal,
  Package,
  Palette,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'

export const HAS_SITE_IDS = ['outdated', 'broken', 'redo'] as const

export interface QuizOption {
  id: string
  label: string
  icon: LucideIcon
}

export interface QuizQuestion {
  id: string
  question: string
  options?: QuizOption[]
  multiSelect?: boolean
  type?: 'cards' | 'input'
  inputPlaceholder?: string
}

export interface QuizCopy {
  stepLabel: (current: number, total: number) => string
  multiSelectHint: string
  close: string
  back: string
  next: string
  submittedTitle: string
  submittedText: string
  questions: QuizQuestion[]
  final: {
    title: string
    subtitle: string
    benefits: string[]
    locationLabel: string
    nameLabel: string
    whatsappLabel: string
    whatsappPlaceholder: string
    submitButton: string
  }
  followUps: {
    otherSpecify: string
    otherPlaceholder: string
    siteUrl: string
    siteUrlPlaceholder: string
  }
}

function createQuizCopy(ru: QuizCopy, de: QuizCopy): { ru: QuizCopy; de: QuizCopy } {
  return { ru, de }
}

export const quizCopy = createQuizCopy(
  {
    stepLabel: (current, total) => `Шаг ${current} из ${total}`,
    multiSelectHint: 'Можно выбрать несколько вариантов',
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    submittedTitle: 'Заявка отправлена!',
    submittedText: 'Мы свяжемся с вами в ближайшее время.',
    questions: [
      {
        id: 'business',
        question: 'Что лучше всего описывает ваш бизнес?',
        options: [
          { id: 'services', label: 'Локальный сервис / ремесло', icon: Wrench },
          { id: 'beauty', label: 'Бьюти / здоровье', icon: Sparkles },
          { id: 'gastro', label: 'Гастрономия', icon: UtensilsCrossed },
          { id: 'shop', label: 'Торговля / интернет-магазин', icon: ShoppingCart },
          { id: 'office', label: 'Консалтинг / офис', icon: FileText },
          { id: 'other', label: 'Другое', icon: MoreHorizontal },
        ],
      },
      {
        id: 'functions',
        question: 'Что сайт должен дать в первую очередь?',
        multiSelect: true,
        options: [
          { id: 'leads', label: 'Больше заявок', icon: MessageCircle },
          { id: 'trust', label: 'Больше доверия', icon: Sparkles },
          { id: 'services', label: 'Понятно показать услуги', icon: Package },
          { id: 'booking', label: 'Записи / бронирования', icon: CalendarCheck },
          { id: 'shop', label: 'Продавать товары', icon: ShoppingBag },
          { id: 'notsure', label: 'Пока не уверен', icon: MoreHorizontal },
        ],
      },
      {
        id: 'current_site',
        question: 'Какая ситуация сейчас подходит лучше всего?',
        options: [
          { id: 'none', label: 'Сайта пока нет', icon: Store },
          { id: 'outdated', label: 'Сайт есть, но выглядит устаревшим', icon: Store },
          { id: 'broken', label: 'Сайт есть, но даёт мало заявок', icon: Store },
          { id: 'redo', label: 'Хочу собрать сайт заново', icon: Store },
        ],
      },
      {
        id: 'content',
        question: 'Что уже есть?',
        multiSelect: true,
        options: [
          { id: 'texts', label: 'Тексты', icon: FileText },
          { id: 'media', label: 'Фото / видео', icon: Image },
          { id: 'brand', label: 'Логотип / дизайн', icon: Palette },
          { id: 'nothing', label: 'Пока ничего нет', icon: Package },
        ],
      },
      {
        id: 'location',
        question: 'В каком городе или регионе находится ваш бизнес?',
        type: 'input',
        inputPlaceholder: 'Город или регион',
      },
    ],
    final: {
      title: 'Ваша короткая оценка почти готова',
      subtitle: 'Оставьте контакт, и вы получите:',
      benefits: ['подходящую структуру сайта', 'ясную рекомендацию следующего шага', 'честную оценку без сложных терминов'],
      locationLabel: 'Город / регион',
      nameLabel: 'Имя',
      whatsappLabel: 'WhatsApp или телефон',
      whatsappPlaceholder: '+7 999 123-45-67',
      submitButton: 'Получить бесплатную оценку',
    },
    followUps: {
      otherSpecify: 'Коротко опишите (необязательно)',
      otherPlaceholder: 'Опишите кратко',
      siteUrl: 'Какой адрес у вашего текущего сайта?',
      siteUrlPlaceholder: 'https://example.de',
    },
  },
  {
    stepLabel: (current, total) => `Schritt ${current} von ${total}`,
    multiSelectHint: 'Mehrfachauswahl möglich',
    close: 'Schließen',
    back: 'Zurück',
    next: 'Weiter',
    submittedTitle: 'Anfrage gesendet!',
    submittedText: 'Wir melden uns in Kürze bei Ihnen.',
    questions: [
      {
        id: 'business',
        question: 'Was beschreibt Ihr Unternehmen am besten?',
        options: [
          { id: 'services', label: 'Handwerk / lokale Dienste', icon: Wrench },
          { id: 'beauty', label: 'Beauty / Gesundheit', icon: Sparkles },
          { id: 'gastro', label: 'Gastronomie', icon: UtensilsCrossed },
          { id: 'shop', label: 'Handel / Online-Shop', icon: ShoppingCart },
          { id: 'office', label: 'Beratung / Büro', icon: FileText },
          { id: 'other', label: 'Sonstiges', icon: MoreHorizontal },
        ],
      },
      {
        id: 'functions',
        question: 'Was soll Ihre Website in erster Linie erreichen?',
        multiSelect: true,
        options: [
          { id: 'leads', label: 'Mehr Anfragen', icon: MessageCircle },
          { id: 'trust', label: 'Mehr Vertrauen', icon: Sparkles },
          { id: 'services', label: 'Leistungen klar zeigen', icon: Package },
          { id: 'booking', label: 'Termine / Reservierungen', icon: CalendarCheck },
          { id: 'shop', label: 'Produkte verkaufen', icon: ShoppingBag },
          { id: 'notsure', label: 'Ich bin noch nicht sicher', icon: MoreHorizontal },
        ],
      },
      {
        id: 'current_site',
        question: 'Welche Situation passt aktuell am besten?',
        options: [
          { id: 'none', label: 'Ich habe noch keine Website', icon: Store },
          { id: 'outdated', label: 'Ich habe eine Website, aber sie wirkt veraltet', icon: Store },
          { id: 'broken', label: 'Ich habe eine Website, aber sie bringt wenig', icon: Store },
          { id: 'redo', label: 'Ich möchte meine Website neu aufbauen', icon: Store },
        ],
      },
      {
        id: 'content',
        question: 'Was ist bereits vorhanden?',
        multiSelect: true,
        options: [
          { id: 'texts', label: 'Texte', icon: FileText },
          { id: 'media', label: 'Fotos / Videos', icon: Image },
          { id: 'brand', label: 'Logo / Design', icon: Palette },
          { id: 'nothing', label: 'Noch nichts vorhanden', icon: Package },
        ],
      },
      {
        id: 'location',
        question: 'In welcher Stadt oder Region ist Ihr Unternehmen?',
        type: 'input',
        inputPlaceholder: 'Stadt oder Region',
      },
    ],
    final: {
      title: 'Ihre kurze Einschätzung ist fast fertig',
      subtitle: 'Hinterlassen Sie Ihren Kontakt und Sie erhalten:',
      benefits: [
        'eine passende Seitenstruktur',
        'eine klare Empfehlung für den nächsten Schritt',
        'eine ehrliche Einschätzung ohne Fachsprache',
      ],
      locationLabel: 'Stadt / Region',
      nameLabel: 'Name',
      whatsappLabel: 'WhatsApp oder Telefonnummer',
      whatsappPlaceholder: '+49 170 1234567',
      submitButton: 'Kostenlose Einschätzung erhalten',
    },
    followUps: {
      otherSpecify: 'Kurz beschreiben (optional)',
      otherPlaceholder: 'Kurz beschreiben',
      siteUrl: 'Wie lautet die Adresse Ihrer aktuellen Website?',
      siteUrlPlaceholder: 'https://example.de',
    },
  }
)
