<template>
  <div class="app">
    <header class="app__header">
      <burger class="app__header__burger" :isActive="isSideMenuOpened" @burger-clicked="toggleSideMenu">
      </burger>
      <p class="app__header__home-link"><router-link :to="{ name: 'Home' }">Find a Gamer</router-link></p>
      <div v-if="!$auth.loading">
        <button class="button--primary" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <button class="button--primary" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
    </header>

    <side-menu class="app__sidemenu" :opened="isSideMenuOpened" @backdrop-clicked="toggleSideMenu">
      <ul class="app__sidemenu__nav-list" @click="toggleSideMenu">
        <li class="app__sidemenu__nav-list__item"><router-link :to="{ name: 'myEvents' }">My events</router-link></li>
        <li class="app__sidemenu__nav-list__item"><router-link :to="{ name: 'About' }">My profile</router-link></li>
      </ul>
    </side-menu>

    <main class="app__view-wrapper">
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
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
  },
  mounted() {
    console.log(`Find a Gamer app version ${this.appVersion}`);
  }
};
</script>

<style lang="scss">
$view-spacing: 2rem;
$primary-color: #172A3A;

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #172A3A;
  width: 100%;
  height: 100%;

  &__header {
    display: flex;
    padding: 1rem $view-spacing;
    background-color: $primary-color;
    align-items: center;

    &__home-link {
      font-weight: bold;
      color: #42B983;
      flex-grow: 1;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  &__sidemenu {
    &__nav-list {
      list-style: none;
      padding: 0;
      text-align: left;
      &__item {
        margin-top: 1rem;
        a {
          font-weight: bold;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }

  &__view-wrapper {
    padding: 0 $view-spacing;
    width: 100%;
    box-sizing: border-box;
  }
}

.button {

  &--primary {
    background-color: #42B983;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
  }
}

</style>
