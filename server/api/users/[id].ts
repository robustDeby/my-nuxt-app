import { PrismaClient } from '@prisma/client'
import type { IncomingMessage, ServerResponse } from 'http'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) return { error: 'Missing id' }

  const method = event.req.method

  if (method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    const user = await prisma.user.update({
      where: { id },
      data: { name: body.name, email: body.email },
    })
    return user
  }

  if (method === 'DELETE') {
    await prisma.user.delete({ where: { id } })
    return { message: 'Deleted' }
  }
})
