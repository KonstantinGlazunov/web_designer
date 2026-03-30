import { test, expect } from '@playwright/test'

test('home page is reachable and has expected title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Vibe Studio/i)
  await expect(page.locator('main')).toBeVisible()
})
