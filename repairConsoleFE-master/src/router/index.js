import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "kategorien",
    component: () => import(/* webpackChunkName: "about" */ "../views/kategorie-liste.vue")
  },

  {
    path: "/aufträge",
    name: "aufträge",
    component: () => import(/* webpackChunkName: "about" */ "../views/aufträge-tabelle.vue")
  },

  {
    path: "/reparatur-geraet-liste",
    name: "ReparaturGeraetListe",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/repatur-geraet-liste/repatur-geraet-liste.vue"
      )
  },

  {
    path: "/gefilterte-liste",
    name: "ReparaturGeraetListe",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/repatur-geraet-liste/repatur-geraet-liste.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL + "repair-console/",
  routes
});

export default router;
