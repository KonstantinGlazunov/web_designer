import { expect, test } from '@playwright/test'

test('landing2 page is reachable and supports DE/RU toggle', async ({ page }) => {
  await page.goto('/landing2')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Klare Website für Ihr Unternehmen - modern, verständlich und professionell',
  )

  await page.getByRole('button', { name: /switch to russian/i }).evaluate((button: HTMLButtonElement) => button.click())

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Понятный сайт для вашего бизнеса - современный, аккуратный и профессиональный',
  )
})
