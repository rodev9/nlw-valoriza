import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ error: 'Missing token' })
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(
      token,
      'cefc0350e504ddd7a1598bab653762b2'
    ) as IPayload

    req.user_id = sub

    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
