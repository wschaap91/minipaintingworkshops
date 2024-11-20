<script setup lang="ts">
    import WorkshopItem from './WorkshopItem.vue';

    defineProps<{
        items: {
            id: string,
            name: string,
            tickets: ({
                price: string
            } & Record<string, any>)[],
            dates: ({
                ['flat_date']: string
            } & Record<string, any>)[],
            shopUrl: string | undefined
            // banner: string
        }[]
    }>()

</script>


<template>
    <div class="workshops">
        <WorkshopItem v-for="event in items"
                      :key="event.id"
                      :name="event.name"
                      :price="event.tickets[0].price"
                      :id="event.id"
                      :url="event.shopUrl"
                      :dates="event.dates"></WorkshopItem>
    </div>
</template>

<style scoped>
.workshops {
    width: 100%;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);

    @container page-wrapper (width < 1500px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @container page-wrapper (width < 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @container page-wrapper (width < 750px) {
        grid-template-columns: 1fr;
    }
}
</style>
