<template>
  <div class="createEvent">
    <h1>Create Event</h1>
    <event-creator @event-filled="createEvent"> </event-creator>
  </div>
</template>

<script>
import EventCreator from "@/components/EventCreator";
import { createEvent as _createEvent } from "@/http/events";

export default {
  name: "EventsCreate",
  components: { EventCreator },
  methods: {
    createEvent(event) {
      console.log("create event: ", event);
      _createEvent(event);
      // TODO: handle createEvent response
    }
  }
};
</script>
