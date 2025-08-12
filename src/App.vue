<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';
import { fetchData } from './api/api';
import { ShopsList, EventsList } from './api/datatypes';
import WorkshopList from './components/WorkshopList.vue';
import LinksComponent from './components/LinksComponent.vue';

const shops = ref<ShopsList | null>(null);
const events = ref<EventsList | null>(null);

onMounted(async () => {
  const priveShops: ShopsList = await fetchData('prive')('shops', 'list');
  const priveEvents: EventsList = await fetchData('prive')('events', 'list');
  const businessShops: ShopsList = await fetchData('zakelijk')('shops', 'list');
  const businessEvents: EventsList = await fetchData('zakelijk')('events', 'list');

  const concatShops = { data: [...priveShops.data, ...businessShops.data] };
  const concatEvents = { data: [...priveEvents.data, ...businessEvents.data] };
  shops.value = concatShops as ShopsList;
  events.value = concatEvents as EventsList;
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

const routes = [
  { name: 'Links', value: 'links', component: LinksComponent },
  { name: 'Workshops', value: 'workshops', component: WorkshopList },
];

const selected = ref(routes[0].value);

const computedComponent = computed(() => {
  return routes.find(route => route.value === selected.value)?.component || null;
}); 

</script>

<template>
  <div class="wrapper">
    <div class="heading">
      <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem">
        <img class="heading__img"
             src="/shirt-owl-splash-tiny.png"
             alt="logo van mpw">
        <h1>Miniature<br /> Painting<br /> Workshops</h1>
      </div>
      <p class="subtitle">
        <a href="https://www.instagram.com/miniaturepaintingworkshops/" target="_blank" rel="noopener noreferrer">
          @miniaturepaintingworkshops
        </a>
      </p>

      <ul class="socials"><li class="socials__item">
        <a href="https://www.instagram.com/miniaturepaintingworkshops/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </li><li class="socials__item">
        <a href="https://facebook.com/groups/miniaturepaintingworkshops/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-facebook"></i>
        </a>
      </li><li class="socials__item">
        <a href="https://discord.gg/ADr6VWtR" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-discord"></i>
        </a>

      </li></ul>
    </div>
    <div class="main">
      
     <div class="switch">
      <div class="switch__wrapper">
    <template v-for="route in routes" :key="route.value">
      <input
        type="radio"
        :id="route.value"
        :value="route.value"
        v-model="selected"
        class="switch-input u-sr-only"
      />
      <label :for="route.value" class="switch-label" :class="[selected === route.value && 'active']" >{{ route.name }}</label>
        
    </template>
    
</div>
    </div>
      
      <component :is="computedComponent" :items="mappedEvents"/>
      <!-- <template v-if="mappedEvents">
        <WorkshopList :items="mappedEvents"></WorkshopList>
      </template> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  justify-self: center;
  padding: 1rem;
  width: 100%;
  max-width: 580px;
  border-radius: 1.5rem;
  filter: drop-shadow(-1rem 1rem 0.5rem rgba(91, 65, 51, 0.2));
}

.heading {
  border-radius: var(--border-radius);
  background-color: #F7F3EE;
  grid-area: heading;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 1rem;
  text-align: center;
  gap: 0.5rem;
  position: relative;
  padding: 0.75rem;

  &__img {
    height: 100px;
  }

  h1 {
    text-align: start;
    text-transform: uppercase;
    font-size: 1.25rem;

  }

  
}

.subtitle {
  font-size: 1rem;

  @media screen and (min-width: 600px) {
    font-size: 1.25rem;
    
  }
  margin-block: 0.75rem;

  a {
    color: var(--mpw-color-pink); 
    text-decoration: none;
    font-weight: 600;
  }
}

.socials {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  list-style: none;
  padding: 0;

  &__item {
    font-size: 1.75rem;

    a {
      color: var(--mpw-color-pink);
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
}

.switch {
  display: grid;
  justify-content: center;
  margin-bottom: 1rem;

  .active {
    outline-offset: var(--outline-offset-start);
    transition: outline-offset 0.1s ease-in-out;
  }

  &:focus-within {
    .active {
      outline-style: solid;
      outline-offset: var(--outline-offset-focus); 
    }
  }
}
.switch__wrapper {
  display: inline-flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
  background-color: #F7F3EE;
  border-radius: 1000px;
  padding: 0.2rem;
}

.switch-label {
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 1000px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
  height: 45px;
  color: var(--mpw-color-pink);
  outline-offset: var(--outline-offset-start);
  
  &.active {
    color: white;
    background-color: var(--mpw-color-pink); 

    &:hover {
      background-color: var(--mpw-color-pink-dark); 
    }
  }

  
}

</style>
