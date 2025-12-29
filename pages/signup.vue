<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const signup = async () => {
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })

    if (res.error) {
      error.value = res.error
      return
    }

    // Save token
    localStorage.setItem('token', res.token)
    router.push('/')
  } catch (e) {
    error.value = 'Signup failed'
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Signup</h1>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signup">Signup</button>
    <p class="error" v-if="error">{{ error }}</p>
    <p>Already have an account? <a href="/login">Login</a></p>
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
