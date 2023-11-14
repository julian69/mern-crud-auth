import jwt from 'jsonwebtoken'

import { TOKEN_SECRET } from '../config.js'

export const createAccessToken = (payoload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payoload,
      TOKEN_SECRET,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}