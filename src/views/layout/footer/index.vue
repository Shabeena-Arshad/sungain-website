<template>
  <!-- <q-footer> -->
  <suspense>
    <main>
      <portrait v-if="$q.screen.lt.md" />
      <landscape v-else />
    </main>

    <template #fallback>
      <div>fallback</div>
    </template>
  </suspense>
  <!-- </q-footer> -->
</template>

<script setup lang="ts">
  import Landscape from "./landscape.vue";
  import Portrait from "./portrait.vue";
</script>
