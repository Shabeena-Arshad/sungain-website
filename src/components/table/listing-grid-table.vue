<template>
  <q-table
    ref="qTableRef"
    v-bind="$attrs"
    card-container-class="q-pa-none q-col-gutter-sm"
    binary-state-sort
    flat
    square
    grid
    :hide-pagination="hidePagination"
    :rows-per-page-options="[25, 30, 50]"
    :rows-per-page="25"
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

    <template v-slot:bottom="scope">
      <div class="pagination-container">
        <q-btn flat v-show="!scope.isFirstPage" @click="scope.prevPage">Previous</q-btn>

        <q-pagination
          v-model="scope.pagination.page"
          :max="scope.pagesNumber"
          :max-pages="6"
          color="white"
          text-color="black"
          gutter="15px"
          @update:model-value="updatePagination(scope.pagination.page, scope)"
        />
        <q-btn flat v-show="!scope.isLastPage" @click="scope.nextPage">Next</q-btn>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import ListingCard from "@/components/cards/for-sale.vue";
  import { QTable } from "quasar";
  import { ref } from "vue";

  const qTableRef = ref(null);

  const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-contact", value: string): void;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-detail", value: string): void;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-detail", value: string): void;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-pagination", value: number): void;
  }>();

  defineProps({
    hidePagination: { type: Boolean, default: false }
  });

  function handleContact(props: any) {
    emits("on-contact", props);
  }

  function handleDetail(props: any) {
    emits("on-detail", props);
  }

  function updatePagination(val: any, scope: any) {
    if (qTableRef.value) {
      const qTable = qTableRef.value as QTable;
      const { pagination } = scope;

      if (pagination) {
        pagination.page = val;
        qTable.requestServerInteraction({
          pagination: {
            ...pagination,
            sortBy: pagination.sortBy || undefined
          }
        });
      }
    }
    //emits("on-pagination", val);
  }
</script>

<style lang="scss">
  .custom-grid-item {
    width: 100%;

    /* Oberrid the style lg breakpoint */
    @media (min-width: $breakpoint-lg-min) {
      width: 20% !important;
    }
  }
  .grid-style-transition {
    transition:
      transform 0.28s,
      background-color 0.28s;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
</style>
