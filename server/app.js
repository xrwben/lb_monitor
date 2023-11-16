import Koa from 'koa'
import KoaStatic from 'koa-static'
import koaRouter from '@koa/router'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import { fileURLToPath } from 'url'
console.log(bodyParser)

const app = new Koa()
const router = new koaRouter()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(KoaStatic(path.resolve(__dirname, '../example')))
app.use(KoaStatic(path.resolve(__dirname, '../dist')))
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))

router.get('/report', (ctx) => {
  console.log('get------', ctx.request.query.a)
  ctx.body = {
    code: 0,
    data: null,
    msg: '上报成功'
  }
})
router.post('/report', (ctx) => {
  console.log('post------', ctx.request.body, typeof JSON.parse(ctx.request.body))
  ctx.body = {
    code: 0,
    data: null,
    msg: '上报成功'
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa服务已启动，端口号为3000...')
})