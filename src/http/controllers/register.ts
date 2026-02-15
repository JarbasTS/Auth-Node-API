import type { FastifyReply, FastifyRequest } from 'fastify'
import {z} from 'zod'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { makeRegisterService } from './factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUserService = makeRegisterService()

        await registerUserService.execute({ name, email, password })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ error: err.message })
        }

        throw err
    }
}