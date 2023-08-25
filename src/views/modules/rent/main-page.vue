<!-- rent-list.vue -->
<template>
  <q-card flat square>
    <search-bar
      :keyword="filter"
      :mode="SearchMode.Rent"
      :search-bar-data="searchBarData"
      @on-filter="onSearch"
      @on-filter-options="handleFilterOptions"
    />

    <q-card-section v-if="searchBarData != null" class="q-py-xs">
      <listing-grid-table
        v-model:pagination="pagination"
        row-key="propertyListingId"
        :rows="rows"
        :loading="loading"
        @on-contact="handleContact"
        @on-detail="handleDetail"
        @request="loadData"
      />
    </q-card-section>

    <q-card-section v-else class="q-pa-none">
      <no-data />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { onBeforeUnmount, defineAsyncComponent, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";
  import { useQuasar } from "quasar";

  // .ts files
  import eventBus from "@/utils/event-bus";
  import { SearchMode, SEARCH_OPTION_DATA_URL } from "@/constants";
  import useDataTable from "@/composable/use-data-table";

  // Custom Components
  import ListingGridTable from "@/components/table/listing-grid-table.vue";
  import NoData from "@/components/custom/no-data.vue";
  import SearchBar from "@/components/custom/search-bar/index.vue";

  const url = "/PropertyListing/Rent/Datatable";
  const key = "propertyListingId";

  const { filter, filterOptions, loading, pagination, rows, loadData, onRefresh, onSearch } =
    useDataTable(url, key);

  const $q = useQuasar();
  const router = useRouter();
  const searchBarData = ref();
  const error = ref<string | null>(null);

  function handleFilterOptions(val: any) {
    if (val != null) {
      if (val.length != 0) {
        filterOptions.value = JSON.stringify(val);
      }
      loadData({
        filter: filter.value,
        filterOptions: filterOptions.value,
        pagination: pagination.value
      });
    }
  }

  function handleContact() {
    $q.dialog({
      component: defineAsyncComponent(() => import("@/components/dialogs/contact-dialog.vue"))
    });
  }

  function handleDetail(rowData: any) {
    router.push({ name: "property-detail", params: { id: rowData.propertyListingId } });
  }

  onMounted(() => {
    eventBus.on("LoadData", () => {
      loadData({ pagination: pagination.value });
      onRefresh();
    });

    const router = useRouter();
    const { query } = router.currentRoute.value;

    // Check if the route query is an object and contains the key searchKeyword
    if (query?.searchKeyword !== undefined) {
      // Do something with the searchKeyword value
      filter.value = query.searchKeyword as string;
    }

    loadData({ pagination: pagination.value });
  });

  onBeforeUnmount(() => {
    eventBus.off("LoadData");
  });

  //Get data searchbar
  try {
    const response = await axios.get(SEARCH_OPTION_DATA_URL);
    searchBarData.value = response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.status === 404) {
        error.value = "Not found";
      } else {
        error.value = "An error occurred";
      }
    } else {
      error.value = "An unexpected error occurred";
    }
  }
</script>
