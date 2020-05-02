<template>
  <router-link
    class="event-card"
    :to="{ name: 'eventDetail', params: { eventId: event.eventId } }"
  >
    <img class="event-card__image" v-if="event.image" :src="event.image" alt="event image">
    <div class="event-card__data">
      <p>{{ event.title }}</p>
      <p>{{ event.startTime }}</p>
      <p>{{ event.endTime }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  }
};
</script>

<style lang="scss" scoped>
  .event-card {
    display: block;
    height: 100%;
    text-decoration: none;
    border: solid 1px #A4243B;
    border-radius: 10px;
    transition: all 0.2s ease;
    color: #172A3A;
    
    &:visited {
      color: inherit;
    }
    &:hover, &:focus {
      box-shadow: 4px 8px 12px 0 rgba(164, 36, 59,0.3);
      transform: translatey(-4px);
    }

    &__data {}
    &__image {
      width: 100%;
      max-height: 150px;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      object-fit: cover;
    }
  }
</style>
