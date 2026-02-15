import bcrypt from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import type { UsersRepository } from "../repositories/users-repository"

interface RegisterUserRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserResponse {
    user: {
        id: string
        name: string
        email: string
        createdAt: Date
    }
}

export class RegisterUserService {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUserRequest): Promise<RegisterUserResponse> {
        const userExists = await this.usersRepository.findByEmail(email)

        if (userExists) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await bcrypt.hash(password, 6)

        const user = await this.usersRepository.create ({
            name,
            email,
            password: passwordHash,
        })

        return {
            user
        }
    }
}