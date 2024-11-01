<script setup lang="ts">
    defineProps<{
        id: string,
        name: string,
        price: string,
        url: string | undefined,
        dates: {
            ['flat_date']: string
        }[]
    }>()
</script>

<template>
    <div class="item"
         :data-eventid="id">
        <img :src="`https://api.eventgoose.com/v1/events/${id}/banner`"
             alt="">
        <div class="item__wrap">
            <h2>{{ name }}</h2>

            <div class="item__dateprice">
            <div>
            <p v-if="dates.length == 1">
                Workshop date: {{ dates[0].flat_date }}
            </p>
            <template v-else>
                <p><strong>Workshop dates:</strong></p>
                <ul>
                    <li v-for="date in dates">
                        {{ date.flat_date }}
                    </li>
                </ul>
            </template>
</div>
            <p class="item__price">€ {{ price }}</p>
</div>
            <a class="button"
               :href="url"
               target="_blank">Ticket shop</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item {
    background-color: #F7F3EE;
    border-radius: 0.5rem;
    filter: drop-shadow(0rem 0rem 0.25rem rgba(91, 65, 51, 0.2));
    display: grid;
    grid-template-areas: 'heading' 'main' 'footer';
    grid-template-rows: auto 1fr auto;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
}

.item__wrap {
    padding: 1rem;
}

.item__price {
    font-size: 2rem;
    font-weight: 300;
    color: var(--title-color);
}

.item__dateprice {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    ul {
        list-style-type: none;
        padding-inline-start: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
}

.button {
    background-color: #ed1e79;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 200rem;
}</style>