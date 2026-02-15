import type { UsersRepository } from '../repositories/users-repository'

interface FetchUsersParams {
  page: number
}

interface FetchUsersResponse {
  users: {
    id: string
    name: string
    email: string
    createdAt: Date
  }[]
}

export class FetchUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({page}: FetchUsersParams): Promise<FetchUsersResponse> {
    const users = await this.usersRepository.findAll({page})

    return {
      users,
    }
  }
}