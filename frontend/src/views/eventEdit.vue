<template>
  <div class="event-edit__view">
    <loader class="event-edit__view__loader" v-if="updatingEvent"></loader>
    <h1>Edit event</h1>
    <section class="event-edit__view__data">
      <h2>Update Event data</h2>
      <form v-if="updatedEvent" class="event-edit__view__data__form">
        <div class="event-edit__view__data__form__form-field">
          <label for="title">Name: </label>
          <input id="title" type="text" v-model="updatedEvent.title" required />
        </div>

        <div class="event-edit__view__data__form__form-field">
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

        <div class="event-edit__view__data__form__form-field">
          <label for="startTime">Start time: </label>
          <datetime
            :min-datetime="now"
            type="datetime"
            id="startTime"
            v-model="updatedEvent.startTime"
          ></datetime>
        </div>

        <div class="event-edit__view__data__form__form-field">
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
          class="event-edit__view__data__form__form-field"
        >
          Update Event
        </button>
      </form>
      <div v-else>
        <p>Fetching event...</p>
      </div>
    </section>
    <section class="event-edit__view__image">
      <h2>Update Event Image</h2>
      <div class="event-edit__view__image__current" v-if="event && event.image">
        <p>Current Event image</p>
        <img :src="event.image" alt="current event image" />
        <p>If you want to change it, just upload new one below!!</p>
      </div>
      <div v-else>
        <p>You have not defined an image to this Event yet!!</p>
      </div>
      <form class="event-edit__view__image__new">
        <label for="imageUpload">Update image: </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          placeholder="Image to upload"
          @change="handleFileChange"
        />
      </form>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { Settings } from "luxon";

Settings.defaultLocale = "en";
Vue.use(Datetime);

import {
  getEventById,
  updateEvent as _updateEvent,
  generateEventImageUploadUrl,
  attachImageToEvent
} from "../http/events";

export default {
  name: "EventEdit",
  components: { Datetime },
  data() {
    return {
      event: null,
      updatedEvent: null,
      now: new Date().toISOString(),
      updatingEvent: false
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
        this.updatingEvent = true;
        await _updateEvent(this.updatedEvent, this.event.eventId);
        this.event = { ...this.event, ...this.updatedEvent };
      } catch (error) {
        alert("error updating event: ", error.message);
      } finally {
        this.updatingEvent = false;
      }
    },
    async handleFileChange(ev) {
      ev.preventDefault();

      const eventId = this.event.eventId;
      const newImage = event.target.files[0];
      if (!newImage) return;

      try {
        this.updatingEvent = true;
        const response = await generateEventImageUploadUrl(eventId);
        const uploadUrl = response.data.uploadUrl;
        await attachImageToEvent(newImage, uploadUrl);
        const fr = new FileReader();
        fr.onload = () => Vue.set(this.event, "image", fr.result);
        fr.readAsDataURL(newImage);
        alert("Image added successfully!");
      } catch (error) {
        alert("Error uploading image");
      } finally {
        this.updatingEvent = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.event-edit {
  &__view {
    position: relative;

    &__loader {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    &__data {
      &__form {
        &__form-field + &__form-field {
          margin-top: 1rem;
        }
      }
    }

    &__image {
      &__current {
        img {
          width: 200px;
          max-width: 500px;
        }
      }
    }
  }
}
</style>
