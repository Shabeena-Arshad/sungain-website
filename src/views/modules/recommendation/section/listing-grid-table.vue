<template>
  <q-table
    ref="qTableRef"
    class="q-pa-lg centered-table"
    v-bind="$attrs"
    card-container-class="q-pa-none q-col-gutter-lg"
    binary-state-sort
    flat
    square
    grid
    hidePagination
    :rows-per-page="500"
  >
    <template #item="props">
      <div class="col-12 col-lg-6 grid-style-transition">
        <listing-card :row-data="props.row" />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";

  // 3rd Party Import
  import { QTable } from "quasar";

  // Custom Components
  import ListingCard from "./listing-card/index.vue";

  const qTableRef = ref(null);
</script>

<style lang="scss">
  .grid-style-transition {
    transition:
      transform 0.28s,
      background-color 0.28s;
  }

  .centered-table {
    max-width: 1600px;
    margin: 0 auto;
  }
</style>
