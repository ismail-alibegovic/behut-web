// End-to-end checks for the interactive parts of the site.
// Run after `pnpm build`: `pnpm test:e2e` (or set BASE_URL to test a running server).
import { after, before, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const PORT = 3456
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`
let server
let browser

async function waitForServer(url, timeout = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try { if ((await fetch(url)).ok) return } catch {}
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  throw new Error(`Server at ${url} did not start`)
}

async function openPage(width, height = 900) {
  const page = await browser.newPage({ viewport: { width, height } })
  const errors = []
  page.on('pageerror', error => errors.push(String(error)))
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('_vercel/insights') && !message.text().includes('404')) errors.push(message.text()) })
  page.on('response', response => { if (response.status() >= 400 && !response.url().includes('_vercel/insights')) errors.push(`${response.status()} ${response.url()}`) })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  return { page, errors }
}

before(async () => {
  if (!process.env.BASE_URL) {
    server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', detached: true })
    await waitForServer(BASE_URL)
  }
  browser = await chromium.launch()
})

after(async () => {
  await browser?.close()
  if (server) process.kill(-server.pid)
})

describe('layout', () => {
  for (const width of [1440, 1280, 768, 390, 375]) {
    test(`no horizontal overflow, broken images or console errors at ${width}px`, async () => {
      const { page, errors } = await openPage(width)
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 40)) }
      })
      await page.waitForLoadState('networkidle')
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src),
      }))
      assert.equal(result.overflow, 0)
      assert.deepEqual(result.broken, [])
      assert.deepEqual(errors, [])
      await page.close()
    })
  }
})

describe('navigation', () => {
  test('desktop anchors point to existing sections and header gains scrolled state', async () => {
    const { page } = await openPage(1440)
    const hrefs = await page.$$eval('.site-header a[href^="#"]', links => links.map(link => link.getAttribute('href')))
    assert.deepEqual(hrefs, ['#prica', '#meni', '#galerija', '#top', '#lokacija'])
    for (const href of hrefs) assert.equal(await page.locator(href).count(), 1, href)
    assert.equal(await page.locator('.site-header').getAttribute('data-scrolled'), null)
    await page.click('.nav-left a[href="#meni"]')
    await page.waitForFunction(() => window.scrollY > 200)
    assert.equal(await page.locator('.site-header').getAttribute('data-scrolled'), 'true')
    await page.close()
  })

  test('mobile menu opens, closes with Escape and returns focus', async () => {
    const { page } = await openPage(390, 844)
    const toggle = page.locator('.menu-toggle')
    await toggle.click()
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
    await page.locator('#mobile-menu a[href="#prica"]').waitFor({ state: 'visible' })
    await page.keyboard.press('Escape')
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle')), true)
    await toggle.click()
    await page.locator('#mobile-menu a[href="#galerija"]').click()
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    await page.waitForFunction(() => window.scrollY > 500)
    await page.close()
  })
})

describe('menu and featured drinks', () => {
  test('category filter narrows the framed collection', async () => {
    const { page } = await openPage(1440)
    const total = await page.locator('.exhibit').count()
    assert.ok(total >= 10)
    await page.getByRole('button', { name: /Tradicionalni kolači/ }).click()
    assert.equal(await page.locator('.exhibit').count(), 2)
    assert.deepEqual(await page.locator('.exhibit h3').allTextContents(), ['Baklava', 'Hurmašica'])
    await page.getByRole('button', { name: /^Sve/ }).click()
    assert.equal(await page.locator('.exhibit').count(), total)
    await page.close()
  })

  test('featured drink selector swaps the drink', async () => {
    const { page } = await openPage(1440)
    assert.equal(await page.locator('.featured-text h3').textContent(), 'Bosanska kafa')
    await page.locator('.featured-index button', { hasText: 'Salep' }).click()
    assert.equal(await page.locator('.featured-text h3').textContent(), 'Salep')
    await page.getByRole('button', { name: 'Sljedeći napitak' }).click()
    assert.equal(await page.locator('.featured-text h3').textContent(), 'Behut ledeni čaj')
    await page.close()
  })
})

describe('gallery', () => {
  test('lightbox opens, steps with arrow keys and closes with Escape', async () => {
    const { page } = await openPage(1440)
    await page.locator('.gallery-item').first().click()
    const dialog = page.locator('dialog.lightbox')
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.locator('.lightbox-bar p span').textContent(), /^1 \/ 6$/)
    await page.keyboard.press('ArrowRight')
    assert.match(await dialog.locator('.lightbox-bar p span').textContent(), /^2 \/ 6$/)
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('gallery-item')), true)
    await page.close()
  })
})
