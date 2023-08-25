import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/modules/home/index.vue")
  },
  {
    path: "/buy",
    name: "BuyPage",
    component: () => import("@/views/modules/buy/index.vue")
  },
  {
    path: "/rent-listing",
    name: "RentPage",
    component: () => import("@/views/modules/rent/index.vue")
  },
  {
    path: "/property-listing",
    name: "property-listing",
    component: () => import("@/views/modules/list/index.vue"),
    props: true
  },
  {
    path: "/agents",
    name: "agents",
    component: () => import("@/views/modules/agents/index.vue")
  },
  {
    path: "/about-us",
    name: "about-us",
    component: () => import("@/views/modules/about-us/index.vue")
  },
  {
    path: "/recommendation/:id",
    name: "recommendation",
    component: () => import("@/views/modules/recommendation/index.vue")
  },
  {
    path: "/property-detail/:id",
    name: "property-detail",
    component: () => import("@/views/modules/property-details/index.vue")
  },
  // {
  //   path: "/property-detail/:id",
  //   name: "property-detail",
  //   component: () => import("@/views/modules/property-details/index.vue")
  // },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("@/views/modules/errors/error-404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
