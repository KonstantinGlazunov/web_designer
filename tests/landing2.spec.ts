import { expect, test } from '@playwright/test'

test('home page is reachable and supports DE/RU toggle', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mehr Kundenanfragen über Ihre Website – einfach und ohne Aufwand',
  )

  await page.getByRole('button', { name: /switch to russian/i }).evaluate((button: HTMLButtonElement) => button.click())

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Больше заявок через ваш сайт — просто и без лишних сложностей',
  )
})
