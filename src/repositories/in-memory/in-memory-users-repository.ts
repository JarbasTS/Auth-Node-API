import type { User, Prisma } from '../../../prisma/generated/prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [] 

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    }

    this.items.push(user) 
    return user
  }

  async findAll({ page }: { page: number }) {
    const items = this.items.slice((page - 1) * 20, page * 20)
    return items
  }
}