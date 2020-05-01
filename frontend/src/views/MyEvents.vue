<template>
  <div>
    <section class="games">
      <ul>
        <li v-for="(event, index) in events" :key="index">
          <router-link
            :to="{ name: 'eventDetail', params: { eventId: event.eventId } }"
          >
            <p>{{ event.title }}</p>
            <p>{{ event.startTime }}</p>
            <p>{{ event.endTime }}</p>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { getEventsByUser } from "@/http/events";
import { getUserIdFromJWT } from "@/utils/token";

export default {
  name: "EventDetail",
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
