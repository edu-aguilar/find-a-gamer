<template>
  <div class="game-selector">
    <select
      name="game-selector"
      id="game-selector"
      @change="gameChanged($event)"
    >
      <option :value="index" v-for="(game, index) in games" :key="index">
        <span>{{ game.acronym }}</span>
      </option>
    </select>
  </div>
</template>

<script>
import { fetchAvailableGames } from "../http/events";

export default {
  name: "GameSelector",
  data() {
    return {
      games: []
    };
  },
  methods: {
    gameChanged(event) {
      const optionValue = event.target.value;
      this.$emit("game-changed", this.games[optionValue]);
    }
  },
  async mounted() {
    const result = await fetchAvailableGames();
    this.games = result.data.items;
    this.$emit("game-changed", this.games[0]);
  }
};
</script>

<style></style>
