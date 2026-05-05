'use client'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { useSitePreferences } from '@/components/providers/site-preferences'
import type { Locale } from '@/lib/translations'

type Section = {
  title: string
  paragraphs: string[]
}

const agbCopy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    sections: Section[]
  }
> = {
  de: {
    eyebrow: 'AGB',
    title: 'Allgemeine Geschäftsbedingungen',
    sections: [
      {
        title: '1. Geltungsbereich',
        paragraphs: ['Diese Allgemeinen Geschäftsbedingungen gelten für alle Angebote und Leistungen von Konstantin Glazunov im Bereich Webdesign, Webentwicklung, technische Betreuung und digitale Produktumsetzung.'],
      },
      {
        title: '2. Vertragsschluss und Leistungsumfang',
        paragraphs: ['Grundlage der Zusammenarbeit sind individuelles Angebot, Projektbriefing und ggf. weitere schriftliche Vereinbarungen. Der konkrete Leistungsumfang ergibt sich ausschließlich aus diesen Unterlagen.'],
      },
      {
        title: '3. Mitwirkungspflichten des Kunden',
        paragraphs: ['Der Kunde stellt alle für das Projekt benötigten Inhalte, Zugänge, Freigaben und Informationen rechtzeitig bereit. Verzögerungen durch fehlende Mitwirkung können Zeitplan und Vergütung beeinflussen.'],
      },
      {
        title: '4. Vergütung und Zahlung',
        paragraphs: ['Alle Preise richten sich nach dem individuellen Angebot. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug fällig.'],
      },
      {
        title: '5. Abnahme',
        paragraphs: ['Soweit eine Abnahme vorgesehen ist, gilt die Leistung als abgenommen, wenn der Kunde die Abnahme erklärt, die Webseite produktiv nutzt oder innerhalb angemessener Frist keine wesentlichen Mängel rügt.'],
      },
      {
        title: '6. Nutzungsrechte',
        paragraphs: ['Nutzungsrechte an Design-, Text- und Entwicklungsleistungen gehen erst nach vollständiger Bezahlung auf den Kunden über, soweit nichts Abweichendes schriftlich vereinbart ist.'],
      },
      {
        title: '7. Domain und Hosting',
        paragraphs: [
          'Domainregistrierung und Hosting sind nur dann Vertragsbestandteil, wenn sie ausdrücklich beauftragt wurden.',
          'Bei Domainleistungen erfolgt die Registrierung grundsätzlich im Namen des Kunden, soweit rechtlich und technisch möglich.',
          'Für Leistungen externer Anbieter (z. B. Domain-Registrar, DNS-, Hosting- oder CDN-Anbieter) gelten zusätzlich deren Vertrags- und Nutzungsbedingungen.',
          'Eine durchgängige Verfügbarkeit von Infrastruktur externer Anbieter kann nicht garantiert werden.',
        ],
      },
      {
        title: '8. Mängel und Haftung',
        paragraphs: ['Es gelten die gesetzlichen Mängelrechte. Die Haftung ist bei leichter Fahrlässigkeit auf vorhersehbare, vertragstypische Schäden begrenzt. Unberührt bleibt die Haftung bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper oder Gesundheit sowie nach zwingenden gesetzlichen Vorschriften.'],
      },
      {
        title: '9. Inhalte und Rechte Dritter',
        paragraphs: ['Der Kunde ist für die Rechtmäßigkeit bereitgestellter Inhalte (z. B. Texte, Bilder, Marken) verantwortlich und stellt sicher, dass keine Rechte Dritter verletzt werden.'],
      },
      {
        title: '10. Laufzeit und Kündigung',
        paragraphs: ['Projektverträge enden mit Leistungserbringung und Zahlung. Wiederkehrende Leistungen (z. B. Wartung oder Hosting-Management) laufen auf unbestimmte Zeit und können, sofern nicht anders vereinbart, mit 30 Tagen zum Monatsende gekündigt werden.'],
      },
      {
        title: '11. Schlussbestimmungen',
        paragraphs: ['Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.'],
      },
    ],
  },
  ru: {
    eyebrow: 'AGB',
    title: 'Общие условия сотрудничества',
    sections: [
      {
        title: '1. Сфера применения',
        paragraphs: ['Настоящие общие условия применяются ко всем предложениям и услугам Konstantin Glazunov в области веб-дизайна, веб-разработки, технической поддержки и цифровой реализации проектов.'],
      },
      {
        title: '2. Заключение договора и объем услуг',
        paragraphs: ['Основой сотрудничества являются индивидуальное предложение, проектный бриф и, при необходимости, иные письменные договоренности. Конкретный объем услуг определяется исключительно этими документами.'],
      },
      {
        title: '3. Обязанности клиента по содействию',
        paragraphs: ['Клиент своевременно предоставляет все материалы, доступы, согласования и информацию, необходимые для проекта. Задержки из-за отсутствия содействия могут повлиять на сроки и стоимость работ.'],
      },
      {
        title: '4. Оплата',
        paragraphs: ['Все цены определяются индивидуальным предложением. Если иное не согласовано, счета подлежат оплате в течение 14 дней с даты выставления без вычетов.'],
      },
      {
        title: '5. Приемка',
        paragraphs: ['Если предусмотрена приемка, услуга считается принятой, когда клиент подтверждает приемку, использует сайт в рабочем режиме или не заявляет о существенных дефектах в разумный срок.'],
      },
      {
        title: '6. Права использования',
        paragraphs: ['Права использования результатов дизайна, текстов и разработки переходят к клиенту только после полной оплаты, если иное письменно не согласовано.'],
      },
      {
        title: '7. Домен и хостинг',
        paragraphs: [
          'Регистрация домена и хостинг входят в договор только при отдельном явном заказе.',
          'При услугах по домену регистрация, как правило, выполняется на имя клиента, если это возможно юридически и технически.',
          'Для услуг внешних провайдеров (например, регистратор домена, DNS, хостинг, CDN) дополнительно действуют их собственные договорные условия.',
          'Непрерывная доступность инфраструктуры внешних провайдеров не гарантируется.',
        ],
      },
      {
        title: '8. Недостатки и ответственность',
        paragraphs: ['Применяются предусмотренные законом права при обнаружении недостатков. При легкой неосторожности ответственность ограничивается предсказуемым типичным договорным ущербом. Это не затрагивает ответственность за умысел, грубую неосторожность, вред жизни, здоровью, а также обязательные случаи, предусмотренные законом.'],
      },
      {
        title: '9. Контент и права третьих лиц',
        paragraphs: ['Клиент отвечает за законность предоставленного контента (например, тексты, изображения, товарные знаки) и гарантирует отсутствие нарушения прав третьих лиц.'],
      },
      {
        title: '10. Срок действия и расторжение',
        paragraphs: ['Проектные договоры завершаются после выполнения услуги и оплаты. Регулярные услуги (например, поддержка или управление хостингом) действуют бессрочно и, если не согласовано иное, могут быть расторгнуты за 30 дней до конца месяца.'],
      },
      {
        title: '11. Заключительные положения',
        paragraphs: ['Применяется право Германии с исключением Конвенции ООН о договорах международной купли-продажи товаров. Если отдельные положения недействительны или утрачивают силу, это не влияет на действительность остальных положений.'],
      },
    ],
  },
}

export function AgbPageContent() {
  const { locale } = useSitePreferences()
  const copy = agbCopy[locale]

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
