import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/modules/home/index.vue")
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/views/modules/services/index.vue")
  },
  {
    path: "/recycling-process",
    name: "recyclingProcess",
    component: () => import("@/views/modules/recycling-process/index.vue")
  },
  {
    path: "/industries-served",
    name: "industriesServed",
    component: () => import("@/views/modules/industries-served/index.vue"),
    props: true
  },
  {
    path: "/testimonials",
    name: "testimonials",
    component: () => import("@/views/modules/testimonials/index.vue")
  },
  {
    path: "/about-us",
    name: "aboutus",
    component: () => import("@/views/modules/about-us/index.vue")
  },
  {
    path: "/sustainability-initiatives",
    name: "sustainabilityInitiatives",
    component: () => import("@/views/modules/sustainability-initiatives/index.vue")
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import("@/views/modules/faq/index.vue")
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/modules/blog-news/index.vue")
  },

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
