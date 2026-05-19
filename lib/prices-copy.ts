import type { Locale } from '@/lib/translations'

export type PricePackageId = 'start' | 'business' | 'growth'

export type PricePackage = {
  id: PricePackageId
  name: string
  badge?: string
  price: string
  description: string
  ideal: string
  includedTitle: string
  included: string[]
  cta: string
}

export type PricesCopy = {
  seo: {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
  }
  nav: {
    home: string
  }
  hero: {
    eyebrow: string
    h1: string
    title: string
    subtitle: string
    primary: string
    secondary: string
    whatsapp: string
  }
  startPrices: {
    title: string
    text: string
    note: string
  }
  packagesTitle: string
  packagesSubtitle: string
  packages: PricePackage[]
  disclaimer: string
  legalNote: string
  comparison: {
    title: string
    functionLabel: string
    rows: Array<[string, string, string, string]>
  }
  choose: {
    title: string
    text: string
    items: Array<{ title: string; text: string }>
  }
  extras: {
    title: string
    text: string
    items: string[]
  }
  excluded: {
    title: string
    text: string
    items: string[]
  }
  valueBlock: {
    title: string
    text: string
  }
  process: {
    title: string
    steps: Array<{ title: string; text: string }>
  }
  faq: {
    title: string
    items: Array<{ question: string; answer: string }>
  }
  form: {
    title: string
    text: string
    name: string
    email: string
    phone: string
    company: string
    interest: string
    interestOptions: string[]
    message: string
    privacyBefore: string
    privacyLink: string
    privacyAfter: string
    submit: string
    error: string
  }
  finalCta: {
    title: string
    text: string
    primary: string
    whatsapp: string
  }
}

const dePackages: PricePackage[] = [
  {
    id: 'start',
    name: 'Start Website',
    price: 'ab 400 €',
    description: '1 Landing Page für ein einfaches, klares Online-Präsenz.',
    ideal: 'Ideal für Selbstständige, kleine Dienstleister oder lokale Unternehmen, die eine verständliche Seite mit Kontaktmöglichkeit brauchen.',
    includedTitle: 'Was ist enthalten?',
    included: [
      '1 Landing Page',
      'Einfache Seitenstruktur',
      'Schreiben oder Überarbeiten der Texte',
      'Individuelles Design',
      'Mobile Optimierung',
      'Einfaches Kontaktformular per E-Mail',
      'WhatsApp-Button oder Kontaktlink',
      'Technische SEO-Basics: Title, Description, Canonical',
      'Open Graph für Link-Vorschau',
      'Domain-Anbindung',
      'Veröffentlichung der Website',
      'Technische Einbindung von Impressum und Datenschutz',
      'Technische Einbindung einer AGB-Seite, falls benötigt',
    ],
    cta: 'Start Website anfragen',
  },
  {
    id: 'business',
    name: 'Business Website',
    badge: 'Empfohlen',
    price: 'ab 900 €',
    description: '3-7 Seiten für Unternehmen, Leistungen und klare Kontaktwege.',
    ideal: 'Ideal für Unternehmen mit mehreren Leistungen, mehr Inhalt und unterschiedlichen Nutzerfragen.',
    includedTitle: 'Was ist enthalten?',
    included: [
      '3-7 Seiten',
      'Klare Website-Struktur und Navigation',
      'Startseite',
      'Über-uns-Seite',
      'Leistungsseiten',
      'Separate Leistungsseiten, falls benötigt',
      'Preise- oder Angebotsseite, falls sinnvoll',
      'Kontaktseite',
      'Schreiben oder Überarbeiten der Texte',
      'Individuelles Design',
      'Optimierung für Smartphone und Tablet',
      'Kontaktformular',
      'WhatsApp-, E-Mail- oder Telefon-Button',
      'Technische SEO-Basics pro Seite',
      'Title, Description, Canonical und Open Graph',
      'Domain-Anbindung',
      'Veröffentlichung der Website',
      'Technische Einbindung von Impressum und Datenschutz',
      'Technische Einbindung einer AGB-Seite, falls benötigt',
    ],
    cta: 'Business Website anfragen',
  },
  {
    id: 'growth',
    name: 'Funktionale Website',
    price: 'ab 1.500 €',
    description: 'Website mit zusätzlicher Logik, interaktiven Funktionen und Integrationen.',
    ideal: 'Ideal für Projekte, bei denen die Website nicht nur Informationen zeigt, sondern Anfragen verarbeitet, Abläufe unterstützt oder externe Systeme verbindet.',
    includedTitle: 'Was ist enthalten?',
    included: [
      'Alles aus Business Website',
      'Interaktiver Quiz oder Anfrage-Assistent',
      'Mehrstufige Formulare',
      'Terminbuchung oder Booking Flow, falls benötigt',
      'Chatbot-Integration, falls benötigt',
      'CRM-Integration, falls benötigt',
      'Automatische Übergabe an CRM, Google Sheets, E-Mail oder andere Systeme',
      'Externe API-Integration, falls benötigt',
      'Eigene Berechnungslogik oder Kalkulator, falls benötigt',
      'Thank-you-Page nach Anfrage',
      'Analytics und Ereignis-Tracking, falls benötigt',
      'Tracking von Formularen und Buttons, falls benötigt',
      'Video-Einbindung oder KI-gestützte Video-Generierung, falls benötigt',
      'Dashboard oder Admin-Bereich, falls vereinbart',
      'Cookie- oder Consent-Integration bei externen Tools',
      'Technische Einbindung von Impressum und Datenschutz',
      'Technische Einbindung einer AGB-Seite, falls benötigt',
    ],
    cta: 'Funktionale Website anfragen',
  },
]

