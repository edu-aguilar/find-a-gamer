<template>
  <div class="event-detail">
    <h1>Event Detail</h1>
  </div>
</template>

<script>
import { getEventById } from "../http/events";

export default {
  name: "EventDetail",
  async mounted() {
    const { eventId } = this.$router.currentRoute.params;
    console.log(eventId)
    const result = await getEventById(eventId)
    this.event = result.data.item;
  },
};
</script>
