export type LandingLocale = 'de' | 'ru'

export interface LandingCopy {
  lang: {
    current: string
    switchTo: string
  }
  nav: {
    studio: string
    region: string
    badges: string[]
  }
  hero: {
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    benefits: string[]
    hint: string
    mockupTitle: string
    mockupSubtitle: string
    mobileLabel: string
  }
  problem: {
    title: string
    cards: string[]
    summary: string
  }
  value: {
    title: string
    intro: string
    cards: Array<{
      title: string
      description: string
    }>
  }
  logic: {
    title: string
    steps: string[]
    note: string
  }
  audience: {
    title: string
    cards: string[]
    note: string
  }
  process: {
    title: string
    stepLabel: string
    steps: Array<{
      title: string
      description: string
    }>
    note: string
  }
  trust: {
    title: string
    points: string[]
    humanTitle: string
    humanText: string
  }
  honesty: {
    title: string
    main: string
    extra: string
  }
  beforeAfter: {
    title: string
    caseLabel: string
    beforeLabel: string
    afterLabel: string
    cards: Array<{
      before: string
      after: string
    }>
  }
  faq: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  finalCta: {
    title: string
    subtitle: string
    primary: string
    secondary: string
  }
  footer: {
    title: string
    description: string
    contact: string
    whatsapp: string
    email: string
    legal: {
      impressum: string
      privacy: string
    }
  }
  floating: {
    whatsapp: string
    contact: string
  }
}

