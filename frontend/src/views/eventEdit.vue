<template>
  <div class="event-edit">
    <h1>Edit event</h1>
    <form v-if="updatedEvent" class="event-edit__form">
      <div class="event-edit__form__form-field">
        <label for="title">Name: </label>
        <input id="title" type="text" v-model="updatedEvent.title" required />
      </div>

      <div class="event-edit__form__form-field">
        <label for="description">Description: </label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="6"
          v-model="updatedEvent.description"
          required
        ></textarea>
      </div>

      <div class="event-edit__form__form-field">
        <label for="startTime">Start time: </label>
        <datetime
          :min-datetime="now"
          type="datetime"
          id="startTime"
          v-model="updatedEvent.startTime"
        ></datetime>
      </div>

      <div class="event-edit__form__form-field">
        <label for="endTime">End time: </label>
        <datetime
          :min-datetime="updatedEvent.startTime"
          type="datetime"
          id="endTime"
          v-model="updatedEvent.endTime"
        ></datetime>
      </div>

      <button
        @click="updateEvent"
        :disabled="!isFormChanged"
        class="form-field"
      >
        Update Event
      </button>
    </form>
    <div v-else>
      <p>Fetching event...</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { Settings } from "luxon";

Settings.defaultLocale = "en";
Vue.use(Datetime);

import { getEventById, updateEvent as _updateEvent } from "../http/events";

export default {
  name: "EventEdit",
  components: { Datetime },
  data() {
    return {
      event: null,
      updatedEvent: null,
      now: new Date().toISOString()
    };
  },
  computed: {
    isFormChanged() {
      return (
        this.event.title !== this.updatedEvent.title ||
        this.event.description !== this.updatedEvent.description ||
        this.event.startTime !== this.updatedEvent.startTime ||
        this.event.endTime !== this.updatedEvent.endTime
      );
    }
  },
  async mounted() {
    const { eventId } = this.$router.currentRoute.params;
    const result = await getEventById(eventId);
    this.event = result.data.item;
    this.updatedEvent = {
      title: this.event.title,
      description: this.event.description,
      startTime: this.event.startTime,
      endTime: this.event.endTime
    };
  },
  methods: {
    async updateEvent(ev) {
      ev.preventDefault();

      try {
        await _updateEvent(this.updatedEvent, this.event.eventId);
      } catch (error) {
        alert("error updating event: ", error.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.event-edit {
  &__form {
    &__form-field + &__form-field {
      margin-top: 1rem;
    }
  }
}
</style>
