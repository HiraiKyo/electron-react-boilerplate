import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { DemoParser } from './demo-parser'

const app = new Hono()
app.use(cors())

// デモファイルの解析結果をキャッシュするストア
const demoStore = new Map<string, any>()

app.post('/api/demos', async (c) => {
  const file = await c.req.blob()
  const buffer = Buffer.from(await file.arrayBuffer())

  const parser = new DemoParser(buffer)
  const demoId = crypto.randomUUID()

  // 非同期で解析を開始
  parser.parse().then((result) => {
    demoStore.set(demoId, result)
  })

  return c.json({ demoId })
})

app.get('/api/demos/:id/state', async (c) => {
  const { id } = c.req.param()
  const tick = c.req.query('tick')

  const demo = demoStore.get(id)
  if (!demo) return c.json({ error: 'Demo not found' }, 404)

  return c.json(demo.getStateAtTick(parseInt(tick)))
})

serve(app)
