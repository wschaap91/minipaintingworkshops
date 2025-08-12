<script setup lang="ts">
import LinkItem from './LinkItem.vue';

const links = {
    partners: [
  { name: 'Pink Orc Studios', url: 'https://www.pinkorcstudios.com' },
  { name: 'Subcultures Utrecht', url: 'https://www.subcultures.nl/' },
]
};


</script>
<template>
    <ul v-for="(value, groupname) in links" :key="groupname">
        <h2>{{ groupname }}</h2>
        <LinkItem v-for="link in value"
                  :key="link.name"
                  :link="link"
                  ></LinkItem>
    </ul>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

h2 {
    color: white;
    text-transform: capitalize;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}
</style>