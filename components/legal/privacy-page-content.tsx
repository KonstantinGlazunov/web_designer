'use client'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { useSitePreferences } from '@/components/providers/site-preferences'
import type { Locale } from '@/lib/translations'

type Section = {
  title: string
  paragraphs: string[]
}

const privacyCopy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    sections: Section[]
  }
> = {
  de: {
    eyebrow: 'Datenschutzerklärung',
    title: 'Hinweise zum Datenschutz',
    sections: [
      {
        title: '1. Verantwortlicher',
        paragraphs: ['Konstantin Glazunov', 'Braunfels, Lindenstraße 16', 'E-Mail: glazunov.const@gmail.com', 'WhatsApp: +49 1511 0974353'],
      },
      {
        title: '2. Zwecke und Rechtsgrundlagen der Verarbeitung',
        paragraphs: [
          'Wir verarbeiten personenbezogene Daten nur, wenn dies rechtlich erlaubt ist. Je nach Vorgang verarbeiten wir Daten insbesondere auf Grundlage von Art. 6 Abs. 1 lit. a, b und f DSGVO.',
          'Betrieb der Webseite und technische Sicherheit (z. B. Server-Logs): Art. 6 Abs. 1 lit. f DSGVO.',
          'Bearbeitung von Kontaktanfragen (E-Mail, Formular, Chat): Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation) und hilfsweise Art. 6 Abs. 1 lit. f DSGVO.',
          'Lead-Erfassung per Quiz und Chat inklusive Weiterleitung in Telegram zur Anfragebearbeitung: Art. 6 Abs. 1 lit. b DSGVO.',
          'Einsatz von Google Analytics (Mess-ID G-H8XXSDP9W4) nur nach Einwilligung: Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit Paragraf 25 Abs. 1 TDDDG.',
          'Speicherung Ihrer Cookie-Auswahl im localStorage: Paragraf 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO.',
        ],
      },
      {
        title: '3. Hosting, Domain und technische Protokolle',
        paragraphs: [
          'Die Webseite wird auf einer virtuellen Maschine bei Oracle Cloud Infrastructure (OCI) betrieben. Im Rahmen des Hostings können technische Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, angefragte URL, User-Agent) in Server-Logs verarbeitet werden.',
          'Die Verarbeitung erfolgt zur stabilen Bereitstellung, Fehleranalyse und IT-Sicherheit (Art. 6 Abs. 1 lit. f DSGVO).',
          'Domain- und DNS-Leistungen werden über den jeweils eingesetzten Anbieter bereitgestellt. Dabei fallen technisch erforderliche Verarbeitungen beim jeweiligen Anbieter an.',
        ],
      },
      {
        title: '4. Eingesetzte Empfänger und Dienstleister',
        paragraphs: [
          'Für den Betrieb dieser Webseite können folgende Empfänger bzw. Dienstleister Daten erhalten:',
          'Hosting: Oracle Cloud Infrastructure (Serverbetrieb).',
          'Webanalyse (optional, nur nach Einwilligung): Google Analytics 4 (Google).',
          'KI-gestützter Chat: OpenAI (Verarbeitung von Chat-Inhalten zur Antwortgenerierung).',
          'Lead-Benachrichtigung: Telegram (Übermittlung von Anfrageinhalten an den hinterlegten Geschäfts-Chat).',
        ],
      },
      {
        title: '5. Drittlandübermittlungen',
        paragraphs: [
          'Bei der Nutzung einzelner Dienstleister kann eine Verarbeitung in Staaten außerhalb der EU/des EWR (insbesondere USA) nicht ausgeschlossen werden. Solche Übermittlungen erfolgen nur nach Maßgabe der Art. 44 ff. DSGVO, insbesondere auf Basis von EU-Standardvertragsklauseln und, soweit anwendbar, Angemessenheitsbeschlüssen.',
        ],
      },
      {
        title: '6. Speicherdauer',
        paragraphs: [
          'Server-Logdaten werden nur so lange gespeichert, wie dies für Sicherheit und Fehleranalyse erforderlich ist.',
          'Chat-Sitzungen im Laufzeitspeicher werden automatisch gelöscht (derzeit nach spätestens 24 Stunden Inaktivität).',
          'Kontakt- und Projektdaten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten bestehen.',
          'Ihre Cookie-Einwilligung bleibt im localStorage gespeichert, bis Sie sie ändern oder den lokalen Speicher löschen.',
        ],
      },
      {
        title: '7. Ihre Rechte',
        paragraphs: [
          'Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen nach Art. 6 Abs. 1 lit. f DSGVO.',
        ],
      },
      {
        title: '8. Widerruf von Einwilligungen',
        paragraphs: [
          'Erteilte Einwilligungen (z. B. für Analytics) können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie Ihre Cookie-Einstellungen ändern.',
        ],
      },
      {
        title: '9. Beschwerderecht bei einer Aufsichtsbehörde',
        paragraphs: [
          'Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.',
        ],
      },
      {
        title: '10. Sicherheit',
        paragraphs: ['Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Verlust, Missbrauch und unbefugten Zugriff zu schützen.'],
      },
      {
        title: '11. Stand und Änderungen',
        paragraphs: ['Diese Datenschutzerklärung wird aktualisiert, wenn sich rechtliche Anforderungen, eingesetzte Dienste oder Verarbeitungsprozesse ändern.'],
      },
    ],
  },
  ru: {
    eyebrow: 'Политика конфиденциальности',
    title: 'Информация о защите данных',
    sections: [
      {
        title: '1. Ответственный',
        paragraphs: ['Konstantin Glazunov', 'Braunfels, Lindenstraße 16', 'Эл. почта: glazunov.const@gmail.com', 'WhatsApp: +49 1511 0974353'],
      },
      {
        title: '2. Цели и правовые основания обработки',
        paragraphs: [
          'Мы обрабатываем персональные данные только при наличии законного основания. В зависимости от процесса обработка осуществляется, в частности, на основании ст. 6 абз. 1 лит. a, b и f DSGVO.',
          'Работа сайта и техническая безопасность (например, серверные логи): ст. 6 абз. 1 лит. f DSGVO.',
          'Обработка обращений (эл. почта, форма, чат): ст. 6 абз. 1 лит. b DSGVO (преддоговорная коммуникация), а также при необходимости ст. 6 абз. 1 лит. f DSGVO.',
          'Сбор лидов через квиз и чат, включая отправку в Telegram для обработки запроса: ст. 6 абз. 1 лит. b DSGVO.',
          'Использование Google Analytics (ID G-H8XXSDP9W4) только при согласии: ст. 6 абз. 1 лит. a DSGVO совместно с § 25 абз. 1 TDDDG.',
          'Хранение выбора cookie в localStorage: § 25 абз. 2 п. 2 TDDDG и ст. 6 абз. 1 лит. f DSGVO.',
        ],
      },
      {
        title: '3. Хостинг, домен и технические протоколы',
        paragraphs: [
          'Сайт размещается на виртуальной машине в Oracle Cloud Infrastructure (OCI). В рамках хостинга могут обрабатываться технические данные соединения (например, IP-адрес, время, запрошенный URL, User-Agent) в серверных логах.',
          'Обработка необходима для стабильной работы, анализа ошибок и ИТ-безопасности (ст. 6 абз. 1 лит. f DSGVO).',
          'Услуги домена и DNS предоставляются соответствующим провайдером. При этом у провайдера выполняется технически необходимая обработка данных.',
        ],
      },
      {
        title: '4. Получатели данных и сервис-провайдеры',
        paragraphs: [
          'Для работы этого сайта данные могут получать следующие получатели/поставщики услуг:',
          'Хостинг: Oracle Cloud Infrastructure (серверная инфраструктура).',
          'Веб-аналитика (опционально, только при согласии): Google Analytics 4 (Google).',
          'Чат с ИИ: OpenAI (обработка содержимого чата для генерации ответов).',
          'Уведомления по лидам: Telegram (передача данных запроса в рабочий бизнес-чат).',
        ],
      },
      {
        title: '5. Передача данных в третьи страны',
        paragraphs: [
          'При использовании отдельных сервисов обработка в странах за пределами ЕС/ЕЭЗ (в частности США) не исключается. Такая передача осуществляется только в соответствии со ст. 44 и далее DSGVO, в частности на основании стандартных договорных положений ЕС и, где применимо, решений о достаточности защиты.',
        ],
      },
      {
        title: '6. Срок хранения',
        paragraphs: [
          'Серверные логи хранятся только столько, сколько необходимо для безопасности и анализа ошибок.',
          'Сессии чата в оперативном хранилище удаляются автоматически (в настоящее время не позднее 24 часов неактивности).',
          'Контактные и проектные данные удаляются, когда цель обработки отпадает и отсутствуют законные обязанности хранения.',
          'Ваше согласие на cookie хранится в localStorage до тех пор, пока вы не измените выбор или не очистите локальное хранилище.',
        ],
      },
      {
        title: '7. Ваши права',
        paragraphs: [
          'В рамках закона вы имеете право на получение информации, исправление, удаление, ограничение обработки, переносимость данных, а также на возражение против обработки по ст. 6 абз. 1 лит. f DSGVO.',
        ],
      },
      {
        title: '8. Отзыв согласия',
        paragraphs: ['Выданное согласие (например, на аналитику) можно в любой момент отозвать на будущее, изменив настройки cookie.'],
      },
      {
        title: '9. Право на жалобу в надзорный орган',
        paragraphs: [
          'Вы имеете право подать жалобу в орган по защите данных, в частности в государстве вашего обычного места жительства, работы или предполагаемого нарушения.',
        ],
      },
      {
        title: '10. Безопасность',
        paragraphs: ['Мы применяем надлежащие технические и организационные меры для защиты данных от потери, злоупотребления и несанкционированного доступа.'],
      },
      {
        title: '11. Актуальность и изменения',
        paragraphs: ['Эта политика конфиденциальности обновляется при изменении правовых требований, используемых сервисов или процессов обработки.'],
      },
    ],
  },
}

export function PrivacyPageContent() {
  const { locale } = useSitePreferences()
  const copy = privacyCopy[locale]

  return (
    <LegalPageLayout eyebrow={copy.eyebrow} title={copy.title}>
      {copy.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{section.title}</h2>
          <div className="mt-4 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </LegalPageLayout>
  )
}
