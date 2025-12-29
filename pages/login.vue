<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const {login} = useAuth();

const handleLogin = async () => {
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    if (res.error) {
      error.value = res.error
      return
    }

    const tokenValue = res.token;
    login(tokenValue);
    router.push('/')
  } catch (e) {
    error.value = 'Login failed'
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p class="error" v-if="error">{{ error }}</p>
    <p>No account? <a href="/signup">Signup</a></p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input { padding: 10px; border-radius: 6px; border:1px solid #cbd5e1; }
button { padding:10px; border:none; border-radius:6px; background:#1e40af; color:white; cursor:pointer; }
.error { color:red; }
a { color:#1e40af; text-decoration:underline; }
</style>