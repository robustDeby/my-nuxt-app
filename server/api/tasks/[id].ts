import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const method = event.req.method

  if (method === 'PUT') {
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) return { error: 'Task not found' }

    const updated = await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    })

    return JSON.parse(JSON.stringify(updated))
  }

  if (method === 'DELETE') {
    await prisma.task.delete({ where: { id } })
    return { message: 'Deleted' }
  }
})
