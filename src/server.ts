import 'dotenv/config'
import fastify from 'fastify'
import { appRoutes } from './http/routes'

const app = fastify()


app.register(appRoutes)

app.listen({ port: 3333 }).then(() => {
    console.log('🔥 Server is running on http://localhost:3333')
})



