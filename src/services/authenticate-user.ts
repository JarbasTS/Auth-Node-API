import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma"

interface AuthenticateUserRequest {
    email: string
    password: string
}

interface AuthenticateUserResponse {
    user: {
        id: string
        name: string
        email: string
        password: string
    }
}

export class AuthenticateUserService {
    async execute({email, password}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            throw new Error('Email ou senha inválidos 🤔.')
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password)

        if (!doesPasswordMatch) {
            throw new Error('Email ou senha inválidos 🤔.')
        }

        return {
            user
        }
    }
}