<template>
  <div class="home-view">
    <section class="home-view__current-game">
      <p v-if="this.currentGame">Latest {{ this.currentGame.name }} events:</p>
      <game-selector class="home-view__current-game__game-selector" @game-changed="handleGameChanged"></game-selector>
    </section>
    <section class="home-view__events">
      <ul class="home-view__events__list">
        <li class="home-view__events__list__item" v-for="(event, index) in events" :key="index">
          <event-card :event="event"></event-card>
        </li>
      </ul>
    </section>
    <button class="home-view__new-event" @click="goToCreate">
      +
    </button>
  </div>
</template>

<script>
import router from "../router";

import { fetchEventsByGame } from "../http/events";
import GameSelector from "../components/GameSelector";
import EventCard from "../components/EventCard";

export default {
  name: "Home",
  components: { GameSelector, EventCard },
  data() {
    return {
      events: null,
      currentGame: null
    };
  },
  methods: {
    async getEventsByGame(gameId) {
      const result = await fetchEventsByGame(gameId);
      this.events = result.data.items;
    },
    handleGameChanged(game) {
      this.currentGame = game;
      this.getEventsByGame(game.gameId);
    },
    goToCreate() {
      router.push({ name: "eventsCreate" });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-view {

  &__current-game {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__events {

    &__list {
      padding: 0;
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

      &__item {
        list-style: none;
      }
    }
  }

  &__new-event {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    font-size: 20px;
    padding-bottom: 11px;
    background-color: #42B983;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
