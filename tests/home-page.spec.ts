import { expect, test } from '@playwright/test'

test('home page is reachable and supports DE/RU toggle', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mehr Kundenanfragen über Ihre Website – einfach und ohne Aufwand',
  )

  await page.getByRole('button', { name: /switch to russian|русский/i }).first().click()
  await page.waitForURL(/\/ru(?:\/|$)/)

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Больше заявок через ваш сайт — просто и без лишних сложностей',
  )

  const russianMain = page.locator('main').filter({
    has: page.getByRole('heading', { level: 1, name: /Больше заявок через ваш сайт/i }),
  })

  await expect(russianMain).toHaveCount(1)

  await expect(page.getByRole('heading', { level: 2, name: 'Узнаёте свою ситуацию?' })).toBeVisible()
  await expect(page.getByText('Бизнес работает, но онлайн это почти не видно')).toBeVisible()
  await expect(page.getByText('Проблема обычно не в вашем предложении. Проблема в том, что компания онлайн не выглядит ясно и профессионально.')).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Примеры сайтов' })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Speicher Balkonkraftwerk' }).first()).toBeVisible()
  await expect(page.getByText('Лендинг для солнечных модулей и накопителей энергии. Мультиязычность, калькулятор, конверсионный CTA.')).toBeVisible()
  const faqSection = russianMain.locator('section').filter({
    has: page.getByRole('heading', { level: 2, name: 'FAQ' }),
  })
  const firstFaqItem = faqSection.locator('details').first()

  await faqSection.scrollIntoViewIfNeeded()
  await expect(page.getByRole('heading', { level: 2, name: 'FAQ' })).toBeVisible()
  await expect(firstFaqItem).toBeVisible()
  await expect(firstFaqItem).toContainText('Я не разбираюсь в сайтах. Это проблема?')
  await expect(faqSection).toContainText('Что если я пока не уверен, нужен ли мне сайт?')
  await expect
    .poll(async () => {
      return firstFaqItem.evaluate((element) => {
        const styles = window.getComputedStyle(element)
        return {
          opacity: styles.opacity,
          filter: styles.filter,
          hasVisibleClass: element.classList.contains('is-visible'),
        }
      })
    })
    .toEqual({
      opacity: '1',
      filter: 'blur(0px)',
      hasVisibleClass: true,
    })

  await expect(page.getByRole('heading', { level: 2, name: 'Что меняется с понятным сайтом' })).toBeVisible()
  await expect(page.getByText('Заявки только по рекомендациям.')).toBeVisible()
  await expect(page.getByRole('img', { name: 'Автосервис — много обращений, но онлайн не всегда понятно, что именно вы предлагаете' })).toBeVisible()
  await expect(page.getByText('Особенно полезно для малого бизнеса, который уже работает, но пока не имеет чётко оформленного профессионального сайта.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Готовы к проекту?' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Открыть чат с Max Webberater' })).toBeVisible()
})
