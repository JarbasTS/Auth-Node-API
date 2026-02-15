import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function profile(request: FastifyRequest, reply: FastifyReply){
    const userId = request.user.id

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    })

    if (!user) {
        return reply.status(404).send({ error: 'Usuario não encontrado 🫣.' })
    }

    return reply.status(200).send({ user })
}