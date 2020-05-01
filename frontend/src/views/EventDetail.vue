<template>
  <div class="event-detail">
    <div v-if="!event">
      <p>Fetching event detail...</p>
    </div>
    <div v-else class="event">
      <h1>Event Detail</h1>
      <p>{{ event.title }}</p>
      <p>{{ event.description }}</p>
      <p>Created by: {{ event.ownerId }}</p>
      <p>Starts at: {{ event.startTime }}</p>
      <p>Ends at: {{ event.endTime }}</p>
      <img :src="event.image" class="image" alt="" />
      <div class="comments">
        <h2>Match comments:</h2>
        <ul>
          <li v-for="(comment, index) in event.comments" :key="index">
            <span>User {{ comment.userId }} said: </span>
            <span>{{ comment.message }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getEventById } from "../http/events";

export default {
  name: "EventDetail",
  data() {
    return {
      event: null
    };
  },
  async mounted() {
    const { eventId } = this.$router.currentRoute.params;
    const result = await getEventById(eventId);
    this.event = result.data.item;
  }
};
</script>
