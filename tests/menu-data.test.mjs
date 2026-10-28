import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { featuredCopy, featuredDrinkIds, formatPrice, menuCategories, menuItems } from '../data/menu.ts'

const root = join(import.meta.dirname, '..')

test('menu item ids are unique and stable slugs', () => {
  const ids = menuItems.map(item => item.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/)
})

test('every item belongs to a known category', () => {
  const categories = new Set(menuCategories.map(category => category.id))
  for (const item of menuItems) assert.ok(categories.has(item.category), `${item.id} → ${item.category}`)
})

test('every referenced menu photo exists on disk and has alt text', () => {
  for (const item of menuItems) {
    if (!item.image) continue
    assert.ok(existsSync(join(root, 'public', item.image.src)), `missing ${item.image.src}`)
    assert.ok(item.image.alt.length > 10, `${item.id} needs descriptive alt text`)
  }
})

test('no two items share the same photograph', () => {
  const srcs = menuItems.flatMap(item => (item.image ? [item.image.src] : []))
  assert.equal(new Set(srcs).size, srcs.length)
})

test('featured drinks exist in the menu and have copy', () => {
  for (const id of featuredDrinkIds) {
    const item = menuItems.find(entry => entry.id === id)
    assert.ok(item, `featured ${id} missing from menu`)
    assert.ok(item.image, `featured ${id} needs a photograph`)
    assert.ok(featuredCopy[id]?.story)
  }
})

test('prices are either verified numbers or explicitly unknown', () => {
  for (const item of menuItems) assert.ok(item.price === null || (Number.isFinite(item.price) && item.price > 0), item.id)
  assert.equal(formatPrice(5), '5,00 KM')
  assert.equal(formatPrice(null), null)
})
