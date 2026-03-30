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
      badge: 'Современный сайт для бизнеса',
      title: 'Vibe Studio: Современные сайты для вашего бизнеса',
      subtitle:
        'Делаю сайты, которые хорошо выглядят, подстраиваются под размер экрана, удобно работают на мобильном телефоне и помогают клиенту быстро связаться с вами.',
      ctaPrimary: 'Начать проект',
      ctaSecondary: 'Смотреть работы',
      proofPoints: [
        'Дизайн адаптируется под размер экрана',
        'Удобно пользоваться на мобильном телефоне',
        'Связка с вашим мессенджером, почтой или CRM',
      ],
      floatingCardTitle: 'Vibe-driven workflow',
      floatingCardText: 'От идеи до готового сайта без лишней технической сложности для клиента.',
    },
    about: {
      eyebrow: 'Обо мне',
      title: 'Я помогаю не только сделать сайт, но и собрать понятное решение под ваш бизнес',
      subtitle:
        'Сначала разбираемся, что вам действительно нужно: больше заявок, удобная запись, понятная подача услуг или простой способ связи.',
      bullets: [
        'Обсуждаем задачу, сроки и то, как должен работать сайт',
        'Собираю понятную структуру страниц и удобный путь для клиента',
        'Довожу сайт до готового рабочего состояния и запуска',
      ],
    },
    services: {
      eyebrow: 'Услуги',
      title: 'Что можно сделать для вашего сайта',
      subtitle:
        'Подбираю решение под ваш бизнес: без лишнего, но с тем, что действительно нужно клиентам.',
      items: [
        {
          title: 'Сайт для одной услуги или предложения',
          description: 'Подходит, если нужно коротко и понятно показать услугу, преимущества и способ связи.',
          image: '/visual-neural-grid.svg',
        },
        {
          title: 'Интернет-магазин',
          description: 'Если вы продаете товары, можно сделать удобный каталог, карточки товара и понятный путь к покупке.',
          image: '/visual-launch-scene.svg',
        },
        {
          title: 'Сайт компании или студии',
          description: 'Чтобы красиво показать услуги, работы, отзывы, ответы на вопросы и контакты.',
          image: '/visual-workspace.svg',
        },
        {
          title: 'Формы, запись и связь с клиентом',
          description: 'Можно добавить запись, форму заявки, кнопку в мессенджер или связку с почтой и CRM.',
          image: '/visual-illustration.svg',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Примеры сайтов',
      subtitle:
        'Здесь можно посмотреть, как выглядят сайты для разных ниш и задач.',
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
      title: 'Как проходит работа',
      subtitle:
        'Все по шагам и понятным языком, без лишней путаницы и сложных терминов.',
      steps: [
        {
          title: 'Понимаем задачу',
          description: 'Смотрим, что именно должен делать сайт: привлекать заявки, записывать клиентов или просто понятно рассказывать о вас.',
        },
        {
          title: 'Собираем сайт',
          description: 'Делаю страницы, настраиваю дизайн под мобильный телефон и добавляю нужные способы связи.',
        },
        {
          title: 'Запускаем',
          description: 'Проверяю, чтобы все работало, и передаю вам готовый сайт с рабочей ссылкой.',
        },
      ],
    },
    stack: {
      eyebrow: 'Что получает клиент',
      title: 'Не набор технологий, а понятный результат',
      subtitle: 'Сайт работает быстро, хорошо смотрится на разных экранах и помогает клиенту легко с вами связаться.',
      items: ['Адаптация под мобильный телефон', 'Понятная структура страниц', 'Форма заявки', 'Связка с мессенджером', 'Почта или CRM', 'Быстрая загрузка', 'Удобное обновление сайта'],
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
      description: 'Vibe Studio делает понятные и современные сайты для малого бизнеса.',
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
      badge: 'Moderne Website fuer Ihr Business',
      title: 'Vibe Studio: Moderne Websites fuer Ihr Business',
      subtitle:
        'Ich baue Websites, die gut aussehen, sich an jede Bildschirmgroesse anpassen, auf dem Handy angenehm zu bedienen sind und Kunden den schnellen Kontakt zu Ihnen ermoeglichen.',
      ctaPrimary: 'Projekt starten',
      ctaSecondary: 'Portfolio ansehen',
      proofPoints: [
        'Passt sich an jede Bildschirmgroesse an',
        'Einfach auf dem Handy zu nutzen',
        'Verbindung mit Messenger, E-Mail oder CRM',
      ],
      floatingCardTitle: 'Vibe-driven workflow',
      floatingCardText: 'Von der Idee bis zur fertigen Website ohne unnoetige technische Komplexitaet fuer den Kunden.',
    },
    about: {
      eyebrow: 'Ueber mich',
      title: 'Ich helfe nicht nur beim Bauen, sondern finde mit Ihnen eine verstaendliche Loesung fuer Ihr Geschaeft',
      subtitle:
        'Zu Beginn klaeren wir, was Ihre Website wirklich leisten soll: mehr Anfragen, online Termine, bessere Praesentation oder eine einfache Kontaktmoeglichkeit.',
      bullets: [
        'Wir besprechen Ziel, Umfang und den Ablauf',
        'Ich plane eine klare Seitenstruktur und einen einfachen Weg fuer Ihre Kunden',
        'Ich setze die Website um und bringe sie live',
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Was ich fuer Ihre Website umsetzen kann',
      subtitle:
        'Die Loesung wird auf Ihr Geschaeft zugeschnitten: ohne Ballast, aber mit allem, was Ihre Kunden brauchen.',
      items: [
        {
          title: 'Website fuer ein Angebot oder eine Dienstleistung',
          description: 'Gut geeignet, wenn Sie ein Angebot klar erklaeren und Kunden schnell zur Anfrage fuehren moechten.',
          image: '/visual-neural-grid.svg',
        },
        {
          title: 'Online-Shop',
          description: 'Wenn Sie Produkte verkaufen, kann die Website Katalog, Produktseiten und einen klaren Weg zum Kauf enthalten.',
          image: '/visual-launch-scene.svg',
        },
        {
          title: 'Website fuer Firma, Studio oder Praxis',
          description: 'Damit Leistungen, Referenzen, Bewertungen und Kontakte sauber und vertrauensvoll gezeigt werden.',
          image: '/visual-workspace.svg',
        },
        {
          title: 'Anfrage, Termin und Kontakt',
          description: 'Moeglich sind Formulare, Online-Termin, Messenger-Buttons oder die Verbindung mit E-Mail und CRM.',
          image: '/visual-illustration.svg',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Beispiele von Websites',
      subtitle:
        'Hier sehen Sie, wie Websites fuer verschiedene Branchen und Aufgaben aussehen koennen.',
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
      title: 'So laeuft die Zusammenarbeit ab',
      subtitle:
        'Klar, verstaendlich und ohne unnötige Fachbegriffe.',
      steps: [
        {
          title: 'Ziel verstehen',
          description: 'Wir klaeren, was die Website fuer Ihr Geschaeft tun soll: Anfragen bringen, Termine aufnehmen oder Ihre Leistungen klar zeigen.',
        },
        {
          title: 'Website aufbauen',
          description: 'Ich gestalte die Seiten, passe alles fuer mobile Geraete an und richte die Kontaktwege ein.',
        },
        {
          title: 'Live schalten',
          description: 'Ich pruefe alles und uebergebe Ihnen die fertige Website mit funktionierendem Link.',
        },
      ],
    },
    stack: {
      eyebrow: 'Was Sie am Ende bekommen',
      title: 'Nicht Technik um der Technik willen, sondern ein verstaendliches Ergebnis',
      subtitle: 'Die Website laedt schnell, sieht auf verschiedenen Geraeten gut aus und macht den Kontakt fuer Kunden einfach.',
      items: ['Mobilfreundliche Darstellung', 'Klare Seitenstruktur', 'Anfrageformular', 'Messenger-Verbindung', 'E-Mail oder CRM', 'Schnelle Ladezeit', 'Einfach zu pflegen'],
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
      description: 'Vibe Studio entwickelt klare und moderne Websites fuer kleine Unternehmen.',
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
    initialGreeting: `Здравствуйте!
Меня зовут Max Webberater, я помогаю малому бизнесу в Германии получать клиентов через сайты.

Подскажите, пожалуйста, как я могу к вам обращаться?`,
    initialOptions: [],
    placeholder: 'Напишите сообщение...',
    submitButton: 'Отправить',
    other: 'Другое',
    emptyHint: 'Напишите первое сообщение — Max Webberater поможет понять, какой сайт вам нужен.',
    dialogTitle: 'Max Webberater',
  },
  de: {
    initialGreeting: `Guten Tag!
Ich bin Max Webberater und helfe kleinen Unternehmen in Deutschland, Kunden ueber Websites zu gewinnen.

Wie darf ich Sie ansprechen?`,
    initialOptions: [],
    placeholder: 'Nachricht schreiben...',
    submitButton: 'Senden',
    other: 'Anderes',
    emptyHint: 'Schreiben Sie die erste Nachricht — Max Webberater hilft dabei zu verstehen, welche Website Sie brauchen.',
    dialogTitle: 'Max Webberater',
  },
}
