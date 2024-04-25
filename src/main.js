import express from 'express'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
import { connect } from './database/database.js'
import { apiRouter } from './routers/api.routers.js'
import { webRouter } from './routers/web/web.router.js'
import { autentication } from './middlewares/authentication.js'
import { COOKIE_SECRET, PORT } from './config/config.js'

await connect()

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
    console.log(`Servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser(COOKIE_SECRET))
app.use(autentication)

app.use('/static', express.static('./static'))
app.use('/', webRouter)
app.use('/api', apiRouter)
