import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: authGuard
  },
  {
    path: "/events/create",
    name: "eventsCreate",
    component: () =>
      import(
        /* webpackChunkName: "eventsCreate" */ "../views/EventsCreate.vue"
      ),
    beforeEnter: authGuard
  },
  {
    path: "/events/:eventId",
    name: "eventDetail",
    component: () =>
      import(/* webpackChunkName: "eventDetail" */ "../views/EventDetail.vue")
  },
  {
    path: "/events/:eventId/edit",
    name: "eventEdit",
    component: () =>
      import(/* webpackChunkName: "eventEdit" */ "../views/eventEdit.vue")
  },
  {
    path: "/my/events",
    name: "myEvents",
    component: () =>
      import(/* webpackChunkName: "myEvents" */ "../views/MyEvents.vue"),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
