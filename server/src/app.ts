import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'

import { routes } from './routes/routes'
import { addRoute } from './routes/add-route'
import { handleRouterError } from './routes/handle-router-error'

export const app = express()

app.use(json())
app.use(cors())

app.get('/', (req, res) => res.send({ success: true, message: 'OK' }))

routes.forEach(route => addRoute(app, route))

app.use((req, res) => res.status(400).send({ success: false, message: 'INVALID_ROUTE' }))

app.use(handleRouterError)
