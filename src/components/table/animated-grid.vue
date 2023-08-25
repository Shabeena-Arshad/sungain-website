<template>
  <q-scroll-observer @scroll="onScroll" />
  <q-table
    ref="qTableRef"
    v-bind="$attrs"
    card-container-class="q-pa-none q-col-gutter-sm"
    binary-state-sort
    flat
    square
    grid
    :pagination="{ rowsPerPage: 30 }"
  >
    <template #item="props">
      <div v-if="$q.screen.xl" class="custom-grid-item col-lg-2 grid-style-transition">
        <listing-card
          :row="props.row"
          @on-contact="handleContact(props.row)"
          @on-detail="handleDetail(props.row)"
        />
      </div>

      <div v-else class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
        <listing-card
          :row="props.row"
          @on-contact="handleContact(props.row)"
          @on-detail="handleDetail(props.row)"
        />
      </div>
    </template>

    <template v-slot:bottom="scope"> </template>
  </q-table>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";

  // Custom Components
  import ListingCard from "@/components/cards/for-sale.vue";

  const emits = defineEmits(["on-contact", "on-detail"]);
  defineProps({
    hidePagination: { type: Boolean, default: false }
  });

  const qTableRef = ref(null);
  const scrollInfo = ref<any>({});

  function handleContact(props: any) {
    emits("on-contact", props);
  }

  function handleDetail(props: any) {
    emits("on-detail", props);
  }

  function onScroll(info: any) {
    scrollInfo.value = info;
  }
</script>

<style lang="scss">
  .custom-grid-item {
    width: 100%;

    /* Overrid the style lg breakpoint */
    @media (min-width: $breakpoint-lg-min) {
      width: 20% !important;
    }
  }

  .grid-style-transition {
    transition:
      transform 0.2s,
      background-color 0.2s;
  }
</style>
