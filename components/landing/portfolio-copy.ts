export type LocaleKey = 'de' | 'ru'

export type HomeCaseStudy = {
  label: string
  title: string
  before: string
  after: string
  image: string
  imageAlt: string
}

export type HomeCaseStudyCopy = {
  title: string
  subtitle: string
  items: HomeCaseStudy[]
  cta: string
}

export type PortfolioProject = {
  title: string
  description: string
  task: string
  implementation: string
  functions: string
  tech: string[]
  image: string
  imageAlt: string
  url?: string
}

export type PortfolioPageCopy = {
  title: string
  intro: string
  projects: PortfolioProject[]
}

export const homeCaseStudyCopy: Record<LocaleKey, HomeCaseStudyCopy> = {
  de: {
    title: 'Was sich mit einer verständlichen Website verändert',
    subtitle:
      'Konkrete Situationen aus kleinen Projekten: weniger Erklären, klarere Struktur und ein besserer erster Eindruck.',
    cta: 'Weitere Beispiele ansehen',
    items: [
      {
        label: 'Situation 1',
        title: 'Wenn es noch keine klare Website gibt',
        before:
          'Vorher: Es gibt keine gute Seite, die man in Visitenkarte, Google Business Profile, WhatsApp oder Anzeigen verlinken kann.',
        after:
          'Nachher: Es gibt eine verständliche Online-Seite, auf der Leistungen, Kontakt und nächste Schritte klar erklärt sind.',
        image: '/images/portfolio-speicher.webp',
        imageAlt: 'Speicher Balkonkraftwerk Website Preview',
      },
      {
        label: 'Situation 2',
        title: 'Wenn Kunden immer wieder dieselben Fragen stellen',
        before:
          'Vorher: Viele Dinge müssen einzeln erklärt werden: Leistungen, Ablauf, Sprachen, Kontakt und Erwartungen.',
        after:
          'Nachher: Die Website beantwortet die wichtigsten Fragen vor dem ersten Kontakt und macht die Anfrage konkreter.',
        image: '/images/portfolio-psycholog-ua-ru.webp',
        imageAlt: 'Psycholog UA/RU Website Preview',
      },
      {
        label: 'Situation 3',
        title: 'Wenn der erste Eindruck im Internet schwach ist',
        before:
          'Vorher: Das Unternehmen ist online schwer einzuschätzen. Es gibt wenig Struktur, wenig Vertrauen und keinen klaren nächsten Schritt.',
        after:
          'Nachher: Der Auftritt wirkt geordneter, professioneller und macht es leichter, Kontakt aufzunehmen.',
        image: '/images/portfolio-cutecolor.webp',
        imageAlt: 'CuteColor Website Preview',
      },
    ],
  },
  ru: {
    title: 'Что меняется с понятным сайтом',
    subtitle:
      'Конкретные ситуации из небольших проектов: меньше объяснений вручную, понятнее структура и лучшее первое впечатление.',
    cta: 'Смотреть другие примеры',
    items: [
      {
        label: 'Ситуация 1',
        title: 'Когда ещё нет понятного сайта',
        before:
          'Было: нет нормальной страницы, которую можно поставить в визитку, Google Business Profile, WhatsApp или объявление.',
        after:
          'Стало: есть понятная интернет-витрина, где услуги, контакт и следующий шаг объяснены без лишних вопросов.',
        image: '/images/portfolio-speicher.webp',
        imageAlt: 'Превью сайта Speicher Balkonkraftwerk',
      },
      {
        label: 'Ситуация 2',
        title: 'Когда клиенты постоянно задают одни и те же вопросы',
        before:
          'Было: услуги, формат работы, языки, контакт и ожидания приходится объяснять вручную.',
        after:
          'Стало: сайт заранее отвечает на основные вопросы, и обращение становится более конкретным.',
        image: '/images/portfolio-psycholog-ua-ru.webp',
        imageAlt: 'Превью сайта Psycholog UA/RU',
      },
      {
        label: 'Ситуация 3',
        title: 'Когда первое впечатление в интернете слабое',
        before:
          'Было: по интернету сложно понять, чем занимается бизнес, можно ли доверять и что делать дальше.',
        after:
          'Стало: сайт выглядит собранно, профессионально и помогает быстрее перейти к контакту.',
        image: '/images/portfolio-cutecolor.webp',
        imageAlt: 'Превью сайта CuteColor',
      },
    ],
  },
}

