<template>
  <div id="app">
    <header id="nav">
      <burger :isActive="isSideMenuOpened" @burger-clicked="toggleSideMenu">
      </burger>
      <p><router-link to="/">Find a Gamer</router-link></p>
    </header>

    <side-menu :opened="isSideMenuOpened" @backdrop-clicked="toggleSideMenu">
      <ul class="sidebar-panel-nav">
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </side-menu>

    <main class="view-wrapper">
      <router-view />
    </main>
  </div>
</template>

<script>
import Burger from "./components/layout/Burger";
import SideMenu from "./components/layout/SideMenu";

export default {
  name: "App",
  components: { Burger, SideMenu },
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
      isSideMenuOpened: false
    };
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpened = !this.isSideMenuOpened;
    }
  },
  mounted() {
    console.log(`Find a Gamer app version ${this.appVersion}`);
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
