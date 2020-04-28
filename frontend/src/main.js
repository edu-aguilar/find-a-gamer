import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "./auth";

// TODO: move this to local NODE vars and inject from vue.config.js at build time.
const domain = "dev-0t584hj4.eu.auth0.com";
const clientId = "VbQxHxdZUgFyTStx5vh3ptBMPJ7fcUwH";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
