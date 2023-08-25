<template>
  <q-btn v-bind="$attrs" color="primary" :icon="imageIcon">
    <!-- Dynamically inherit slots from parent -->

    <template v-for="slot in parentSlots" #[slot]>
      <slot :name="slot" />
    </template>
  </q-btn>
</template>

<script setup lang="ts">
  import { computed, useSlots } from "vue";

  defineProps({
    imageIcon: {
      type: String
    }
  });

  const parentSlots = computed(() => Object.keys(useSlots));
</script>
