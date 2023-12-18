import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import { createAccessToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const userFount = await User.findOne({ email })

    if (userFount) return res.status(400).json(["This email already exists"])

    const passwordHash = await bcryptjs.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: passwordHash
    })
    const savedUser = await newUser.save()
    const token = await createAccessToken({ id: savedUser._id })

    res.cookie('token', token)

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) return res.status(400).json(['User not found'])

    const isMatch = await bcryptjs.compare(password, foundUser.password)
    if (!isMatch) return res.status(400).json(['Incorrect password'])

    const token = await createAccessToken({ id: foundUser._id })

    res.cookie('token', token)

    res.json({
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie(
    'token',
    '',
    { expires: new Date(0) }
  )

  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  
  if (!token) return res.status(401).json(['Unauthorized'])

  jwt.verify(token, TOKEN_SECRET, async(err, user) => {
    if(err) return res.status(401).json(['Unauthorized'])

    const userFound = await User.findById(user.id)

    if (!userFound)  return res.status(401).json(['Unauthorized'])

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

export const profile = async (req, res) => {
  const foundUser = await User.findById(req.user.id)
  if (!foundUser) return res.status(400).json({ 'message': 'User not found' })

  return res.json({
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    createdAt: foundUser.createdAt,
    updatedAt: foundUser.updatedAt,
  })
}