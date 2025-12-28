import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.req.method

  if (method === 'GET') {
    return await prisma.user.findMany()
  }

if (method === 'POST') {
  const body = await readBody(event)

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description || null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    },
  })
  return task
}

})
