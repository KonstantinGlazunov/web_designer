import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  CalendarCheck,
  CreditCard,
  FileText,
  Image,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Package,
  Palette,
  Pill,
  Pizza,
  Scissors,
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
    submittedText: 'Свяжемся с вами в ближайшее время.',
    questions: [
      {
        id: 'business',
        question: 'Для какого бизнеса вы хотите сделать сайт?',
        options: [
          { id: 'beauty', label: 'Бьюти-салон', icon: Sparkles },
          { id: 'hair', label: 'Парикмахерская', icon: Scissors },
          { id: 'cosmetology', label: 'Косметолог / эстетическая клиника', icon: Sparkles },
          { id: 'art', label: 'Художественная студия / галерея', icon: Palette },
          { id: 'restaurant', label: 'Ресторан / кафе', icon: UtensilsCrossed },
          { id: 'fastfood', label: 'Донер / фаст-фуд', icon: Pizza },
          { id: 'pharmacy', label: 'Аптека', icon: Pill },
          { id: 'onlineshop', label: 'Онлайн-магазин', icon: ShoppingCart },
          { id: 'services', label: 'Услуги (ремонт, сантехника, электрик)', icon: Wrench },
          { id: 'other', label: 'Другое', icon: MoreHorizontal },
        ],
      },
      {
        id: 'functions',
        question: 'Какие функции должен выполнять сайт?',
        multiSelect: true,
        options: [
          { id: 'booking', label: 'Назначать термин / запись онлайн', icon: CalendarCheck },
          { id: 'leads', label: 'Принимать заявки клиентов', icon: MessageCircle },
          { id: 'services', label: 'Показывать услуги и цены', icon: Package },
          { id: 'payment', label: 'Онлайн-оплата', icon: CreditCard },
          { id: 'shop', label: 'Интернет-магазин', icon: ShoppingBag },
          { id: 'catalog', label: 'Каталог товаров', icon: Package },
          { id: 'reservation', label: 'Бронирование', icon: Calendar },
          { id: 'maps', label: 'Интеграция с Google Maps', icon: MapPin },
          { id: 'messenger', label: 'WhatsApp / Telegram кнопка', icon: MessageCircle },
          { id: 'other', label: 'Другое', icon: MoreHorizontal },
        ],
      },
      {
        id: 'current_site',
        question: 'Есть ли у вас сайт сейчас?',
        options: [
          { id: 'none', label: 'Нет, нужен новый', icon: Store },
          { id: 'outdated', label: 'Есть, но устарел', icon: Store },
          { id: 'broken', label: 'Есть, но плохо работает', icon: Store },
          { id: 'redo', label: 'Хочу полностью переделать', icon: Store },
        ],
      },
      {
        id: 'location',
        question: 'Где находится ваш бизнес?',
        type: 'input',
        inputPlaceholder: 'Город или регион',
      },
      {
        id: 'content',
        question: 'Есть ли у вас материалы для сайта?',
        multiSelect: true,
        options: [
          { id: 'texts', label: 'Тексты готовы', icon: FileText },
          { id: 'media', label: 'Есть фото / видео', icon: Image },
          { id: 'brand', label: 'Есть логотип и фирменный стиль', icon: Palette },
          { id: 'nothing', label: 'Ничего нет, нужно сделать', icon: Package },
        ],
      },
    ],
    final: {
      title: 'Я подготовлю идею вашего сайта',
      subtitle: 'Вы получите:',
      benefits: ['структуру сайта', 'пример дизайна', 'пример страницы'],
      locationLabel: 'Город / регион',
      nameLabel: 'Имя',
      whatsappLabel: 'WhatsApp',
      whatsappPlaceholder: '+7 999 123-45-67',
      submitButton: 'Получить идею сайта',
    },
    followUps: {
      otherSpecify: 'Что именно имеется в виду?',
      otherPlaceholder: 'Опишите кратко',
      siteUrl: 'Укажите адрес текущего сайта',
      siteUrlPlaceholder: 'https://example.com',
    },
  },
  {
    stepLabel: (current, total) => `Schritt ${current} von ${total}`,
    multiSelectHint: 'Mehrere Optionen moeglich',
    close: 'Schliessen',
    back: 'Zurueck',
    next: 'Weiter',
    submittedTitle: 'Anfrage gesendet!',
    submittedText: 'Wir melden uns in Kuerze.',
    questions: [
      {
        id: 'business',
        question: 'Fuer welches Business moechten Sie eine Website?',
        options: [
          { id: 'beauty', label: 'Beauty-Salon', icon: Sparkles },
          { id: 'hair', label: 'Friseursalon', icon: Scissors },
          { id: 'cosmetology', label: 'Kosmetiker / aesthetische Klinik', icon: Sparkles },
          { id: 'art', label: 'Kunstgalerie / Atelier', icon: Palette },
          { id: 'restaurant', label: 'Restaurant / Cafe', icon: UtensilsCrossed },
          { id: 'fastfood', label: 'Doener / Fast Food', icon: Pizza },
          { id: 'pharmacy', label: 'Apotheke', icon: Pill },
          { id: 'onlineshop', label: 'Online-Shop', icon: ShoppingCart },
          { id: 'services', label: 'Dienstleistungen (Handwerk, Sanitaer, Elektriker)', icon: Wrench },
          { id: 'other', label: 'Sonstiges', icon: MoreHorizontal },
        ],
      },
      {
        id: 'functions',
        question: 'Welche Funktionen soll die Website haben?',
        multiSelect: true,
        options: [
          { id: 'booking', label: 'Online-Terminbuchung', icon: CalendarCheck },
          { id: 'leads', label: 'Kundenanfragen annehmen', icon: MessageCircle },
          { id: 'services', label: 'Leistungen und Preise anzeigen', icon: Package },
          { id: 'payment', label: 'Online-Zahlung', icon: CreditCard },
          { id: 'shop', label: 'Online-Shop', icon: ShoppingBag },
          { id: 'catalog', label: 'Produktkatalog', icon: Package },
          { id: 'reservation', label: 'Reservierung', icon: Calendar },
          { id: 'maps', label: 'Google Maps Integration', icon: MapPin },
          { id: 'messenger', label: 'WhatsApp / Telegram Button', icon: MessageCircle },
          { id: 'other', label: 'Sonstiges', icon: MoreHorizontal },
        ],
      },
      {
        id: 'current_site',
        question: 'Haben Sie bereits eine Website?',
        options: [
          { id: 'none', label: 'Nein, brauche eine neue', icon: Store },
          { id: 'outdated', label: 'Ja, aber veraltet', icon: Store },
          { id: 'broken', label: 'Ja, funktioniert aber schlecht', icon: Store },
          { id: 'redo', label: 'Moechte komplett neu machen', icon: Store },
        ],
      },
      {
        id: 'location',
        question: 'Wo befindet sich Ihr Business?',
        type: 'input',
        inputPlaceholder: 'Stadt oder Region',
      },
      {
        id: 'content',
        question: 'Haben Sie Materialien fuer die Website?',
        multiSelect: true,
        options: [
          { id: 'texts', label: 'Texte sind fertig', icon: FileText },
          { id: 'media', label: 'Fotos / Videos vorhanden', icon: Image },
          { id: 'brand', label: 'Logo und Corporate Design vorhanden', icon: Palette },
          { id: 'nothing', label: 'Nichts vorhanden, muss erstellt werden', icon: Package },
        ],
      },
    ],
    final: {
      title: 'Ich bereite Ihre Website-Idee vor',
      subtitle: 'Sie erhalten:',
      benefits: ['Website-Struktur', 'Design-Beispiel', 'Beispielseite'],
      locationLabel: 'Stadt / Region',
      nameLabel: 'Name',
      whatsappLabel: 'WhatsApp',
      whatsappPlaceholder: '+49 170 1234567',
      submitButton: 'Website-Idee erhalten',
    },
    followUps: {
      otherSpecify: 'Was genau meinen Sie?',
      otherPlaceholder: 'Kurz beschreiben',
      siteUrl: 'Geben Sie die Adresse Ihrer aktuellen Website an',
      siteUrlPlaceholder: 'https://example.com',
    },
  }
)
