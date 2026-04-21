import { expect, test } from '@playwright/test'

test('landing page renders german hero and allows switching to russian', async ({ page }) => {
  await page.goto('/landing')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mehr Kundenanfragen über Ihre Website – einfach und ohne Aufwand',
  )

  // In Next dev mode hydration can lag behind first paint, so we trigger a DOM click after render.
  await page.getByRole('button', { name: /switch to russian/i }).evaluate((button: HTMLButtonElement) => button.click())

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Больше заявок через ваш сайт — просто и без лишних сложностей',
  )
})
