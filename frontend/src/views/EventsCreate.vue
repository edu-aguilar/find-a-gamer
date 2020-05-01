<template>
  <div class="createEvent">
    <h1>Create Event</h1>
    <event-creator @event-filled="createEvent"> </event-creator>
  </div>
</template>

<script>
import router from "@/router";
import EventCreator from "@/components/EventCreator";
import { createEvent as _createEvent } from "@/http/events";

export default {
  name: "EventsCreate",
  components: { EventCreator },
  methods: {
    async createEvent(event) {
      try {
        await _createEvent(event);
        alert('Event created!! yout will be redirected to home.')
        router.push({ name: "Home" });
      } catch (error) {
        alert('Error creating event');
      }
    }
  }
};
</script>
