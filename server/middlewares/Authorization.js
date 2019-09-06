import jwt from 'jsonwebtoken'
import { User } from '../models'

const errors = {
  "401": "Unauthorized",
  "403": "You are not authorized to perform this action",
  "404": "Item Not Found",
  "500": "Internal Server Error",
}

class Authorization {

  constructor(type) {
    this.type = type;
    this.authRole = this.authRole.bind(this)
  }

  authRole(req, res, next) {
    if (!this.type.includes(req.authUser.role)) {
      return res.status(403).json({
        error: errors['403']
      });
    }
    next()
  }

  static getToken(req) {
    const bearerToken = req.headers.authorization
    const token = bearerToken && bearerToken.replace('Bearer ', '')
    return token
  }

  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user.userId,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: 172800
      }
    );

    return token;
  }

  static async refreshToken(req, res) {
    const token = await Authorization.getToken(req)
    const { id } = jwt.verify(token, process.env.SECRET)
    const user = await User.findByPk(id)
    if (!user) {
       return res.status(401).json({ message: 'Invalid token' })
    }
    const newToken = Authorization.generateToken(user)

    return res.status(200).json({ user, token: newToken });
  }

  authorize(req, res, next) {
    const token = Authorization.getToken(req)

    if (!token) return res.status(401).json({ error: errors['401'] })

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'User authorization token is expired' })
        }

        return res.status(401).json({ error: 'Failed to authenticate token' })
      }

      const user = await User.findByPk(decoded.id)

      if (!user) return res.status(401).json({ error: errors['401'] })

      req.authUser = user

      return next()
    });
  }
}

export default Authorization;
