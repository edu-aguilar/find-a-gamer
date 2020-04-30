<template>
  <div class="createEvent">
    <h1>Create Event</h1>
    <event-creator @event-filled="createEvent"> </event-creator>
  </div>
</template>

<script>
import EventCreator from "@/components/EventCreator";

export default {
  name: "EventsCreate",
  components: { EventCreator },
  methods: {
    createEvent(event) {
      console.log('create event: ', event)
    }
  }
};
</script>
