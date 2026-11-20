import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const manifest = await readFile(new URL('docs/ASSET_MANIFEST.md', root), 'utf8')
const entries = [...manifest.matchAll(/^- `([\w.]+)`: 1448×1086, ([\d,]+) bytes, SHA256 `([a-f0-9]{64})`/gm)]
assert.equal(entries.length, 4, 'Expected four approved artwork files in the manifest')
for (const [, name, bytes, sha256] of entries) {
  const image = await readFile(new URL('public/assets/' + name, root))
  assert.equal(image.length, Number(bytes.replaceAll(',', '')), name + ' byte count')
  assert.equal(createHash('sha256').update(image).digest('hex'), sha256, name + ' SHA-256')
  console.log(name, image.length, 'bytes, SHA-256 matches')
}
