<template>
  <div class="game-selector">
    <select
      name="game-selector"
      id="game-selector"
      @change="gameChanged($event)"
    >
      <option :value="index" v-for="(item, index) in items" :key="index">
        <span>{{ item.acronym }}</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "game-selector",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    gameChanged(event) {
      const optionValue = event.target.value;
      this.$emit("game-changed", this.items[optionValue]);
    }
  }
};
</script>

<style></style>
