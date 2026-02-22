import type { Prisma, User } from "../../prisma/generated/prisma/client"

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>

    create(data: Prisma.UserCreateInput): Promise<User>

    findAll(params: { page: number, }): Promise<User[]>
}