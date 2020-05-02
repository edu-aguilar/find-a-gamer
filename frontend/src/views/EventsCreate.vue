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
        const result = await _createEvent(event);
        const eventId = result.data.item.eventId;
        alert("Event created!!");
        router.push({ name: "eventDetail", params: { eventId } });
      } catch (error) {
        alert("Error creating event");
      }
    }
  }
};
</script>
