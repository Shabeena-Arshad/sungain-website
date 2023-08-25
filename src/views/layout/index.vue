<template>
  <q-layout view="hHh lpR fFf">
    <template v-if="route.name == 'property-detail'">
      <q-page-container>
        <router-view :key="$route.fullPath"></router-view>
      </q-page-container>
    </template>

    <template v-else-if="route.name == 'recommendation'">
      <q-page-container>
        <router-view :key="$route.fullPath"></router-view>
      </q-page-container>
      <app-footer />
    </template>

    <template v-else>
      <portrait v-if="$q.screen.lt.md" @on-click="toggleDrawer" />
      <landscape v-else />

      <q-page-container style="min-height: calc(100vh - 163px)">
        <router-view :key="$route.fullPath"></router-view>
      </q-page-container>

      <app-footer />
    </template>
  </q-layout>
</template>

<script setup lang="ts">
  // Vue Import
  import { useRoute } from "vue-router";

  // Custom Components
  import AppFooter from "./footer/index.vue";
  import eventBus from "@/utils/event-bus";
  import Landscape from "./header/landscape.vue";
  import Portrait from "./header/portrait.vue";

  const route = useRoute();

  const toggleDrawer = () => {
    eventBus.emit("toggle-drawer");
  };
</script>
