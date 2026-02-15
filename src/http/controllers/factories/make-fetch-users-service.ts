import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { FetchUsersService } from '../../../services/fetch-users'

export function makeFetchUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const fetchUsersService = new FetchUsersService(usersRepository)

  return fetchUsersService
}