const ruPackages: PricePackage[] = [
  {
    id: 'start',
    name: 'Start Website',
    price: 'от 400 €',
    description: 'Одна landing page для простого и понятного онлайн-присутствия.',
    ideal: 'Подходит самозанятым, небольшим сервисам и локальным компаниям, которым нужна понятная страница с контактом.',
    includedTitle: 'Что входит?',
    included: [
      '1 Landing Page',
      'Простая структура страницы',
      'Написание или доработка текстов',
      'Индивидуальный дизайн',
      'Мобильная оптимизация',
      'Простая контактная форма на E-Mail',
      'Кнопка или ссылка WhatsApp',
      'Базовая техническая SEO-настройка: title, description, canonical',
      'Open Graph для превью ссылки',
      'Подключение домена',
      'Публикация сайта',
      'Техническое подключение Impressum и Datenschutz',
      'Техническое подключение AGB, если нужно',
    ],
    cta: 'Запросить Start Website',
  },
  {
    id: 'business',
    name: 'Business Website',
    badge: 'Рекомендуется',
    price: 'от 900 €',
    description: '3-7 страниц для компании, услуг и понятных способов связи.',
    ideal: 'Подходит бизнесу с несколькими услугами, большим объемом информации и разными сценариями пользователя.',
    includedTitle: 'Что входит?',
    included: [
      '3-7 страниц',
      'Понятная структура сайта и навигация',
      'Главная страница',
      'Страница о компании',
      'Страницы услуг',
      'Отдельные страницы услуг, если нужно',
      'Страница цен или предложения, если уместно',
      'Контактная страница',
      'Написание или доработка текстов',
      'Индивидуальный дизайн',
      'Оптимизация для смартфона и планшета',
      'Контактная форма',
      'Кнопки WhatsApp, E-Mail или телефона',
      'Базовая техническая SEO-настройка для страниц',
      'Title, description, canonical и Open Graph',
      'Подключение домена',
      'Публикация сайта',
      'Техническое подключение Impressum и Datenschutz',
      'Техническое подключение AGB, если нужно',
    ],
    cta: 'Запросить Business Website',
  },
  {
    id: 'growth',
    name: 'Функциональный сайт',
    price: 'от 1.500 €',
    description: 'Сайт с дополнительной логикой, интерактивными функциями и интеграциями.',
    ideal: 'Подходит проектам, где сайт должен не только показывать информацию, но и обрабатывать заявки, поддерживать процессы или связывать внешние системы.',
    includedTitle: 'Что входит?',
    included: [
      'Всё из Business Website',
      'Интерактивный квиз или помощник заявки',
      'Многошаговые формы',
      'Запись на термин или booking flow, если нужно',
      'Интеграция чат-бота, если нужно',
      'CRM-интеграция, если нужно',
      'Автоматическая передача заявок в CRM, Google Sheets, E-Mail или другую систему',
      'Интеграция внешних API, если нужно',
      'Кастомная логика расчета или калькулятор, если нужно',
      'Thank-you page после заявки',
      'Analytics и tracking событий, если нужно',
      'Tracking форм и кнопок, если нужно',
      'Встраивание видео или KI-генерация видео, если нужно',
      'Dashboard или admin area, если согласовано',
      'Cookie- или consent-интеграция при внешних инструментах',
      'Техническое подключение Impressum и Datenschutz',
      'Техническое подключение AGB, если нужно',
    ],
    cta: 'Запросить функциональный сайт',
  },
]

