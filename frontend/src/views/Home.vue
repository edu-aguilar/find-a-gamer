<template>
  <div class="home">
    <p>APP VERSION: {{ version }}</p>
    <button @click="getEventsByGame">get events</button>
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <game-selector @game-changed="handleGameChanged" :items="availableGames">
    </game-selector>
    <section class="games">
      <ul id="example-1">
        <li v-for="(event, index) in events" :key="index">
          <p>{{ event.title }}</p>
          <p>{{ event.startTime }}</p>
          <p>{{ event.endTime }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { fetchEventsByGame, fetchAvailableGames } from "../http/events";
import gameSelector from "../components/gameSelector";

export default {
  name: "Home",
  components: { gameSelector },
  data: function() {
    return {
      version: process.env.VUE_APP_VERSION,
      events: null,
      availableGames: [],
      selectedGame: null
    };
  },
  async mounted() {
    const result = await fetchAvailableGames();
    this.availableGames = result.data.items;
    this.selectedGame = this.availableGames[0];
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
    async getEventsByGame() {
      const result = await fetchEventsByGame(this.selectedGame.gameId);
      this.events = result.data.items;
    },
    handleGameChanged(game) {
      this.selectedGame = game;
    }
  }
};
</script>
