import { expect, test } from '@playwright/test'

test('landing page renders german hero and allows switching to russian', async ({ page }) => {
  await page.goto('/landing')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mehr Kundenanfragen über Ihre Website – einfach und ohne Aufwand',
  )

  await page.getByRole('button', { name: /switch to russian|русский/i }).first().click()
  await page.waitForURL(/\/ru(?:\/landing)?(?:\/|$)/)

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Больше заявок через ваш сайт — просто и без лишних сложностей',
  )
})
