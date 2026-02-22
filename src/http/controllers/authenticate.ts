import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { AuthenticateUserService } from '../../services/authenticate-user'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUserService = new AuthenticateUserService()

        const { user } = await authenticateUserService.execute({ email, password })

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        return reply.status(200).send({ token })
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(401).send({ error: err.message })
        }

        throw err
    }
}