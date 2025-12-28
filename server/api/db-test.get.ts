import { db } from '../db'

export default defineEventHandler(async () => {
  const [rows] = await db.execute('SELECT 1 AS ok')
  return rows
})
