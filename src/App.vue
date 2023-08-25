<template>
  <app-layout />
</template>

<script setup lang="ts">
  import { provide } from "vue";
  import { EventBus } from "quasar";

  import appLayout from "@/views/layout/index.vue";

  const bus = new EventBus();
  provide("bus", bus);
</script>
