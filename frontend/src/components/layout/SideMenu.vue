<template>
  <div class="sidemenu">
    <div
      class="sidemenu-backdrop"
      @click="closesidemenuPanel"
      v-if="opened"
    ></div>
    <transition name="slide">
      <div v-if="opened" class="sidemenu-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    opened: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    closesidemenuPanel() {
      this.$emit("backdrop-clicked");
    }
  }
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidemenu-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidemenu-panel {
  overflow-y: auto;
  background-color: #130f40;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}
</style>
