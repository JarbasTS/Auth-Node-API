import type { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlewares/verify-jwt"
import { register } from "./controllers/register"
import { authenticate } from "./controllers/authenticate"
import { profile } from "./controllers/profile"
import { fetchUsers } from "./controllers/fetch-users"

export async function appRoutes(app: FastifyInstance){
    app.post('/register', register)
    app.post('/login', authenticate)
    app.get('/users', fetchUsers)

    app.get('/profile', {onRequest: [verifyJwt]} ,profile)
}