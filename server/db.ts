import { createPool } from 'mysql2/promise'

export const db = createPool({
  host: 'localhost',
  user: 'root',
  password: '1212',
  database: 'nuxt_db'
}) as any
