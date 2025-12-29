<template>
  <header class="header">
    <nav>
      <a href="/" class="logo">Tracker Project</a>
      <ul class="nav-links">
        <template v-if="!token">
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
        </template>
        <template v-else>
          <li><a href="/">Task</a></li>
          <li><a href="/habit">Habit</a></li>
          <li><button @click="handleLogout" class="logout-btn">Logout</button></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const { token, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style scoped>
.header {
  background-color: #1e40af;
  color: white;
  padding: 23px 20px;
  font-size: larger;
  font-family: sans-serif;
}
.logo {
  color: #cd1c1c;
    font-size: larger;
    text-decoration: none;
}
.header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  display: flex;
  gap: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links li a,
.nav-links li button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}
.logout-btn {
  font-size: large;
}
</style>
