export type PortfolioItem = {
  title: string
  description: string
  image: string
  tech: string[]
  size: 'lg' | 'sm'
  url?: string
}

export type PortfolioText = {
  title: string
  subtitle: string
  items: PortfolioItem[]
}

export const portfolioCopy: Record<'de' | 'ru', PortfolioText> = {
  de: {
    title: 'Beispiele von Webseiten',
    subtitle: 'Hier sehen Sie, wie Webseiten für verschiedene Branchen und Aufgaben aussehen können.',
    items: [
      {
        title: 'Speicher Balkonkraftwerk',
        description:
          'Landingpage für Solarmodule und Energiespeicher. Mehrsprachig, Rechner, klare Handlungsaufforderung.\nZiel: mehr Anfragen\nFokus: klare Struktur\nErgebnis: bessere Verständlichkeit',
        image: '/images/portfolio-speicher.webp',
        tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
        size: 'lg',
        url: 'https://speicher-balkonkraftwerk.de/ru/',
      },
      {
        title: 'Psycholog UA/RU',
        description:
          'Webseite für psychologische Beratung mit ukrainischer und russischer Sprachversion. Klare Leistungsdarstellung und direkter Kontakt.\nZiel: mehr Anfragen\nFokus: klare Struktur\nErgebnis: bessere Verständlichkeit',
        image: '/images/portfolio-psycholog-ua-ru.webp',
        tech: ['Next.js', 'i18n', 'SEO', 'Vercel'],
        size: 'sm',
        url: 'https://psycholog-ua-ru.de/',
      },
      {
        title: 'CuteColor',
        description:
          'Portfolio-Website für eine Illustratorin. Ruhiger erster Eindruck, klare Navigation und direkte Kontaktwege.\nZiel: Arbeiten zeigen\nFokus: visuelle Präsentation\nErgebnis: schneller Kontakt',
        image: '/images/portfolio-cutecolor.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/cutecolor/',
      },
      {
        title: 'WohnWagen',
        description:
          'Webseite für Wohnmobil-Vermietung in Mittelhessen. Klare Angebotspakete, direkter Kontakt und ruhige Struktur.\nZiel: mehr Anfragen\nFokus: klare Darstellung\nErgebnis: schnellerer Einstieg',
        image: '/images/portfolio-wohnwagen.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/WohnWagen/',
      },
      {
        title: 'Beauty Studio Lesya',
        description:
          'Webseite des Beauty-Studios für Permanent-Make-up in Braunfels. Elegantes Design, Galerie.\nZiel: mehr Anfragen\nFokus: klare Struktur\nErgebnis: bessere Verständlichkeit',
        image: '/images/portfolio-lesia.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/-Lesia/',
      },
      {
        title: 'BewerbungProfi',
        description:
          'KI-Generator für Bewerbungsanschreiben in Deutschland. OpenAI API, Mehrsprachigkeit, PDF.\nZiel: mehr Anfragen\nFokus: klare Struktur\nErgebnis: bessere Verständlichkeit',
        image: '/images/portfolio-bewerbungprofi.webp',
        tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
        size: 'sm',
        url: 'https://bewerbungprofi.de/',
      },
      {
        title: 'Dienstleistungen für Hundehalter',
        description:
          'Angebot für Hundehalter. Buchung, Leistungskatalog, modernes Design.\nZiel: mehr Anfragen\nFokus: klare Struktur\nErgebnis: bessere Verständlichkeit',
        image: '/images/portfolio-dogs.webp',
        tech: ['React', 'TypeScript', 'DigitalOcean'],
        size: 'lg',
        url: 'https://dog-app-iw6ow.ondigitalocean.app/',
      },
    ],
  },
  ru: {
    title: 'Примеры сайтов',
    subtitle: 'Здесь можно посмотреть, как выглядят сайты для разных ниш и задач.',
    items: [
      {
        title: 'Speicher Balkonkraftwerk',
        description:
          'Лендинг для солнечных модулей и накопителей энергии. Мультиязычность, калькулятор, конверсионный CTA.\nЦель: больше заявок\nФокус: понятная структура\nРезультат: лучшая понятность для клиентов',
        image: '/images/portfolio-speicher.webp',
        tech: ['Next.js', 'Tailwind', 'i18n', 'Vercel'],
        size: 'lg',
        url: 'https://speicher-balkonkraftwerk.de/ru/',
      },
      {
        title: 'Psycholog UA/RU',
        description:
          'Сайт психолога с версиями на украинском и русском языках. Чёткая подача услуг и удобный контакт.\nЦель: больше заявок\nФокус: понятная структура\nРезультат: лучшая понятность для клиентов',
        image: '/images/portfolio-psycholog-ua-ru.webp',
        tech: ['Next.js', 'i18n', 'SEO', 'Vercel'],
        size: 'sm',
        url: 'https://psycholog-ua-ru.de/',
      },
      {
        title: 'CuteColor',
        description:
          'Сайт-портфолио для иллюстратора. Спокойный первый экран, понятная навигация и прямые способы связи.\nЦель: показать работы\nФокус: визуальная подача\nРезультат: быстрый контакт',
        image: '/images/portfolio-cutecolor.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/cutecolor/',
      },
      {
        title: 'WohnWagen',
        description:
          'Сайт для аренды кемперов в Центральном Гессене. Чёткие пакеты, прямой контакт и спокойная структура.\nЦель: больше заявок\nФокус: понятная подача\nРезультат: более быстрый старт',
        image: '/images/portfolio-wohnwagen.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/WohnWagen/',
      },
      {
        title: 'Beauty Studio Lesya',
        description:
          'Сайт бьюти-студии перманентного макияжа в Браунфельсе. Элегантный дизайн, галерея работ.\nЦель: больше заявок\nФокус: понятная структура\nРезультат: лучшая понятность для клиентов',
        image: '/images/portfolio-lesia.webp',
        tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],
        size: 'sm',
        url: 'https://konstantinglazunov.github.io/-Lesia/',
      },
      {
        title: 'BewerbungProfi',
        description:
          'AI-генератор сопроводительных писем для работы в Германии. OpenAI API, мультиязычность, PDF.\nЦель: больше заявок\nФокус: понятная структура\nРезультат: лучшая понятность для клиентов',
        image: '/images/portfolio-bewerbungprofi.webp',
        tech: ['Next.js', 'OpenAI API', 'Oracle Cloud', 'DSGVO'],
        size: 'sm',
        url: 'https://bewerbungprofi.de/',
      },
      {
        title: 'Dogs Services',
        description:
          'Сервис для владельцев собак. Бронирование, каталог услуг, современный UI.\nЦель: больше заявок\nФокус: понятная структура\nРезультат: лучшая понятность для клиентов',
        image: '/images/portfolio-dogs.webp',
        tech: ['React', 'TypeScript', 'DigitalOcean'],
        size: 'lg',
        url: 'https://dog-app-iw6ow.ondigitalocean.app/',
      },
    ],
  },
}
