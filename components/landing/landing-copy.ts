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
    about: string
    quizBrief: string
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
      title: 'Mehr Kundenanfragen über Ihre Website – einfach und ohne Aufwand',
      subtitle:
        'Wir erstellen Websites für kleine Unternehmen in Deutschland, die klar zeigen, was Sie anbieten – und warum Kunden sich bei Ihnen melden.',
      ctaPrimary: 'Kostenlose Einschätzung starten',
      ctaSecondary: 'Beispiele ansehen',
      benefits: [
        'Klare Struktur, die Kunden sofort verstehen',
        'Funktioniert perfekt auf dem Smartphone',
        'Ohne komplizierte Fachbegriffe',
        'Speziell für lokale Unternehmen gemacht',
        'Ohne technisches Wissen',
        'Wir übernehmen alles für Sie',
        'Dauert nur 10–15 Minuten im Erstgespräch',
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
        'Das Problem ist oft nicht Ihr Angebot. Das Problem ist, dass Ihr Unternehmen online nicht klar und professionell sichtbar ist. Viele Besucher entscheiden in wenigen Sekunden, ob sie bleiben oder gehen.',
    },
    value: {
      title: 'Keine leeren Versprechen – sondern eine Website, die für Sie arbeitet',
      intro:
        'Wir versprechen keine Wunder über Nacht. Aber wir sorgen dafür, dass Ihr Unternehmen online klar wirkt, Vertrauen aufbaut und aus Besuchern Anfragen werden.',
      cards: [
        {
          title: 'Klare Struktur',
          description:
            'Ihre Leistungen werden so dargestellt, dass Besucher sofort verstehen, was Sie anbieten.',
        },
        {
          title: 'Professioneller Eindruck',
          description: 'Eine professionelle Website schafft Vertrauen - besonders bei Neukunden.',
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
        'Ist alles klar und verständlich, nimmt er Kontakt auf. Ist es unklar, klickt er weiter.',
      ],
      note: 'Viele Unternehmen verlieren täglich Kunden, weil ihre Website nicht klar zeigt, was sie anbieten.',
    },
    audience: {
      title: 'Für welche Unternehmen ist das besonders passend?',
      cards: [
        'Autowerkstatt – Viele Anfragen, aber oft unklar, was genau angeboten wird',
        'Bau / Handwerk – Stark abhängig von Empfehlungen, wenig planbar',
        'Beauty / Friseur – Kunden fragen immer wieder dieselben Dinge',
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
          title: 'Wir schauen uns Ihr Unternehmen an',
          description: 'Wir sehen, wie Sie heute Kunden gewinnen – und wo Anfragen verloren gehen.',
        },
        {
          title: 'Klare und ehrliche Empfehlung',
          description: 'Sie erfahren, was wirklich sinnvoll ist – und wofür Sie kein Geld ausgeben müssen.',
        },
        {
          title: 'Struktur, die Vertrauen schafft',
          description: 'Wir bauen Ihre Website so auf, dass Besucher verstehen, was Sie anbieten – und anfragen.',
        },
        {
          title: 'Wir übernehmen die komplette Umsetzung',
          description: 'Texte, Design und Technik – Sie müssen sich um nichts kümmern.',
        },
        {
          title: 'Ihre Website ist bereit für neue Anfragen',
          description: 'Ihre Seite geht online und ist bereit, neue Anfragen zu generieren.',
        },
      ],
      note: 'Sie wissen bei jedem Schritt, was gerade passiert. Ohne komplizierte Fachsprache.',
    },
    trust: {
      title: 'Einfach, verständlich und ohne unnötigen Aufwand',
      points: [
        'Direkter Kontakt ohne Umwege. Sie sprechen direkt mit uns – ohne Zwischenpersonen',
        'Klare Sprache statt Fachbegriffe. Wir erklären alles so, dass Sie es sofort verstehen',
        'Ehrliche Einschätzung. Sie hören von uns, was wirklich sinnvoll ist – und was nicht',
        'Fokus auf das Wesentliche. Ihre Website wird klar, verständlich und überzeugend für Ihre Kunden',
        'Passend für kleine Unternehmen in Deutschland, die bereits am Markt sind',
        'Bereits umgesetzt für lokale Betriebe',
      ],
      humanTitle: 'Viele Unternehmer sagen:',
      humanText:
        '👉 "Ich kenne mich mit Websites nicht aus. Ich will einfach, dass mir jemand alles verständlich erklärt – und am Ende sieht es sauber und professionell aus."',
    },
    honesty: {
      title: 'Wichtig zu wissen',
      main:
        'Eine Website bringt nicht automatisch Kunden – aber ohne sie geht oft Vertrauen verloren.',
      extra:
        'Wir erstellen keine leeren Werbeversprechen. Wir schaffen die Grundlage, auf der Ihr Unternehmen online professionell auftreten kann.',
    },
    beforeAfter: {
      title: 'Was sich mit einer klaren Website verändert',
      caseLabel: 'Fall',
      beforeLabel: 'Vorher',
      afterLabel: 'Nachher',
      cards: [
        {
          before: 'Kunden nur über Empfehlungen, keine Website.',
          after:
            'Eine klare Website zeigt Ihr Angebot auf einen Blick.',
        },
        {
          before: 'Viele Rückfragen, Leistungen unklar.',
          after: 'Alle Informationen sind auf der Website — weniger Klärungsbedarf.',
        },
        {
          before: 'Online kaum sichtbar oder kein klarer Eindruck — Kunden gehen zur Konkurrenz.',
          after: 'Eine professionelle Website schafft Vertrauen und fördert Anfragen.',
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
        {
          question: 'Was kostet eine einfache Website bei Ihnen?',
          answer:
            'Viele Projekte starten ab 400€. Der genaue Preis hängt davon ab, was Sie wirklich brauchen – wir sagen Ihnen das ehrlich im Gespräch.',
        },
      ],
    },
    finalCta: {
      title: 'Unsicher, ob sich eine Website für Sie lohnt?',
      subtitle:
        'Lassen Sie uns kurz sprechen. Sie bekommen eine klare Einschätzung – verständlich und ohne Verpflichtung. Dauert nur 10–15 Minuten.',
      primary: 'Jetzt unverbindlich anfragen',
      secondary: 'Per WhatsApp schreiben',
    },
    footer: {
      title: 'Vibe Studio',
      description: 'Websites für kleine Unternehmen in Deutschland - klar, modern und verständlich.',
      contact: 'Kontakt',
      whatsapp: 'WhatsApp: +49 1511 0974353',
      email: 'E-Mail: kontakt@erstellen-websiten.de',
      about: 'Über mich',
      quizBrief: 'Brief zur Website-Entwicklung',
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
      title: 'Больше заявок через ваш сайт — просто и без лишних сложностей',
      subtitle:
        'Мы создаём сайты для малого бизнеса в Германии, которые ясно показывают, что вы предлагаете — и почему клиенты выбирают именно вас.',
      ctaPrimary: 'Начать бесплатную оценку',
      ctaSecondary: 'Посмотреть примеры',
      benefits: [
        'Понятная структура, которую клиент сразу понимает',
        'Идеально работает на смартфоне',
        'Без сложных технических терминов',
        'Сделано специально для локального бизнеса',
        'Без технических знаний с вашей стороны',
        'Мы берём всё на себя',
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
        'Проблема обычно не в вашем предложении. Проблема в том, что компания онлайн не выглядит ясно и профессионально. Многие посетители решают за несколько секунд: остаться или уйти.',
    },
    value: {
      title: 'Без пустых обещаний — а сайт, который работает на вас',
      intro:
        'Мы не обещаем чудес за одну ночь. Но делаем так, чтобы ваш бизнес выглядел онлайн ясно, вызывал доверие и превращал посетителей в заявки.',
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
        'Автосервис — много обращений, но часто непонятно, что именно вы делаете',
        'Строительство / ремесло — сильная зависимость от рекомендаций, мало предсказуемости',
        'Beauty / парикмахерская — клиенты постоянно задают одни и те же вопросы',
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
          title: 'Сайт готов приносить новые заявки',
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
        'Подходит для малого бизнеса в Германии, который уже работает',
        'Уже реализовано для локальных компаний',
      ],
      humanTitle: 'Многие предприниматели говорят:',
      humanText:
        '👉 "Я не разбираюсь в сайтах. Хочу, чтобы мне всё объяснили понятным языком — и в итоге всё выглядело аккуратно и профессионально."',
    },
    honesty: {
      title: 'Важно знать',
      main:
        'Сайт не приводит клиентов автоматически — но без сайта вы теряете их каждый день.',
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
          after: 'Понятный сайт, который сразу показывает, что вы предлагаете\n👉 Клиенты обращаются более осознанно и понимают, что им нужно\n👉 Результат: больше целевых заявок и меньше повторяющихся вопросов',
        },
        {
          before: '💇‍♀️ Услуги (например, парикмахер, beauty, клининг)\nКлиенты снова и снова задают одни и те же вопросы\nНет ясного обзора услуг',
          after: 'Вся информация в одном месте\n👉 Меньше уточняющих вопросов, больше целевых обращений\n👉 Результат: больше целевых заявок и меньше повторяющихся вопросов',
        },
        {
          before: '🚗 Локальный бизнес (например, автосервис, аренда)\nНечёткое впечатление в интернете или вас вообще не находят\nПотенциальные клиенты уходят к конкурентам',
          after: 'Профессиональное первое впечатление\n👉 Больше доверия и больше обращений от новых клиентов\n👉 Результат: больше целевых заявок и меньше повторяющихся вопросов',
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
        {
          question: 'Сколько у вас стоит простой сайт?',
          answer:
            'Многие проекты стартуют от 400€. Точная стоимость зависит от того, что вам действительно нужно — мы честно обсудим это в разговоре.',
        },
      ],
    },
    finalCta: {
      title: 'Не уверены, окупится ли вам сайт?',
      subtitle:
        'Давайте коротко поговорим. Вы получите понятную оценку — без сложных терминов и без обязательств. Это займёт всего 10–15 минут.',
      primary: 'Оставить запрос без обязательств',
      secondary: 'Написать в WhatsApp',
    },
    footer: {
      title: 'Vibe Studio',
      description: 'Сайты для малого бизнеса в Германии - понятно, современно и аккуратно.',
      contact: 'Контакт',
      whatsapp: 'WhatsApp: +49 1511 0974353',
      email: 'E-Mail: kontakt@erstellen-websiten.de',
      about: 'Обо мне',
      quizBrief: 'Бриф на разработку сайта',
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
