import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Currencies from "../views/Currencies.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/currencies",
    name: "currencies",
    component: Currencies,
    children: [
      {
        path: "add",
        name: "addCurrency",
        component: Currencies,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
