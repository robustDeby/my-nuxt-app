import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '~/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!email || !password) return { error: 'Email and password required' }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  })

  const token = generateToken(user.id)
  return { token, user: { id: user.id,name:user.name, email: user.email } }
})
