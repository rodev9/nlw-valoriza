import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersReposiories = getCustomRepository(UsersRepositories)

    const user = await usersReposiories.findOne({ email })

    if (!user) throw new Error('Incorrect email/password')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new Error('Incorrect email/password')

    const token = sign(
      { email: user.email },
      'cefc0350e504ddd7a1598bab653762b2',
      { subject: user.id, expiresIn: '1d' }
    )

    return token
  }
}
