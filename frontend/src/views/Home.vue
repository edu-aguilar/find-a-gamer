<template>
  <div class="home">
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <game-selector @game-changed="handleGameChanged"></game-selector>
    <section class="games">
      <ul>
        <li v-for="(event, index) in events" :key="index">
          <router-link
            :to="{ name: 'eventDetail', params: { eventId: event.eventId } }"
          >
            <p>{{ event.title }}</p>
            <p>{{ event.startTime }}</p>
            <p>{{ event.endTime }}</p>
          </router-link>
        </li>
      </ul>
    </section>
    <button class="new-event" @click="goToCreate">
      +
    </button>
  </div>
</template>

<script>
import router from "../router";

import { fetchEventsByGame } from "../http/events";
import GameSelector from "../components/GameSelector";

export default {
  name: "Home",
  components: { GameSelector },
  data() {
    return {
      events: null
    };
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    async getEventsByGame(gameId) {
      const result = await fetchEventsByGame(gameId);
      this.events = result.data.items;
    },
    handleGameChanged(game) {
      this.getEventsByGame(game.gameId);
    },
    goToCreate() {
      router.push({ name: "eventsCreate" });
    }
  }
};
</script>

<style lang="scss" scoped>
.new-event {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  font-size: 20px;
}
</style>
