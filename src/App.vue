<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchEvents} from './api/api';

const events = ref([]);

onMounted(async () => {
  events.value = await fetchEvents();
});

</script>

<template>
  <div>
    <h1>Events</h1>
    <pre>{{events}}</pre>
    <ul>
      <li v-for="event in events.data" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
