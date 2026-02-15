import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUsersService } from './factories/make-fetch-users-service'
import { z } from 'zod'

export async function fetchUsers(request: FastifyRequest, reply: FastifyReply) {
 
const fetchUsersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

const { page } = fetchUsersQuerySchema.parse(request.query)

 const fetchUsersService = makeFetchUsersService()

  const { users } = await fetchUsersService.execute({page})

  const usersWithoutPassword = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }))

  return reply.status(200).send({ users: usersWithoutPassword })
}