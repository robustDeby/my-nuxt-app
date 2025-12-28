import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === "GET") {
    const { filter } = getQuery(event) as { filter?: string };
    let tasks;

    if (filter === "active")
      tasks = await prisma.task.findMany({ where: { completed: false } });
    else if (filter === "completed")
      tasks = await prisma.task.findMany({ where: { completed: true } });
    else tasks = await prisma.task.findMany();

    return JSON.parse(JSON.stringify(tasks));
  }

  if (method === "POST") {
    const body = await readBody(event);
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
      },
    });
    return JSON.parse(JSON.stringify(task));
  }
});
