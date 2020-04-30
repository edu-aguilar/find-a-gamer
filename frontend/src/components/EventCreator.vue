<template>
  <div class="event-creator">
    <form class="form">
      <div class="form-field">
        <label for="title">Name: </label>
        <input id="title" type="text" v-model="event.title" required />
      </div>

      <div class="form-field">
        <label for="description">Description: </label>
        <textarea
          name="description"
          id=""
          cols="50"
          rows="6"
          v-model="event.description"
          required
        ></textarea>
      </div>

      <div class="form-field">
        <label for="startTime">Start time: </label>
        <datetime
          :min-datetime="now"
          type="datetime"
          id="startTime"
          v-model="event.startTime"
        ></datetime>
      </div>

      <div class="form-field">
        <label for="endTime">End time: </label>
        <datetime
          :min-datetime="event.startTime"
          type="datetime"
          id="endTime"
          v-model="event.endTime"
        ></datetime>
      </div>

      <div class="form-field">
        <label for="gameSelector">Select game: </label>
        <game-selector
          id="gameSelector"
          @game-changed="handleGameChanged"
        ></game-selector>
      </div>

      <button @click="createGame" :disabled="isFormValid" class="form-field">
        Crear partida
      </button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import GameSelector from "@/components/GameSelector";
import { Settings } from "luxon";

Settings.defaultLocale = "en";
Vue.use(Datetime);

export default {
  name: "EventCreator",
  components: { Datetime, GameSelector },
  data() {
    return {
      event: {
        title: null,
        description: null,
        startTime: null,
        endTime: null,
        gameId: null
      },
      now: new Date().toISOString()
    };
  },
  computed: {
    isFormValid() {
      const keys = Object.keys(this.event);
      return keys.some(key => !this.event[key]);
    }
  },
  methods: {
    createGame(ev) {
      ev.preventDefault();
      this.$emit("event-filled", this.event);
    },
    handleGameChanged(game) {
      this.event.gameId = game.gameId;
    }
  }
};
</script>

<style lang="scss" scoped>
.event-creator {
  .form {
    max-width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    .form-field {
      display: flex;

      label {
        margin-right: 1rem;
      }

      & + .form-field {
        margin-top: 1rem;
      }
    }
  }
}
</style>
