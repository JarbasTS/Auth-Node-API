import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../../../services/register-user'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterUserService(usersRepository)

  return registerService
}