export const landingCopy: Record<LandingLocale, LandingCopy> = {
  de: {
    lang: {
      current: 'DE',
      switchTo: 'RU',
    },
    nav: {
      studio: 'Vibe Studio',
      region: 'Websites für kleine Unternehmen',
      badges: ['Für lokale Unternehmen', 'Mobil optimiert', 'Klar & modern'],
    },
    hero: {
      title: 'Klare Website für Ihr Unternehmen - modern, verständlich und professionell',
      subtitle:
        'Wir erstellen Websites für kleine Unternehmen in Deutschland: klar aufgebaut, mobil optimiert und bereit, Ihr Geschäft professionell zu präsentieren.',
      ctaPrimary: 'Projekt starten',
      ctaSecondary: 'Beispiele ansehen',
      benefits: [
        'Verständlich aufgebaut',
        'Für Smartphone optimiert',
        'Ohne unnötige Technik-Sprache',
        'Passend für lokale Unternehmen',
      ],
      hint: 'Ideal für Handwerk, Service, Beauty, Werkstatt, Vermietung und lokale Geschäfte',
      mockupTitle: 'Unternehmensprofil',
      mockupSubtitle: 'Lokal, klar, vertrauenswürdig',
      mobileLabel: 'Mobile Ansicht',
    },
    problem: {
      title: 'Kommt Ihnen das bekannt vor?',
      cards: [
        'Ihr Unternehmen läuft, aber online sieht man davon kaum etwas',
        'Kunden finden Sie nur über Empfehlungen oder Zufall',
        'Sie haben keine Website - oder eine, die unklar und veraltet wirkt',
        'Sie wissen, dass etwas gemacht werden muss, aber nicht, wo Sie anfangen sollen',
      ],
      summary:
        'Das Problem ist oft nicht Ihr Angebot. Das Problem ist, dass Ihr Unternehmen online nicht klar und professionell sichtbar ist.',
    },
    value: {
      title: 'Keine leeren Versprechen. Sondern eine saubere Grundlage für Ihren Online-Auftritt.',
      intro:
        'Wir versprechen keine Kunden auf Knopfdruck. Aber wir erstellen eine Website, die Ihr Unternehmen professionell zeigt, Vertrauen aufbaut und bereit ist für Google, Werbung und Empfehlungen.',
      cards: [
        {
          title: 'Klare Struktur',
          description:
            'Ihre Leistungen werden so dargestellt, dass Besucher sofort verstehen, was Sie anbieten.',
        },
        {
          title: 'Professioneller Eindruck',
          description: 'Eine moderne Website schafft Vertrauen - besonders bei Neukunden.',
        },
        {
          title: 'Mobil optimiert',
          description: 'Ihre Website funktioniert sauber auf dem Smartphone, Tablet und Desktop.',
        },
        {
          title: 'Bereit für den nächsten Schritt',
          description:
            'Eine gute Website ist die Grundlage, wenn Sie später Werbung schalten oder besser gefunden werden möchten.',
        },
      ],
    },
    logic: {
      title: 'So gewinnen Sie Kunden über Ihre Website',
      steps: [
        'Ein potenzieller Kunde sucht nach Ihrer Leistung bei Google',
        'Er klickt auf Ihre Website - oder auf die Ihrer Konkurrenz',
        'Innerhalb weniger Sekunden entscheidet er: Bleiben oder gehen',
        'Ist alles klar und verständlich - er nimmt Kontakt auf. Ist es unklar - er ist weg',
      ],
      note: 'Viele Unternehmen verlieren täglich Kunden, weil ihre Website nicht klar zeigt, was sie anbieten.',
    },
    audience: {
      title: 'Für welche Unternehmen ist das besonders passend?',
      cards: [
        'Autowerkstatt',
        'Bau / Handwerk',
        'Beauty / Friseur',
        'Reinigungsservice',
        'Vermietung / lokaler Service',
        'Küchen, Optik, Kanzlei, Fachgeschäft',
      ],
      note:
        'Besonders sinnvoll für kleine Unternehmen, die bereits arbeiten, aber noch keine klare professionelle Website haben.',
    },
    process: {
      title: 'So läuft die Zusammenarbeit ab',
      stepLabel: 'Schritt',
      steps: [
        {
          title: 'Wir schauen uns Ihr Business an',
          description: 'Wir verstehen, wie Sie aktuell Kunden gewinnen – und wo Sie Geld verlieren.',
        },
        {
          title: 'Klare und ehrliche Empfehlung',
          description: 'Sie erfahren, was wirklich sinnvoll ist – und wofür Sie kein Geld ausgeben müssen.',
        },
        {
          title: 'Struktur, die Kunden überzeugt',
          description: 'Wir bauen Ihre Website so auf, dass Besucher verstehen, was Sie anbieten – und anfragen.',
        },
        {
          title: 'Wir übernehmen die komplette Umsetzung',
          description: 'Texte, Design und Technik – Sie müssen sich um nichts kümmern.',
        },
        {
          title: 'Ihre Website bringt Kunden',
          description: 'Ihre Seite geht online und ist bereit, neue Anfragen zu generieren.',
        },
      ],
      note: 'Sie wissen bei jedem Schritt, was gerade passiert. Ohne komplizierte Fachsprache.',
    },
    trust: {
      title: 'Einfach, verständlich und ohne unnötigen Aufwand',
      points: [
        'Direkter Kontakt ohne Umwege. Sie sprechen direkt mit uns – keine Zwischenpersonen, keine Agentur-Struktur',
        'Klare Sprache statt Fachbegriffe. Wir erklären alles so, dass Sie es sofort verstehen',
        'Ehrliche Einschätzung. Sie hören von uns, was wirklich sinnvoll ist – und was nicht',
        'Fokus auf das Wesentliche. Ihre Website wird klar, verständlich und überzeugend für Ihre Kunden',
      ],
      humanTitle: 'Viele Unternehmer sagen:',
      humanText:
        '👉 "Ich kenne mich mit Websites nicht aus. Ich will einfach, dass mir jemand alles verständlich erklärt – und am Ende sieht es sauber und professionell aus."',
    },
    honesty: {
      title: 'Wichtig zu wissen',
      main:
        'Eine Website allein bringt nicht automatisch Besucher. Aber ohne eine gute Website verlieren viele Unternehmen Vertrauen, Sichtbarkeit und Anfragen.',
      extra:
        'Wir erstellen keine leeren Werbeversprechen. Wir schaffen die Grundlage, auf der Ihr Unternehmen online professionell auftreten kann.',
    },
    beforeAfter: {
      title: 'Was sich mit einer klaren Website verändert',
      caseLabel: 'Case',
      beforeLabel: 'Vorher',
      afterLabel: 'Nachher',
      cards: [
        {
          before: '🧰 Lokaler Handwerksbetrieb\nKunden kommen nur über Empfehlungen\nKeine Website, die man zeigen kann',
          after:
            'Eine klare Website, die sofort zeigt, was Sie anbieten\n👉 Kunden melden sich gezielter und wissen, was sie wollen',
        },
        {
          before:
            '💇‍♀️ Dienstleistung (z. B. Friseur, Beauty, Reinigung)\nKunden fragen immer wieder dieselben Dinge\nKein klarer Überblick über Leistungen',
          after: 'Alle Infos auf einen Blick\n👉 Weniger Rückfragen, mehr passende Anfragen',
        },
        {
          before:
            '🚗 Lokales Business (z. B. Autowerkstatt, Vermietung)\nUnklarer Eindruck im Internet oder gar nicht auffindbar\nPotenzielle Kunden gehen zur Konkurrenz',
          after: 'Professioneller erster Eindruck\n👉 Mehr Vertrauen und mehr Anfragen von neuen Kunden',
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Ich kenne mich mit Websites nicht aus. Ist das ein Problem?',
          answer:
            'Nein. Genau dafür ist der Prozess da. Wir erklären alles einfach und verständlich.',
        },
        {
          question: 'Bringt mir eine Website automatisch Kunden?',
          answer:
            'Nein. Eine Website ersetzt keine Werbung. Aber sie ist eine wichtige Grundlage für Sichtbarkeit, Vertrauen und professionelle Präsentation.',
        },
        {
          question: 'Ist das auch für kleine lokale Unternehmen sinnvoll?',
          answer:
            'Ja. Gerade lokale Unternehmen profitieren davon, online klar und professionell sichtbar zu sein.',
        },
        {
          question: 'Muss ich Texte und Inhalte komplett selbst vorbereiten?',
          answer: 'Nein. Wir helfen bei Struktur, Formulierungen und Aufbau.',
        },
        {
          question: 'Was, wenn ich noch nicht sicher bin, ob ich überhaupt eine Website brauche?',
          answer:
            'Dann sagen wir es Ihnen ehrlich. Nicht jedes Unternehmen braucht sofort eine große Lösung.',
        },
        {
          question: 'Wie viel Zeit muss ich selbst investieren?',
          answer:
            'Sehr wenig. In der Regel reicht ein kurzes Gespräch – wir übernehmen den Rest für Sie.',
        },
      ],
    },
    finalCta: {
      title: 'Lassen Sie uns kurz sprechen.',
      subtitle:
        'Sie bekommen eine ehrliche Einschätzung, was für Ihr Unternehmen sinnvoll ist – und was nicht.',
      primary: 'Jetzt unverbindlich anfragen',
      secondary: 'Per WhatsApp schreiben',
    },
    footer: {
      title: 'Vibe Studio',
      description: 'Websites für kleine Unternehmen in Deutschland - klar, modern und verständlich.',
      contact: 'Kontakt',
      whatsapp: 'WhatsApp: +49 1511 0974353',
      email: 'E-Mail: kontakt@erstellen-websiten.de',
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
    },
    floating: {
      whatsapp: 'WhatsApp',
      contact: 'Kontakt',
    },
  },
  ru: {
    lang: {
      current: 'RU',
      switchTo: 'DE',
    },
    nav: {
      studio: 'Vibe Studio',
      region: 'Сайты для малого бизнеса',
      badges: ['Для локального бизнеса', 'Оптимизировано под смартфон', 'Понятно и современно'],
    },
    hero: {
      title: 'Понятный сайт для вашего бизнеса - современный, аккуратный и профессиональный',
      subtitle:
        'Мы делаем сайты для малого бизнеса в Германии: с ясной структурой, адаптацией под мобильные устройства и профессиональной подачей вашей компании.',
      ctaPrimary: 'Начать проект',
      ctaSecondary: 'Посмотреть примеры',
      benefits: [
        'Понятная структура',
        'Оптимизировано под смартфон',
        'Без сложного технического языка',
        'Подходит для локального бизнеса',
      ],
      hint: 'Подходит для ремесла, сервиса, beauty, мастерских, аренды и локальных магазинов',
      mockupTitle: 'Профиль компании',
      mockupSubtitle: 'Локально, ясно, профессионально',
      mobileLabel: 'Мобильная версия',
    },
    problem: {
      title: 'Узнаёте свою ситуацию?',
      cards: [
        'Бизнес работает, но онлайн это почти не видно',
        'Клиенты приходят только по рекомендациям или случайно',
        'Сайта нет или он выглядит устаревшим и непонятным',
        'Понимаете, что нужно что-то делать, но не знаете, с чего начать',
      ],
      summary:
        'Проблема обычно не в вашем предложении. Проблема в том, что компания онлайн не выглядит ясно и профессионально.',
    },
    value: {
      title: 'Без пустых обещаний. Только аккуратная основа для вашего онлайн-присутствия.',
      intro:
        'Мы не обещаем клиентов по кнопке. Но создаём сайт, который профессионально показывает ваш бизнес, формирует доверие и готов к Google, рекламе и рекомендациям.',
      cards: [
        {
          title: 'Понятная структура',
          description: 'Ваши услуги показаны так, чтобы посетитель сразу понял, что вы предлагаете.',
        },
        {
          title: 'Профессиональный вид',
          description: 'Современный сайт вызывает доверие, особенно у новых клиентов.',
        },
        {
          title: 'Мобильная оптимизация',
          description: 'Сайт корректно работает на смартфоне, планшете и компьютере.',
        },
        {
          title: 'Готовность к следующему шагу',
          description: 'Хороший сайт - это база, если позже вы захотите запускать рекламу или улучшать видимость.',
        },
      ],
    },
    logic: {
      title: 'Как сайт приводит клиентов',
      steps: [
        'Потенциальный клиент ищет вашу услугу в Google',
        'Он открывает ваш сайт — или сайт конкурента',
        'За несколько секунд он решает: остаться или уйти',
        'Если всё ясно — оставляет заявку. Если непонятно — уходит',
      ],
      note: 'Многие компании ежедневно теряют клиентов, потому что сайт не показывает ясно, что они предлагают.',
    },
    audience: {
      title: 'Для каких компаний это особенно подходит?',
      cards: [
        'Автосервис',
        'Строительство / ремесло',
        'Beauty / парикмахерская',
        'Клининговый сервис',
        'Аренда / локальный сервис',
        'Кухни, оптика, канцелярия, профильные магазины',
      ],
      note:
        'Особенно полезно для малого бизнеса, который уже работает, но пока не имеет чётко оформленного профессионального сайта.',
    },
    process: {
      title: 'Как проходит сотрудничество',
      stepLabel: 'Шаг',
      steps: [
        {
          title: 'Разбираем ваш бизнес',
          description: 'Понимаем, как вы сейчас получаете клиентов — и где теряете деньги.',
        },
        {
          title: 'Честная и понятная рекомендация',
          description: 'Вы узнаете, что действительно полезно — и на что не стоит тратить бюджет.',
        },
        {
          title: 'Структура, которая убеждает клиентов',
          description: 'Мы выстраиваем сайт так, чтобы посетитель сразу понимал, что вы предлагаете, и оставлял заявку.',
        },
        {
          title: 'Берём на себя всю реализацию',
          description: 'Тексты, дизайн и техническая часть — вам не нужно разбираться в деталях.',
        },
        {
          title: 'Сайт начинает приносить клиентов',
          description: 'Ваш сайт выходит в онлайн и готов получать новые заявки.',
        },
      ],
      note: 'На каждом шаге вы понимаете, что происходит. Без сложной терминологии.',
    },
    trust: {
      title: 'Просто, понятно и без лишних сложностей',
      points: [
        'Прямой контакт без лишних звеньев. Вы общаетесь напрямую с нами — без посредников и агентской структуры',
        'Простое объяснение без сложных терминов. Мы объясняем всё так, чтобы вы понимали сразу',
        'Честная оценка. Вы услышите от нас, что действительно полезно — и что не нужно',
        'Фокус на главном. Ваш сайт будет ясным, понятным и убедительным для ваших клиентов',
      ],
      humanTitle: 'Многие предприниматели говорят:',
      humanText:
        '👉 "Я не разбираюсь в сайтах. Хочу, чтобы мне всё объяснили понятным языком — и в итоге всё выглядело аккуратно и профессионально."',
    },
    honesty: {
      title: 'Важно знать',
      main:
        'Один сайт сам по себе не приводит посетителей автоматически. Но без хорошего сайта многие компании теряют доверие, видимость и обращения.',
      extra:
        'Мы не даём пустых обещаний. Мы создаём основу, на которой ваш бизнес может профессионально выглядеть онлайн.',
    },
    beforeAfter: {
      title: 'Что меняется с понятным сайтом',
      caseLabel: 'Кейс',
      beforeLabel: 'До',
      afterLabel: 'После',
      cards: [
        {
          before: '🧰 Локальный бизнес в сфере услуг\nКлиенты приходят только по рекомендациям\nНет сайта, который можно показать',
          after: 'Понятный сайт, который сразу показывает, что вы предлагаете\n👉 Клиенты обращаются более осознанно и понимают, что им нужно',
        },
        {
          before: '💇‍♀️ Услуги (например, парикмахер, beauty, клининг)\nКлиенты снова и снова задают одни и те же вопросы\nНет ясного обзора услуг',
          after: 'Вся информация в одном месте\n👉 Меньше уточняющих вопросов, больше целевых обращений',
        },
        {
          before: '🚗 Локальный бизнес (например, автосервис, аренда)\nНечёткое впечатление в интернете или вас вообще не находят\nПотенциальные клиенты уходят к конкурентам',
          after: 'Профессиональное первое впечатление\n👉 Больше доверия и больше обращений от новых клиентов',
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Я не разбираюсь в сайтах. Это проблема?',
          answer:
            'Нет. Для этого и нужен процесс: мы объясняем всё просто и понятно.',
        },
        {
          question: 'Сайт автоматически приведёт клиентов?',
          answer:
            'Нет. Сайт не заменяет рекламу. Но это важная основа для видимости, доверия и профессиональной презентации.',
        },
        {
          question: 'Это подходит маленькому локальному бизнесу?',
          answer:
            'Да. Локальным компаниям особенно важно быть в интернете понятно и профессионально представленными.',
        },
        {
          question: 'Мне нужно самому готовить тексты и материалы?',
          answer:
            'Нет. Мы помогаем со структурой, формулировками и построением контента.',
        },
        {
          question: 'Что если я пока не уверен, нужен ли мне сайт?',
          answer:
            'Мы честно скажем. Не каждому бизнесу сразу нужна большая и сложная версия.',
        },
        {
          question: 'Сколько времени мне нужно будет вкладывать лично?',
          answer:
            'Очень мало. Обычно достаточно короткого разговора — остальное мы берём на себя.',
        },
      ],
    },
    finalCta: {
      title: 'Давайте коротко созвонимся.',
      subtitle:
        'Вы получите честную оценку: что действительно полезно для вашего бизнеса, а что нет.',
      primary: 'Оставить запрос без обязательств',
      secondary: 'Написать в WhatsApp',
    },
    footer: {
      title: 'Vibe Studio',
      description: 'Сайты для малого бизнеса в Германии - понятно, современно и аккуратно.',
      contact: 'Контакт',
      whatsapp: 'WhatsApp: +49 1511 0974353',
      email: 'E-Mail: kontakt@erstellen-websiten.de',
      legal: {
        impressum: 'Impressum',
        privacy: 'Datenschutz',
      },
    },
    floating: {
      whatsapp: 'WhatsApp',
      contact: 'Контакт',
    },
  },
}
