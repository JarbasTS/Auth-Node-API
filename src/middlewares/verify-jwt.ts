import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply){
    const authHeader = request.headers.authorization

    if(!authHeader){
        return reply.status(401).send({ message: 'Não autorizado 🫣.' })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string
        }
    
        request.user = {
            id: decoded.userId,
        }
    } catch (error) {
        return reply.status(401).send({ message: 'Não autorizado 🫣.' })
    }

    
}