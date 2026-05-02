import { expect, test, type Page } from '@playwright/test'

async function dismissCookieBanner(page: Page) {
  const acceptButton = page.getByRole('button', { name: /Alle akzeptieren|Принять все/i })
  if (await acceptButton.count()) {
    await acceptButton.first().click()
    await expect(acceptButton.first()).toBeHidden()
    return
  }

  const saveButton = page.getByRole('button', { name: /Auswahl speichern|Сохранить настройки/i })
  if (await saveButton.count()) {
    await saveButton.first().click()
    await expect(saveButton.first()).toBeHidden()
  }
}

test('cookie consent opens settings with category toggles', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem('codevibe-cookie-consent-v1')
  })
  await page.goto('/')
  await page.mouse.click(12, 12)

  const dialog = page.locator('[id^="headlessui-dialog-panel"]').first()
  await expect(dialog).toBeVisible()

  const settingsOpenButton = dialog.getByRole('button', { name: /Cookie-Einstellungen|Настройки cookie/i })
  const rejectButton = dialog.getByRole('button', { name: /Alles ablehnen|Отклонить все/i })
  const acceptButton = dialog.getByRole('button', { name: /Alle akzeptieren|Принять все/i })

  // Intro buttons can be hidden if the dialog was reopened in settings mode; handle both states.
  if (await settingsOpenButton.count()) {
    await expect(settingsOpenButton.first()).toBeVisible()
    if (await rejectButton.count()) {
      await expect(rejectButton.first()).toBeVisible()
    }
    if (await acceptButton.count()) {
      await expect(acceptButton.first()).toBeVisible()
    }
    await settingsOpenButton.first().click()
  }

  await expect(dialog.locator('label[for="cc-necessary"]')).toContainText(/Notwendig|Необходимые/i)
  await expect(dialog.locator('label[for="cc-analytics"]')).toContainText(/Analyse|Аналитика/i)
  await expect(dialog.locator('label[for="cc-marketing"]')).toContainText(/Marketing|Маркетинг/i)
  await expect(dialog.getByRole('button', { name: /Auswahl speichern|Сохранить настройки/i })).toBeVisible()
})

test('contact form submits successfully with required fields', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'codevibe-cookie-consent-v1',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        updatedAt: new Date().toISOString(),
      }),
    )
  })

  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })

  await page.goto('/kontakt')
  await dismissCookieBanner(page)

  await page.getByLabel(/Vor- und Nachname|Имя и фамилия/i).fill('Max Mustermann')
  await page.getByLabel(/E-Mail/i).fill('max@example.de')
  await page.getByLabel(/Nachricht|Сообщение/i).fill('Ich brauche eine neue Website für meinen Betrieb.')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: /Nachricht senden|Отправить сообщение/i }).click()

  await expect(page.getByText(/Vielen Dank. Ihre Nachricht wurde gesendet.|Спасибо. Ваше сообщение отправлено./i)).toBeVisible()
})

test('landing2 footer keeps legal links and removes direct contact lines', async ({ page }) => {
  await page.goto('/landing2')
  await dismissCookieBanner(page)

  const footer = page.locator('footer').last()

  await expect(footer.getByRole('link', { name: /Über mich|Обо мне/i })).toHaveAttribute('href', '/ueber-mich')
  await expect(footer.getByRole('link', { name: /Kontakt|Контакт/i })).toHaveAttribute('href', '/kontakt')
  await expect(footer.getByRole('link', { name: /Datenschutz|Конфиденциальность/i })).toHaveAttribute('href', '/datenschutzerklaerung')
  await expect(footer.getByRole('link', { name: /Impressum/i })).toHaveAttribute('href', '/impressum')

  await expect(footer).not.toContainText('WhatsApp')
  await expect(footer).not.toContainText('kontakt@erstellen-websiten.de')
})
