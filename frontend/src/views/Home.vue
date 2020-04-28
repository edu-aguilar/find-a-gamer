<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>APP VERSION: {{ version }}</p>
    <button @click="fetchGames">fetch csgo games</button>
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <section class="games">
      <ul id="example-1">
        <li v-for="(game, index) in games" :key="index">
          <p>{{ game.title }}</p>
          <p>{{ game.startTime }}</p>
          <p>{{ game.endTime }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { fetchEventsByGame } from "../http/events";

export default {
  name: "Home",
  data: function() {
    return {
      version: process.env.VUE_APP_VERSION,
      games: null
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
    async fetchGames() {
      const result = await fetchEventsByGame("csgoID");
      this.games = result.data.items;
    }
  }
};
</script>
