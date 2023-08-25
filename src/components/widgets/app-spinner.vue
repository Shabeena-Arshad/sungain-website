<template>
  <q-spinner-cube v-bind="$attrs" color="primary">
    <template v-for="slot in parentSlots" #[slot]>
      <slot :name="slot" />
    </template>
  </q-spinner-cube>
</template>

<script setup lang="ts">
  import { computed, useSlots } from "vue";

  const parentSlots = computed(() => Object.keys(useSlots));
</script>
