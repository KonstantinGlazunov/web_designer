export type Locale = 'ru' | 'de'

export interface SiteCopy {
  localeLabel: string
  themeLabel: string
  nav: {
    services: string
    portfolio: string
    process: string
    contact: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    proofPoints: string[]
    floatingCardTitle: string
    floatingCardText: string
  }
  about: {
    eyebrow: string
    title: string
    subtitle: string
    bullets: string[]
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{ title: string; description: string; image: string }>
  }
  portfolio: {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      image: string
      tech: string[]
      size: 'sm' | 'lg'
      url?: string
    }>
  }
  process: {
    eyebrow: string
    title: string
    subtitle: string
    steps: Array<{ title: string; description: string }>
  }
  stack: {
    eyebrow: string
    title: string
    subtitle: string
    items: string[]
  }
  stickyCta: {
    text: string
    button: string
  }
  form: {
    title: string
    subtitle: string
    name: string
    email: string
    project: string
    submit: string
    close: string
    success: string
  }
  footer: {
    description: string
    legal: {
      agb: string
      privacy: string
      impressum: string
    }
    socials: string
  }
}

export const siteCopy: Record<Locale, SiteCopy> = {
  ru: {
    localeLabel: 'RU',
    themeLabel: 'Тема',
    nav: {
      services: 'Сервисы',
      portfolio: 'Портфолио',
      process: 'Процесс',
      contact: 'Контакт',
    },
    hero: {
      badge: 'Next.js 15 + motion + 3D',
      title: 'CodeVibe Studio: Современные сайты для вашего бизнеса',
      subtitle:
        'Next.js, Tailwind, AI-персонализация, 3D и чистая продуктовая инженерия для брендов, SaaS и e-commerce.',
      ctaPrimary: 'Начать проект',
      ctaSecondary: 'Смотреть работы',
      proofPoints: [
        'Senior-level frontend engineering',
        'Тренды дизайна 2026 без шаблонности',
        'Deploy-ready сайты на современном стеке',
      ],
      floatingCardTitle: 'Vibe-driven workflow',
      floatingCardText: 'От визуального вайба до production deployment без перегруза клиента.',
    },
    about: {
      eyebrow: 'Обо мне',
      title: 'Я подключаюсь как инженер и партнёр, а не просто “исполнитель”',
      subtitle:
        'На старте фиксируем цель, аудиторию и критерии успеха — чтобы дизайн, тексты и разработка работали на результат.',
      bullets: [
        'Созваниваемся и уточняем задачу (scope, сроки, референсы)',
        'Предлагаю структуру и UX-логику, согласуем направление',
        'Делаю реализацию и довожу до деплоя (скорость, SEO, адаптивность)',
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Услуги, которые выглядят современно и работают на бизнес',
      subtitle:
        'Каждый проект собирается под задачу, а не под ограничения билдера или готовой темы.',
      items: [
        {
          title: 'Landing Pages',
          description: 'Конверсионные лендинги с сильной типографикой, motion и четким CTA.',
          image: '/visual-neural-grid.svg',
        },
        {
          title: 'E-commerce',
          description: 'Современные магазины и product pages с премиальной подачей и UX.',
          image: '/visual-launch-scene.svg',
        },
        {
          title: 'SaaS Dashboards',
          description: 'Интерфейсы для продуктов, кабинетов и data-driven сценариев.',
          image: '/visual-workspace.svg',
        },
        {
          title: 'AI-персонализация',
          description: 'Флоу и UI под AI-опыт, smart onboarding и персонализированные блоки.',
          image: '/visual-illustration.svg',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Работы, где видно engineering + визуальный уровень',
      subtitle:
        'Masonry-сетка с hover reveal: каждая карточка подчеркивает стек, дизайн и подачу.',
      items: [
        {
          title: 'Speicher Balkonkraftwerk',
          description: 'Лендинг для солнечных модулей и накопителей энергии. Мультиязычность, калькулятор, конверсионный CTA.',
          image: '/portfolio/speicher.png',
          tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
          size: 'lg',
          url: 'https://speicher-balkonkraftwerk.de/ru/',
        },
        {
          title: 'BewerbungProfi',
          description: 'AI-генератор сопроводительных писем для работы в Германии. OpenAI API, мультиязычность, PDF.',
          image: '/portfolio/bewerbungprofi.png',
          tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
          size: 'sm',
          url: 'https://bewerbungprofi.de/',
        },
        {
          title: 'Beauty Studio Lesya',
          description: 'Сайт бьюти-студии перманентного макияжа в Браунфельсе. Элегантный дизайн, галерея работ.',
          image: '/portfolio/lesia.png',
          tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
          size: 'sm',
          url: 'https://konstantinglazunov.github.io/-Lesia/',
        },
        {
          title: 'Dogs Services',
          description: 'Сервис для владельцев собак. Бронирование, каталог услуг, современный UI.',
          image: '/portfolio/dogs.png',
          tech: ['React', 'TypeScript', 'DigitalOcean'],
          size: 'lg',
          url: 'https://dog-app-iw6ow.ondigitalocean.app/',
        },
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'От дизайн-вайба до деплоя без лишней сложности',
      subtitle:
        'Понятный процесс для клиента и быстрый production pipeline для реализации.',
      steps: [
        {
          title: 'Дизайн вайб',
          description: 'Определяем подачу, настроение, структуру и визуальную логику сайта.',
        },
        {
          title: 'Vibe coding',
          description: 'Собираю интерфейс, motion, адаптивность и frontend-архитектуру.',
        },
        {
          title: 'Deploy Vercel/Netlify',
          description: 'Запуск, оптимизация, публикация и готовая ссылка на ваш проект.',
        },
      ],
    },
    stack: {
      eyebrow: 'Tech stack',
      title: 'Инструменты, на которых строятся современные digital-продукты',
      subtitle: 'Next.js, motion, 3D, UI systems и deploy pipeline в одном современном стеке.',
      items: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Supabase', 'Vercel', 'shadcn/ui'],
    },
    stickyCta: {
      text: 'Готовы к проекту? Пиши сейчас',
      button: 'Открыть форму',
    },
    form: {
      title: 'Расскажите о проекте',
      subtitle: 'Короткого описания достаточно, чтобы стартовать.',
      name: 'Имя',
      email: 'Email',
      project: 'Описание проекта',
      submit: 'Отправить',
      close: 'Закрыть',
      success: 'Сообщение готово. Следующий шаг: согласовать scope и старт.',
    },
    footer: {
      description: 'CodeVibe Studio создает современные сайты и продуктовые интерфейсы без шаблонного ощущения.',
      legal: {
        agb: 'AGB',
        privacy: 'Datenschutzerklaerung',
        impressum: 'Impressum',
      },
      socials: 'Соцсети',
    },
  },
  de: {
    localeLabel: 'DE',
    themeLabel: 'Thema',
    nav: {
      services: 'Leistungen',
      portfolio: 'Portfolio',
      process: 'Prozess',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'Next.js 15 + Motion + 3D',
      title: 'CodeVibe Studio: Moderne Websites fuer Ihr Business',
      subtitle:
        'Next.js, Tailwind, AI-Personalisierung, 3D und saubere Produktentwicklung fuer Brands, SaaS und E-Commerce.',
      ctaPrimary: 'Projekt starten',
      ctaSecondary: 'Portfolio ansehen',
      proofPoints: [
        'Senior Frontend Engineering',
        'Designtrends 2026 ohne Baukasten-Look',
        'Deploy-ready Websites mit modernem Stack',
      ],
      floatingCardTitle: 'Vibe-driven workflow',
      floatingCardText: 'Vom visuellen Konzept bis zum produktiven Deployment ohne technische Last fuer den Kunden.',
    },
    about: {
      eyebrow: 'Ueber mich',
      title: 'Ich arbeite als Engineer und Partner — nicht nur als “Umsetzer”',
      subtitle:
        'Zum Start klaeren wir Ziel, Zielgruppe und Erfolgskriterien, damit Design, Text und Entwicklung messbar wirken.',
      bullets: [
        'Kickoff-Call: Scope, Timeline und Referenzen',
        'Struktur & UX-Logik vorschlagen, Richtung abstimmen',
        'Umsetzung bis Deployment (Performance, SEO, Responsivitaet)',
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Leistungen mit modernem Look und echtem Business-Fokus',
      subtitle:
        'Jedes Projekt wird individuell gebaut, nicht durch die Grenzen eines Website-Builders bestimmt.',
      items: [
        {
          title: 'Landing Pages',
          description: 'Conversion-orientierte Seiten mit starker Typografie, Motion und klaren CTA-Strukturen.',
          image: '/visual-neural-grid.svg',
        },
        {
          title: 'E-commerce',
          description: 'Moderne Shops und Produktseiten mit hochwertigem UX und visueller Tiefe.',
          image: '/visual-launch-scene.svg',
        },
        {
          title: 'SaaS Dashboards',
          description: 'Interfaces fuer Produkte, Admin-Bereiche und datengetriebene Workflows.',
          image: '/visual-workspace.svg',
        },
        {
          title: 'AI-Personalisierung',
          description: 'UX-Flows und UI-Komponenten fuer AI-Erlebnisse, Smart Onboarding und dynamische Inhalte.',
          image: '/visual-illustration.svg',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Arbeiten, die Engineering und visuelle Qualitaet zeigen',
      subtitle:
        'Masonry-Grid mit Hover-Reveal: jede Karte betont Stack, Design und Praesentation.',
      items: [
        {
          title: 'Speicher Balkonkraftwerk',
          description: 'Landing fuer Solar-Module und Energiespeicher. Mehrsprachig, Rechner, Conversion-CTA.',
          image: '/portfolio/speicher.png',
          tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
          size: 'lg',
          url: 'https://speicher-balkonkraftwerk.de/ru/',
        },
        {
          title: 'BewerbungProfi',
          description: 'KI-Generator fuer Bewerbungsanschreiben in Deutschland. OpenAI API, Mehrsprachigkeit, PDF.',
          image: '/portfolio/bewerbungprofi.png',
          tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
          size: 'sm',
          url: 'https://bewerbungprofi.de/',
        },
        {
          title: 'Beauty Studio Lesya',
          description: 'Website der Beauty-Studio fuer Permanent-Make-up in Braunfels. Elegantes Design, Galerie.',
          image: '/portfolio/lesia.png',
          tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
          size: 'sm',
          url: 'https://konstantinglazunov.github.io/-Lesia/',
        },
        {
          title: 'Dogs Services',
          description: 'Service fuer Hundebesitzer. Buchung, Leistungskatalog, modernes UI.',
          image: '/portfolio/dogs.png',
          tech: ['React', 'TypeScript', 'DigitalOcean'],
          size: 'lg',
          url: 'https://dog-app-iw6ow.ondigitalocean.app/',
        },
      ],
    },
    process: {
      eyebrow: 'Prozess',
      title: 'Vom Design-Vibe bis zum Deployment ohne technische Reibung',
      subtitle:
        'Ein klarer Ablauf fuer Kunden und eine schnelle Produktionskette fuer die Umsetzung.',
      steps: [
        {
          title: 'Design Vibe',
          description: 'Visuelle Richtung, Informationsstruktur und atmosphaerische Wirkung definieren.',
        },
        {
          title: 'Vibe coding',
          description: 'Interface, Motion, Responsivitaet und Frontend-Architektur produktionsreif umsetzen.',
        },
        {
          title: 'Deploy Vercel/Netlify',
          description: 'Optimieren, veroeffentlichen und den fertigen Link an den Kunden senden.',
        },
      ],
    },
    stack: {
      eyebrow: 'Tech stack',
      title: 'Werkzeuge fuer moderne digitale Produkte',
      subtitle: 'Next.js, Motion, 3D, UI Systems und ein sauberer Deployment-Workflow in einem Stack.',
      items: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Supabase', 'Vercel', 'shadcn/ui'],
    },
    stickyCta: {
      text: 'Bereit fuer ein Projekt? Schreib jetzt',
      button: 'Formular oeffnen',
    },
    form: {
      title: 'Erzaehlen Sie kurz vom Projekt',
      subtitle: 'Ein kurzes Briefing reicht aus, um zu starten.',
      name: 'Name',
      email: 'E-Mail',
      project: 'Projektbeschreibung',
      submit: 'Senden',
      close: 'Schliessen',
      success: 'Die Anfrage ist vorbereitet. Der naechste Schritt ist Scope und Kickoff.',
    },
    footer: {
      description: 'CodeVibe Studio entwickelt moderne Websites und digitale Interfaces ohne Baukasten-Charakter.',
      legal: {
        agb: 'AGB',
        privacy: 'Datenschutzerklaerung',
        impressum: 'Impressum',
      },
      socials: 'Socials',
    },
  },
}

export const chatCopy: Record<Locale, {
  initialGreeting: string
  initialOptions: string[]
  placeholder: string
  submitButton: string
  other: string
  emptyHint: string
  dialogTitle: string
}> = {
  ru: {
    initialGreeting: `Привет! Давайте немного поговорим о вашем будущем сайте. 🙂

Вам нужен сайт?`,
    initialOptions: ['Да, хочу сайт', 'Пока смотрю', 'Есть вопрос', 'Другое'],
    placeholder: 'Напишите сообщение...',
    submitButton: 'Отправить',
    other: 'Другое',
    emptyHint: 'Напишите первое сообщение — Guidi поможет собрать техническое задание на сайт.',
    dialogTitle: 'Guidi',
  },
  de: {
    initialGreeting: `Hallo! Lassen Sie uns kurz über Ihre zukünftige Website sprechen. 🙂

Brauchen Sie eine Website?`,
    initialOptions: ['Ja, ich möchte eine Website', 'Schauen nur', 'Habe eine Frage', 'Anderes'],
    placeholder: 'Nachricht schreiben...',
    submitButton: 'Senden',
    other: 'Anderes',
    emptyHint: 'Schreiben Sie die erste Nachricht — Guidi hilft beim Sammeln der technischen Anforderungen.',
    dialogTitle: 'Guidi',
  },
}
