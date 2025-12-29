<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
}

const tasks = ref<Task[]>([]);
const title = ref("");
const description = ref("");
const dueDate = ref("");
const filter = ref<"all" | "active" | "completed">("all");

const fetchTasks = async () => {
  const filterValue = (filter as any)._value; 
  const res = await $fetch<Task[]>('/api/tasks', { params: { filter: filterValue } })
  tasks.value = res
}

const addTask = async () => {
  if (!title.value) return;

  // Convert dueDate to full ISO string or null
  const dueDateISO = dueDate.value
    ? new Date(dueDate.value).toISOString()
    : null;

  await $fetch("/api/tasks", {
    method: "POST",
    body: {
      title: title.value,
      description: description.value,
      dueDate: dueDateISO,
    },
  });

  title.value = "";
  description.value = "";
  dueDate.value = "";
  fetchTasks();
};

const toggleTask = async (id: number) => {
  await $fetch(`/api/tasks/${id}`, { method: "PUT" });
  fetchTasks();
};

const deleteTask = async (id: number) => {
  await $fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
};

const filteredTasks = computed(() => tasks.value);

onMounted(fetchTasks);
</script>

<template>
  <div class="container">
    <h1>Task Tracker</h1>

    <div class="task-form">
      <input v-model="title" placeholder="Task title" />
      <input v-model="description" placeholder="Description" />
      <input type="date" v-model="dueDate" />
      <button @click="addTask">Add Task</button>
    </div>

    <div class="filters">
      <button
        @click="
          filter = 'all';
          fetchTasks();
        "
      >
        All
      </button>
      <button
        @click="
          filter = 'active';
          fetchTasks();
        "
      >
        Active
      </button>
      <button
        @click="
          filter = 'completed';
          fetchTasks();
        "
      >
        Completed
      </button>
    </div>

    <ul class="task-list">
      <li v-for="task in filteredTasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTask(task.id)"
        />
        <strong>{{ task.title }}</strong>
        <span v-if="task.description"> - {{ task.description }}</span>
        <span v-if="task.dueDate">
          | Due: {{ new Date(task.dueDate).toLocaleDateString() }}</span
        >
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* Container */
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e40af;
  margin-bottom: 30px;
}

/* Task Form */
.task-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #f8fafc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.task-form input {
  flex: 1 1 150px;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
}
.task-form button {
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}
.task-form button:hover {
  background-color: #1e3a8a;
}

/* Filters */
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.filters button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #e2e8f0;
  font-weight: 500;
  transition: all 0.2s;
}
.filters button.active {
  background-color: #1e40af;
  color: white;
}
.filters button:hover {
  background-color: #93c5fd;
  color: #1e40af;
}

/* Task List */
.task-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.task-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.task-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.task-text .title {
  font-weight: 600;
  font-size: 1.1rem;
}
.task-text .description {
  font-size: 0.9rem;
  color: #6b7280;
}
.task-text .due-date {
  font-size: 0.8rem;
  color: #9ca3af;
}
.task-list li.completed .title {
  text-decoration: line-through;
  color: #9ca3af;
}

/* Delete Button */
.delete-btn {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}
.delete-btn:hover {
  background-color: #b91c1c;
}

/* Responsive */
@media (max-width: 600px) {
  .task-form {
    flex-direction: column;
  }
  .task-list li {
    flex-direction: column;
    align-items: flex-start;
  }
  .delete-btn {
    align-self: flex-end;
    margin-top: 10px;
  }
}
</style>