<template>
  <div class="my-events-view">
    <p class="my-events-view__title">Events created by you:</p>
    <section class="my-events-view__events">
      <ul class="my-events-view__events__list">
        <li class="my-events-view__events__list__item" v-for="(event, index) in events" :key="index">
          <event-card :event="event"></event-card>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { getEventsByUser } from "@/http/events";
import { getUserIdFromJWT } from "@/utils/token";
import EventCard from "../components/EventCard";

export default {
  name: "EventDetail",
  components: { EventCard },
  data() {
    return {
      events: null
    };
  },
  async mounted() {
    const jwt = await this.$auth.getJwt();
    const userId = getUserIdFromJWT(jwt);
    const result = await getEventsByUser(userId);
    this.events = result.data.items;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .my-events-view {

    &__title {
      text-align: left;
    }

    &__events {
      &__list {
        padding: 0;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

        &__item {
          list-style: none;
        }
      }
    }
  }
</style>
