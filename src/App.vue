<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { fetchData } from './api/api';
  import { ShopsList, EventsList } from './api/datatypes';
  import WorkshopList from './components/WorkshopList.vue';

  const shops = ref<ShopsList>();
  const events = ref<EventsList>();

  onMounted(async () => {
    shops.value = await fetchData('shops', 'list');
    events.value = await fetchData('events', 'list');
  });

  const mappedEvents = computed(() => {
    if (shops.value && events.value) {
      return events.value.data.map((curr) => {
        const { id, name, dates, tickets } = curr;
        const shopUrl = shops.value!.data.find(shop => curr.shops.includes(shop.id))?.full_url;
        return {
          id,
          name,
          dates,
          tickets,
          shopUrl
        }
      });
    }
  })

</script>

<template>
  <div class="wrapper">
    <div class="heading">
      <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem">
        <img class="heading__img"
             src="/shirt-owl-splash.png"
             alt="logo van mpw">
        <h1>Miniature<br /> Painting<br /> Workshops</h1>
      </div>
      <h2>Upcoming events</h2>
    </div>
    <div class="main">
      <template v-if="mappedEvents">
        <WorkshopList :items="mappedEvents"></WorkshopList>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  container-name: page-wrapper;
  container-type: inline-size;
  padding: 1rem;
  background-color: #F7F3EE;
  height: 95vh;
  width: 95vw;
  overflow: auto;
  border-radius: 1.5rem;
  filter: drop-shadow(-1rem 1rem 0.5rem rgba(91, 65, 51, 0.2));
  display: grid;
  grid-template-areas: 'heading' 'main' 'footer';
  grid-template-rows: auto 1fr auto;
}

@media screen and (min-width: 950px) {
  .wrapper {
    width: 75vw;
    height: 75vh;
  }
}

.heading {
  grid-area: heading;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 1rem;
  text-align: center;
  gap: 1rem;
  position: relative;

  &__img {
    height: 100px;
  }

  h1 {
    text-align: start;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
  }

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
  }
}
</style>