export const portfolioPageCopy: Record<LocaleKey, PortfolioPageCopy> = {
  de: {
    title: 'Beispiele für Websites',
    intro:
      'Hier sind sieben konkrete Beispiele für Websites aus unterschiedlichen Branchen und Aufgaben. Auf der Startseite sehen Sie nur kurze Situationen - hier können Sie die Projekte genauer ansehen.',
    projects: [
      {
        title: 'Speicher Balkonkraftwerk',
        description:
          'Landingpage für Solarmodule und Energiespeicher mit Mehrsprachigkeit, Rechner und klarem Anfrage-CTA.',
        task: 'Ein erklärungsbedürftiges Produkt verständlich darstellen.',
        implementation:
          'Klare Seitenstruktur, Nutzenargumente, mehrsprachige Inhalte und ein Rechner als Orientierungshilfe.',
        functions: 'Mehrsprachigkeit, Rechner, Kontakt-CTA, responsive Darstellung.',
        tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
        image: '/images/portfolio-speicher.webp',
        imageAlt: 'Speicher Balkonkraftwerk Website Screenshot',
        url: 'https://speicher-balkonkraftwerk.de/ru/',
      },
      {
        title: 'Psycholog UA/RU',
        description:
          'Website für eine Psychologin mit ukrainischer und russischer Sprachversion. Ruhige Darstellung der Leistungen und einfache Kontaktaufnahme.',
        task: 'Psychologische Leistungen ruhig und verständlich präsentieren.',
        implementation:
          'Reduzierte Gestaltung, klare Texte, Sprachversionen und einfache Kontaktmöglichkeiten.',
        functions: 'Mehrsprachigkeit, Kontaktmöglichkeit, SEO-Grundstruktur, responsive Darstellung.',
        tech: ['Next.js', 'i18n', 'SEO', 'Vercel'],
        image: '/images/portfolio-psycholog-ua-ru.webp',
        imageAlt: 'Psycholog UA/RU Website Screenshot',
        url: 'https://psycholog-ua-ru.de/',
      },
      {
        title: 'CuteColor',
        description:
          'Website für ein visuelles oder kreatives Projekt mit Fokus auf klare Darstellung, mobile Ansicht und einfache Nutzung.',
        task: 'Ein visuelles Projekt klar präsentieren.',
        implementation: 'Saubere visuelle Struktur, einfache Navigation und mobile Darstellung.',
        functions: 'Responsive Design, Projektpräsentation, klare Navigation.',
        tech: ['Next.js', 'Tailwind', 'Responsive Design', 'Vercel'],
        image: '/images/portfolio-cutecolor.webp',
        imageAlt: 'CuteColor Website Screenshot',
        url: 'https://konstantinglazunov.github.io/cutecolor/',
      },
      {
        title: 'WohnWagen',
        description:
          'Website für Wohnmobil-Vermietung in Mittelhessen mit klaren Angebotsinfos, direktem Kontakt und ruhiger Struktur.',
        task: 'Ein Vermietungsangebot übersichtlich und vertrauensvoll zeigen.',
        implementation:
          'Klare Angebotsblöcke, direkte Kontaktwege und eine ruhige Informationshierarchie.',
        functions: 'Angebotsdarstellung, Kontakt-CTA, responsive Darstellung.',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        image: '/images/portfolio-wohnwagen.webp',
        imageAlt: 'WohnWagen Website Screenshot',
        url: 'https://konstantinglazunov.github.io/WohnWagen/',
      },
      {
        title: 'Beauty Studio Lesya',
        description:
          'Website für ein Beauty-Studio für Permanent-Make-up in Braunfels. Elegantes Design und Galerie.',
        task: 'Ein Beauty-Angebot ansprechend und ruhig präsentieren.',
        implementation:
          'Elegante Bildsprache, klare Leistungsdarstellung und gut sichtbare Kontaktwege.',
        functions: 'Galerie, Kontaktmöglichkeiten, responsive Darstellung.',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        image: '/images/portfolio-lesia.webp',
        imageAlt: 'Beauty Studio Lesya Website Screenshot',
        url: 'https://konstantinglazunov.github.io/-Lesia/',
      },
      {
        title: 'BewerbungProfi',
        description:
          'KI-Tool für Bewerbungsanschreiben in Deutschland mit Spracheinstellungen und PDF-Export.',
        task: 'Den Prozess der Bewerbungsbrief-Erstellung vereinfachen.',
        implementation:
          'Geführter Ablauf, klare Eingaben, automatische Textgenerierung und PDF-Ausgabe.',
        functions: 'OpenAI API, Mehrsprachigkeit, PDF-Export, automatisierte Dokumentenerstellung.',
        tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
        image: '/images/portfolio-bewerbungprofi.webp',
        imageAlt: 'BewerbungProfi Website Screenshot',
        url: 'https://bewerbungprofi.de/',
      },
      {
        title: 'Dogs Services',
        description:
          'Service-Website für Hundehalter mit Buchung, Angebotsübersicht und modernem UI.',
        task: 'Leistungen für Hundehalter klar bündeln und Buchungen erleichtern.',
        implementation:
          'Klarer Angebotskatalog, sichtbare CTA-Flows und eine aufgeräumte Nutzerführung.',
        functions: 'Buchung, Leistungskatalog, kontaktnahe Interaktion, responsive Darstellung.',
        tech: ['React', 'TypeScript', 'DigitalOcean'],
        image: '/images/portfolio-dogs.webp',
        imageAlt: 'Dogs Services Website Screenshot',
        url: 'https://dog-app-iw6ow.ondigitalocean.app/',
      },
    ],
  },
  ru: {
    title: 'Примеры сайтов',
    intro:
      'Здесь собраны семь конкретных примеров сайтов для разных ниш и задач. На главной показаны только короткие ситуации - здесь можно посмотреть проекты подробнее.',
    projects: [
      {
        title: 'Speicher Balkonkraftwerk',
        description:
          'Лендинг для солнечных модулей и накопителей энергии с мультиязычностью, калькулятором и понятным CTA для заявки.',
        task: 'Понятно объяснить сложный продукт.',
        implementation:
          'Чёткая структура страницы, аргументы пользы, языковые версии и калькулятор как ориентир для клиента.',
        functions: 'Мультиязычность, калькулятор, CTA для заявки, адаптивная версия.',
        tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
        image: '/images/portfolio-speicher.webp',
        imageAlt: 'Скриншот сайта Speicher Balkonkraftwerk',
        url: 'https://speicher-balkonkraftwerk.de/ru/',
      },
      {
        title: 'Psycholog UA/RU',
        description:
          'Сайт психолога с украинской и русской версиями. Спокойная подача услуг и удобный контакт.',
        task: 'Спокойно и понятно представить услуги психолога.',
        implementation:
          'Сдержанный дизайн, понятные тексты, языковые версии и простой контакт.',
        functions: 'Мультиязычность, контакт, базовая SEO-структура, адаптивная версия.',
        tech: ['Next.js', 'i18n', 'SEO', 'Vercel'],
        image: '/images/portfolio-psycholog-ua-ru.webp',
        imageAlt: 'Скриншот сайта Psycholog UA/RU',
        url: 'https://psycholog-ua-ru.de/',
      },
      {
        title: 'CuteColor',
        description:
          'Сайт для визуального или креативного проекта с фокусом на понятную подачу, мобильную версию и простую навигацию.',
        task: 'Понятно представить визуальный проект.',
        implementation: 'Аккуратная визуальная структура, простая навигация и мобильная версия.',
        functions: 'Адаптивный дизайн, презентация проекта, понятная навигация.',
        tech: ['Next.js', 'Tailwind', 'Responsive Design', 'Vercel'],
        image: '/images/portfolio-cutecolor.webp',
        imageAlt: 'Скриншот сайта CuteColor',
        url: 'https://konstantinglazunov.github.io/cutecolor/',
      },
      {
        title: 'WohnWagen',
        description:
          'Сайт для аренды кемперов в Центральном Гессене с понятной подачей предложений, прямым контактом и спокойной структурой.',
        task: 'Понятно показать предложение по аренде.',
        implementation:
          'Чёткие блоки с предложениями, прямые контакты и спокойная иерархия информации.',
        functions: 'Подача предложений, CTA для связи, адаптивная версия.',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        image: '/images/portfolio-wohnwagen.webp',
        imageAlt: 'Скриншот сайта WohnWagen',
        url: 'https://konstantinglazunov.github.io/WohnWagen/',
      },
      {
        title: 'Beauty Studio Lesya',
        description:
          'Сайт бьюти-студии для перманентного макияжа в Браунфельсе. Элегантный дизайн и галерея работ.',
        task: 'Красиво и спокойно представить бьюти-услугу.',
        implementation:
          'Элегантная визуальная подача, чёткое описание услуг и хорошо заметные способы связи.',
        functions: 'Галерея, контакт, адаптивная версия.',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        image: '/images/portfolio-lesia.webp',
        imageAlt: 'Скриншот сайта Beauty Studio Lesya',
        url: 'https://konstantinglazunov.github.io/-Lesia/',
      },
      {
        title: 'BewerbungProfi',
        description:
          'AI-инструмент для сопроводительных писем в Германии с языковыми настройками и экспортом в PDF.',
        task: 'Упростить создание сопроводительных писем.',
        implementation:
          'Пошаговый сценарий, понятные поля, автоматическая генерация текста и выгрузка в PDF.',
        functions: 'OpenAI API, мультиязычность, PDF-экспорт, автоматизация документов.',
        tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
        image: '/images/portfolio-bewerbungprofi.webp',
        imageAlt: 'Скриншот сайта BewerbungProfi',
        url: 'https://bewerbungprofi.de/',
      },
      {
        title: 'Dogs Services',
        description:
          'Сервис для владельцев собак с записью, каталогом услуг и современным интерфейсом.',
        task: 'Собрать услуги для владельцев собак в понятную структуру и упростить бронирование.',
        implementation:
          'Понятный каталог услуг, заметные CTA и аккуратный сценарий взаимодействия.',
        functions: 'Бронирование, каталог услуг, контактные сценарии, адаптивная версия.',
        tech: ['React', 'TypeScript', 'DigitalOcean'],
        image: '/images/portfolio-dogs.webp',
        imageAlt: 'Скриншот сайта Dogs Services',
        url: 'https://dog-app-iw6ow.ondigitalocean.app/',
      },
    ],
  },
}
