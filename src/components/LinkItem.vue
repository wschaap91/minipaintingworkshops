<script setup lang="ts">

const props = defineProps<{
    link: {
        name: string;
        url: string;
    };
}>();

</script>

<template>
    <div class="link-item">
        <a :href="props.link.url">{{ props.link.name }}</a>
    </div>
</template>

<style scoped>
.link-item {
    display: grid;
    position: relative;
    background-color: #f0f0f0;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
}

a {
    padding: 1rem;
    color: var(--mpw-color-brown);
    text-decoration: none;
}
</style>