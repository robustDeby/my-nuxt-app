// composables/useAuth.ts
export const useAuth = () => {
  const token = useState<string | null>('token', () => {
    if (process.client) return localStorage.getItem('token')
    return null
  })

  const login = (t: string) => {
    token.value = t
    if (process.client) localStorage.setItem('token', t)
  }

  const logout = () => {
    token.value = null
    if (process.client) localStorage.removeItem('token')
  }

  return { token, login, logout }
}
