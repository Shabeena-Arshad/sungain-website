<template>
  <!-- <q-btn v-bind="$attrs" color="primary"> -->
  <q-btn v-bind="$attrs" :size="$q.screen.lt.lg ? 'md' : 'lg'" flat round text-color="warning">
    <!-- Dynamically inherit slots from parent -->

    <template v-for="slot in parentSlots" #[slot]>
      <slot :name="slot" />
    </template>
  </q-btn>
</template>

<!-- <q-btn :size="$q.screen.lt.lg ? 'md' : 'lg'" flat round text-color="grey-9" icon="arrow_back_ios" /> -->

<script setup lang="ts">
  import { computed, useSlots } from "vue";

  const parentSlots = computed(() => Object.keys(useSlots));
</script>