export const pricesCopy: Record<Locale, PricesCopy> = {
  de: {
    seo: {
      title: 'Preise für Websites | Website erstellen lassen ab 400 €',
      description: 'Transparente Preise für Landingpages, mehrseitige Websites und Websites mit zusätzlichen Funktionen. Website erstellen lassen ab 400 €.',
      canonical: 'https://erstellen-websiten.de/preise',
      ogTitle: 'Preise für Websites | Vibe Studio',
      ogDescription: 'Startpreise, Pakete und klare Orientierung für Websites, Funktionen und Integrationen.',
    },
    nav: { home: 'Vibe Studio' },
    hero: {
      eyebrow: 'Preise',
      h1: 'Transparente Preise für Websites und Web-Funktionen',
      title: 'Transparente Preise für Websites und Web-Funktionen',
      subtitle:
        'Ob einfache Landingpage, mehrseitige Business-Website oder Website mit zusätzlichen Funktionen - hier finden Sie eine klare Orientierung zu Paketen, Umfang und Startpreisen.',
      primary: 'Kostenlose Einschätzung starten',
      secondary: 'Pakete vergleichen',
      whatsapp: 'Per WhatsApp schreiben',
    },
    startPrices: {
      title: 'Warum gibt es Startpreise?',
      text:
        'Der genaue Preis hängt davon ab, wie viele Seiten benötigt werden, wie umfangreich Texte und Inhalte sind, wie individuell das Design wird und welche Formulare, Integrationen, externen Services oder App-Logik eingebaut werden sollen. Auch die Vorbereitung von Bildern, Texten und sonstigem Content beeinflusst den Aufwand.',
      note: 'Nach einer kurzen Einschätzung erhalten Sie ein klares Angebot mit Umfang, Preis und nächsten Schritten.',
    },
    packagesTitle: 'Website-Pakete',
    packagesSubtitle: 'Drei sinnvolle Einstiege - von einer einfachen Seite bis zu Websites mit Funktionen und Integrationen.',
    packages: dePackages,
    disclaimer:
      'Alle Preise sind Startpreise. Der endgültige Preis hängt vom Umfang, den vorhandenen Inhalten, gewünschten Funktionen und technischen Anforderungen ab.',
    legalNote:
      'Rechtliche Texte wie Impressum, Datenschutz und AGB können technisch eingebunden werden. Die rechtliche Prüfung erfolgt durch den Kunden oder einen Rechtsanwalt.',
    comparison: {
      title: 'Pakete im Vergleich',
      functionLabel: 'Funktion',
      rows: [
        ['Landingpage', 'Ja', 'Ja', 'Ja'],
        ['Mehrseitige Website', 'Nein', 'Ja', 'Ja'],
        ['3-7 Seiten', 'Nein', 'Ja', 'Ja'],
        ['Kontaktformular', 'Ja', 'Ja', 'Ja'],
        ['WhatsApp / Telefon / E-Mail Button', 'Optional', 'Ja', 'Ja'],
        ['Technische SEO-Basics', 'Ja', 'Ja', 'Ja'],
        ['Open Graph', 'Ja', 'Ja', 'Ja'],
        ['Thank-you-Page', 'Nein', 'Optional', 'Ja'],
        ['Mehrstufige Formulare', 'Nein', 'Nein', 'Optional'],
        ['Quiz / Anfrage-Assistent', 'Nein', 'Nein', 'Optional'],
        ['Terminbuchung', 'Nein', 'Optional', 'Optional'],
        ['Chatbot-Integration', 'Nein', 'Nein', 'Optional'],
        ['CRM-Integration', 'Nein', 'Nein', 'Optional'],
        ['Google Sheets / E-Mail Automation', 'Nein', 'Nein', 'Optional'],
        ['Analytics, falls benötigt', 'Nein', 'Optional', 'Optional'],
        ['Tracking von Formularen und Buttons, falls benötigt', 'Nein', 'Optional', 'Optional'],
        ['Externe API-Integration', 'Nein', 'Nein', 'Optional'],
        ['Video-Einbindung / Video-Generierung', 'Nein', 'Optional', 'Optional'],
        ['Datenschutz / Impressum technische Integration', 'Ja', 'Ja', 'Ja'],
        ['Cookie / Consent Integration bei externen Tools', 'Nein', 'Optional', 'Optional'],
      ],
    },
    choose: {
      title: 'Welche Website passt zu Ihnen?',
      text: 'Sie sind unsicher, welches Paket sinnvoll ist? Hier ist eine einfache Orientierung.',
      items: [
        { title: 'Start Website', text: 'Für eine einzelne Seite, einen einfachen Online-Auftritt und eine unkomplizierte Anfrage.' },
        { title: 'Business Website', text: 'Für Unternehmen mit mehreren Leistungen, mehr Vertrauen, mehr Inhalt und einer klaren Seitenstruktur.' },
        { title: 'Funktionale Website', text: 'Für Projekte, bei denen die Website nicht nur Informationen zeigt, sondern Funktionen übernimmt: Anfragen, Quiz, Terminbuchung, Chatbot, Integrationen oder Automatisierung.' },
      ],
    },
    extras: {
      title: 'Mögliche Zusatzleistungen',
      text: 'Je nach Projekt können zusätzliche Leistungen sinnvoll sein. Diese können separat angeboten werden.',
      items: [
        'Zusätzliche Seite - ab 120 €',
        'Mehrsprachige Version - ab 250 €',
        'Blog-Bereich - ab 250 €',
        'Terminbuchung - nach Aufwand',
        'Quiz / Anfrage-Assistent - ab 250 €',
        'Chatbot-Integration - nach Aufwand',
        'CRM-Integration - nach Aufwand',
        'Google Sheets / E-Mail Automation - ab 150 €',
        'Analytics / Ereignis-Tracking - ab 100 €',
        'Cookie-Banner / Consent Tool - nach Aufwand',
        'Video-Einbindung - ab 80 €',
        'KI-gestützte Video-Generierung - nach Aufwand',
        'Wartung & kleine Änderungen - ab 49 €/Monat',
        'Hosting & technische Betreuung - nach Vereinbarung',
      ],
    },
    excluded: {
      title: 'Was ist nicht automatisch enthalten?',
      text:
        'Damit es später keine Missverständnisse gibt, zeigen wir transparent, welche Leistungen nicht automatisch in jedem Paket enthalten sind.',
      items: [
        'Professionelle Fotos oder Videos',
        'Logo-Design',
        'Bezahlte Werbung',
        'Laufende SEO-Betreuung',
        'Rechtliche Prüfung von Datenschutz, AGB oder Impressum',
        'Lizenzen externer Services',
        'Komplexe CRM-Tarife',
        'Kostenpflichtige APIs',
        'Hosting-Gebühren',
        'Lizenzkosten für Plugins, Tools oder Schriftarten',
        'Große Shopsysteme oder komplexe Webportale',
        'Laufende Pflege nach Veröffentlichung, wenn kein Wartungspaket gebucht wurde',
      ],
    },
    valueBlock: {
      title: 'Warum nicht einfach den billigsten Anbieter wählen?',
      text:
        'Eine Website ist nicht nur Design. Entscheidend sind eine verständliche Struktur, saubere technische Umsetzung, funktionierende Formulare, mobile Darstellung, Integrationen, Zuverlässigkeit und eine Website, die später gut gepflegt werden kann. Ein günstiger Preis ist nur sinnvoll, wenn diese Grundlagen trotzdem sauber umgesetzt werden.',
    },
    process: {
      title: 'So läuft die Zusammenarbeit ab',
      steps: [
        { title: 'Kostenlose Einschätzung', text: 'Wir sprechen kurz über Ihr Unternehmen, Ihre Ziele und den passenden Umfang.' },
        { title: 'Angebot', text: 'Sie erhalten ein klares Angebot mit Preis, Umfang und nächsten Schritten.' },
        { title: 'Struktur & Inhalte', text: 'Wir planen die Seitenstruktur und bereiten Texte und Inhalte vor.' },
        { title: 'Design & Umsetzung', text: 'Ihre Website wird gestaltet, umgesetzt und für mobile Geräte optimiert.' },
        { title: 'Veröffentlichung', text: 'Nach Freigabe wird die Website veröffentlicht und technisch geprüft.' },
      ],
    },
    faq: {
      title: 'Häufige Fragen zu den Preisen',
      items: [
        { question: 'Warum startet eine Website bei 400 €?', answer: 'Eine einfache Landingpage mit klarem Umfang kann ab 400 € umgesetzt werden. Dazu gehören eine Seite, mobile Darstellung, Kontaktmöglichkeit, technische Basis-Einstellungen und Veröffentlichung.' },
        { question: 'Was beeinflusst den Preis einer Website?', answer: 'Wichtig sind vor allem Anzahl der Seiten, Umfang der Texte, Design-Aufwand, Formulare, Integrationen, externe Services, App-Logik und die Vorbereitung des Contents.' },
        { question: 'Worin unterscheidet sich eine Landingpage von einer mehrseitigen Website?', answer: 'Eine Landingpage bündelt die wichtigsten Informationen auf einer Seite. Eine mehrseitige Website hat mehr Struktur, Navigation, separate Inhalte und kann mehrere Leistungen oder Zielgruppen verständlicher abbilden.' },
        { question: 'Wann brauche ich eine funktionale Website?', answer: 'Eine funktionale Website ist sinnvoll, wenn die Seite nicht nur informieren soll, sondern zusätzliche Logik braucht: Quiz, mehrstufige Formulare, Terminbuchung, Chatbot, CRM-Anbindung, Automationen oder API-Integrationen.' },
        { question: 'Kann man Quiz, Chatbot oder Terminbuchung später ergänzen?', answer: 'Ja. Viele Funktionen können später ergänzt werden, wenn die technische Struktur der Website sauber vorbereitet ist.' },
        { question: 'Kann CRM oder Google Sheets angebunden werden?', answer: 'Ja. Anfragen können je nach Projekt an CRM, Google Sheets, E-Mail oder andere Systeme übergeben werden. Der Aufwand hängt von der gewünschten Logik und vom externen Tool ab.' },
        { question: 'Ist Analytics enthalten?', answer: 'Analytics und Ereignis-Tracking können eingebunden werden, wenn sie benötigt werden. Bei externen Tools kann zusätzlich eine Cookie- oder Consent-Integration nötig sein.' },
        { question: 'Sind Impressum und Datenschutz enthalten?', answer: 'Impressum, Datenschutz und AGB können technisch eingebunden werden. Die rechtliche Prüfung erfolgt durch den Kunden oder einen Rechtsanwalt.' },
        { question: 'Kann ich später weitere Seiten hinzufügen?', answer: 'Ja. Die Website kann später erweitert werden, zum Beispiel mit zusätzlichen Leistungsseiten, Blog, weiteren Sprachen oder neuen Funktionen.' },
        { question: 'Gibt es monatliche Betreuung?', answer: 'Ja. Wartung, kleine Änderungen, technische Betreuung oder Hosting-Betreuung können separat vereinbart werden.' },
      ],
    },
    form: {
      title: 'Kostenlose Einschätzung anfragen',
      text: 'Schreiben Sie kurz, was Sie brauchen. Sie erhalten eine ehrliche Einschätzung, welches Paket sinnvoll ist.',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon oder WhatsApp',
      company: 'Unternehmen / Branche',
      interest: 'Welche Website interessiert Sie?',
      interestOptions: ['Start Website', 'Business Website', 'Funktionale Website', 'Ich bin unsicher'],
      message: 'Nachricht',
      privacyBefore: 'Ich habe die',
      privacyLink: 'Datenschutzerklärung',
      privacyAfter: 'gelesen und stimme der Verarbeitung meiner Angaben zu.',
      submit: 'Anfrage senden',
      error: 'Senden fehlgeschlagen. Bitte später erneut versuchen.',
    },
    finalCta: {
      title: 'Unsicher, welches Paket passt?',
      text:
        'Schreiben Sie kurz, was Sie brauchen. Ich gebe Ihnen eine ehrliche Einschätzung, welches Paket sinnvoll ist - ohne komplizierte Fachbegriffe.',
      primary: 'Kostenlose Einschätzung starten',
      whatsapp: 'Per WhatsApp schreiben',
    },
  },
  ru: {
    seo: {
      title: 'Цены на сайты | Website erstellen lassen ab 400 €',
      description: 'Прозрачные цены на landing pages, многостраничные сайты и сайты с дополнительными функциями. Сайт от 400 €.',
      canonical: 'https://erstellen-websiten.de/ru/preise',
      ogTitle: 'Цены на сайты | Vibe Studio',
      ogDescription: 'Пакеты, стартовые цены и понятная ориентация по сайтам, функциям и интеграциям.',
    },
    nav: { home: 'Vibe Studio' },
    hero: {
      eyebrow: 'Цены',
      h1: 'Прозрачные цены на сайты и веб-функции',
      title: 'Прозрачные цены на сайты и веб-функции',
      subtitle:
        'Простая landing page, многостраничный сайт для бизнеса или сайт с дополнительными функциями - здесь вы найдете понятный ориентир по пакетам, объему и стартовым ценам.',
      primary: 'Получить бесплатную оценку',
      secondary: 'Сравнить пакеты',
      whatsapp: 'Написать в WhatsApp',
    },
    startPrices: {
      title: 'Почему указаны стартовые цены?',
      text:
        'Точная стоимость зависит от количества страниц, объема текстов и материалов, сложности дизайна, форм, интеграций, внешних сервисов и логики приложения. Подготовка изображений, текстов и другого контента тоже влияет на объем работы.',
      note: 'После короткой оценки вы получите понятное предложение с объемом, ценой и следующими шагами.',
    },
    packagesTitle: 'Пакеты сайтов',
    packagesSubtitle: 'Три практичных варианта - от простой страницы до сайта с функциями и интеграциями.',
    packages: ruPackages,
    disclaimer:
      'Все цены являются стартовыми. Итоговая стоимость зависит от объема, готовых материалов, нужных функций и технических требований.',
    legalNote:
      'Юридические тексты Impressum, Datenschutz и AGB могут быть технически подключены. Юридическая проверка выполняется клиентом или юристом.',
    comparison: {
      title: 'Сравнение пакетов',
      functionLabel: 'Функция',
      rows: [
        ['Landingpage', 'Да', 'Да', 'Да'],
        ['Многостраничный сайт', 'Нет', 'Да', 'Да'],
        ['3-7 страниц', 'Нет', 'Да', 'Да'],
        ['Контактная форма', 'Да', 'Да', 'Да'],
        ['WhatsApp / телефон / E-Mail кнопка', 'Опция', 'Да', 'Да'],
        ['Базовая техническая SEO-настройка', 'Да', 'Да', 'Да'],
        ['Open Graph', 'Да', 'Да', 'Да'],
        ['Thank-you page', 'Нет', 'Опция', 'Да'],
        ['Многошаговые формы', 'Нет', 'Нет', 'Опция'],
        ['Квиз / помощник заявки', 'Нет', 'Нет', 'Опция'],
        ['Запись на термин', 'Нет', 'Опция', 'Опция'],
        ['Интеграция чат-бота', 'Нет', 'Нет', 'Опция'],
        ['CRM-интеграция', 'Нет', 'Нет', 'Опция'],
        ['Google Sheets / E-Mail автоматизация', 'Нет', 'Нет', 'Опция'],
        ['Analytics, если нужно', 'Нет', 'Опция', 'Опция'],
        ['Tracking форм и кнопок, если нужно', 'Нет', 'Опция', 'Опция'],
        ['Интеграция внешних API', 'Нет', 'Нет', 'Опция'],
        ['Встраивание видео / генерация видео', 'Нет', 'Опция', 'Опция'],
        ['Техническая интеграция Datenschutz / Impressum', 'Да', 'Да', 'Да'],
        ['Cookie / Consent integration при внешних инструментах', 'Нет', 'Опция', 'Опция'],
      ],
    },
    choose: {
      title: 'Какой сайт вам подходит?',
      text: 'Если вы не уверены, какой пакет нужен, ориентируйтесь на простую логику.',
      items: [
        { title: 'Start Website', text: 'Для одной страницы, простого онлайн-присутствия и простой заявки.' },
        { title: 'Business Website', text: 'Для компании с несколькими услугами, большим доверием, большим количеством контента и понятной структурой.' },
        { title: 'Функциональный сайт', text: 'Для проекта, где сайт должен не только показывать информацию, но и выполнять функции: заявки, квиз, запись на термин, чат-бот, интеграции или автоматизация.' },
      ],
    },
    extras: {
      title: 'Возможные дополнительные услуги',
      text: 'В зависимости от проекта могут быть полезны дополнительные работы. Они предлагаются отдельно.',
      items: [
        'Дополнительная страница - от 120 €',
        'Многоязычная версия - от 250 €',
        'Блог - от 250 €',
        'Запись на термин - по объему',
        'Квиз / помощник заявки - от 250 €',
        'Интеграция чат-бота - по объему',
        'CRM-интеграция - по объему',
        'Google Sheets / E-Mail автоматизация - от 150 €',
        'Analytics / tracking событий - от 100 €',
        'Cookie-Banner / Consent Tool - по объему',
        'Встраивание видео - от 80 €',
        'KI-генерация видео - по объему',
        'Поддержка и мелкие правки - от 49 €/месяц',
        'Хостинг и техническое сопровождение - по договоренности',
      ],
    },
    excluded: {
      title: 'Что не входит автоматически?',
      text: 'Чтобы позже не было недопонимания, здесь прозрачно указано, что не входит автоматически в каждый пакет.',
      items: [
        'Профессиональные фото или видео',
        'Дизайн логотипа',
        'Платная реклама',
        'Постоянное SEO-сопровождение',
        'Юридическая проверка Datenschutz, AGB или Impressum',
        'Лицензии внешних сервисов',
        'Сложные CRM-тарифы',
        'Платные API',
        'Стоимость хостинга',
        'Лицензии на плагины, инструменты или шрифты',
        'Большие интернет-магазины или сложные порталы',
        'Постоянное обслуживание после публикации, если не выбран пакет поддержки',
      ],
    },
    valueBlock: {
      title: 'Почему не выбрать просто самого дешевого исполнителя?',
      text:
        'Сайт - это не только дизайн. Важны понятная структура, техническая реализация, рабочие формы, мобильная версия, интеграции, надежность и удобство дальнейшей поддержки. Низкая цена имеет смысл только тогда, когда эти основы сделаны аккуратно.',
    },
    process: {
      title: 'Как проходит работа',
      steps: [
        { title: 'Бесплатная оценка', text: 'Мы коротко обсуждаем ваш бизнес, цели и подходящий объем.' },
        { title: 'Предложение', text: 'Вы получаете понятное предложение с ценой, объемом и следующими шагами.' },
        { title: 'Структура и материалы', text: 'Мы планируем структуру страниц и готовим тексты и материалы.' },
        { title: 'Дизайн и реализация', text: 'Сайт оформляется, собирается и оптимизируется для мобильных устройств.' },
        { title: 'Публикация', text: 'После согласования сайт публикуется и технически проверяется.' },
      ],
    },
    faq: {
      title: 'Частые вопросы о ценах',
      items: [
        { question: 'Почему цена стартует от 400 €?', answer: 'Простая landing page с понятным объемом может быть реализована от 400 €. В нее входят одна страница, мобильная версия, контактная возможность, базовые технические настройки и публикация.' },
        { question: 'Что влияет на цену сайта?', answer: 'В первую очередь количество страниц, объем текстов, сложность дизайна, формы, интеграции, внешние сервисы, логика приложения и подготовка контента.' },
        { question: 'Чем отличается одностраничник от многостраничного сайта?', answer: 'Одностраничник собирает основную информацию на одной странице. Многостраничный сайт дает больше структуры, навигацию, отдельные разделы и лучше подходит для нескольких услуг или разных сценариев пользователя.' },
        { question: 'Когда нужен функциональный сайт?', answer: 'Функциональный сайт нужен, если сайт должен не только информировать, но и выполнять логику: квиз, многошаговые формы, запись на термин, чат-бот, CRM, автоматизации или API-интеграции.' },
        { question: 'Можно ли добавить квиз, чат-бота или запись на термин позже?', answer: 'Да. Многие функции можно добавить позже, если техническая структура сайта подготовлена аккуратно.' },
        { question: 'Можно ли подключить CRM или Google Sheets?', answer: 'Да. Заявки можно передавать в CRM, Google Sheets, E-Mail или другие системы. Объем работы зависит от нужной логики и внешнего инструмента.' },
        { question: 'Входит ли аналитика?', answer: 'Analytics и tracking событий можно подключить, если это нужно. При внешних инструментах может дополнительно понадобиться Cookie- или Consent-интеграция.' },
        { question: 'Входят ли Impressum и Datenschutz?', answer: 'Impressum, Datenschutz и AGB могут быть технически подключены. Юридическая проверка выполняется клиентом или юристом.' },
        { question: 'Можно ли позже расширить сайт?', answer: 'Да. Сайт можно расширять: добавлять страницы услуг, блог, языковые версии или новые функции.' },
        { question: 'Есть ли ежемесячная поддержка?', answer: 'Да. Поддержка, мелкие изменения, техническое сопровождение или сопровождение хостинга могут быть согласованы отдельно.' },
      ],
    },
    form: {
      title: 'Запросить бесплатную оценку',
      text: 'Коротко напишите, что вам нужно. Вы получите честную оценку, какой пакет имеет смысл.',
      name: 'Имя',
      email: 'E-Mail',
      phone: 'Телефон или WhatsApp',
      company: 'Компания / сфера',
      interest: 'Какой сайт вас интересует?',
      interestOptions: ['Start Website', 'Business Website', 'Функциональный сайт', 'Я не уверен(а)'],
      message: 'Сообщение',
      privacyBefore: 'Я прочитал(а)',
      privacyLink: 'политику конфиденциальности',
      privacyAfter: 'и согласен(на) на обработку моих данных.',
      submit: 'Отправить заявку',
      error: 'Не удалось отправить. Попробуйте позже.',
    },
    finalCta: {
      title: 'Не уверены, какой пакет подходит?',
      text: 'Коротко напишите, что вам нужно. Я честно подскажу, какой пакет имеет смысл - без сложных терминов.',
      primary: 'Получить бесплатную оценку',
      whatsapp: 'Написать в WhatsApp',
    },
  },
}
