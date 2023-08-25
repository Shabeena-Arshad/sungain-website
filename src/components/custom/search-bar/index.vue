<template>
  <!-- Toolbar for xs and sm screen sizes -->
  <template v-if="$q.screen.lt.lg">
    <q-toolbar>
      <div class="text-h4 text-secondary">
        {{ $t(`searchBar.mode.${mode}`) }}
      </div>
      <q-space />
      <keyword-input :keyword="keyword" @change="handleKeywordChange" />
    </q-toolbar>

    <q-toolbar class="bg-grey-3 shadow-2">
      <q-space />
      <location-dropdown @selectedlocation="handleLocationChange" />
      <range-select-dropdown :options="priceOptions" @change="handlePriceChange" />
      <range-select-dropdown :options="bedOptions" @change="handleBedroomChange" />
      <features-dropdown @change="handleFeatureChange" />
      <range-select-dropdown :options="sizeOptions" @change="handleSizeChange" />
      <q-space />
    </q-toolbar>
  </template>

  <!-- Toolbar for md, lg, and xl screen sizes -->
  <template v-else>
    <q-toolbar class="q-px-xl shadow-5">
      <div class="text-h6 text-secondary">
        {{ $t(`searchBar.mode.${mode}`) }}
      </div>
      <q-separator class="q-ml-xl q-mr-md" vertical />

      <keyword-input :keyword="keyword" @change="handleKeywordChange" />
      <q-separator class="q-mx-md" vertical />

      <location-dropdown @selectedlocation="handleLocationChange" />
      <range-select-dropdown :options="priceOptions" @change="handlePriceChange" />
      <range-select-dropdown :options="bedOptions" @change="handleBedroomChange" />
      <features-dropdown @change="handleFeatureChange" />
      <range-select-dropdown :options="sizeOptions" @change="handleSizeChange" />
      <q-separator class="q-mx-md" vertical />
    </q-toolbar>
    <q-separator />
  </template>
</template>

<script setup lang="ts">
  //Vue Import
  import { ref, provide } from "vue";

  // .ts file
  import { extractAmenities, extractLocation } from "@/composable/use-search-bar-options";
  import { FilterOptions, RangeValue, SearchBarOptions } from "@/interfaces/search-bar-options";
  import { SearchMode } from "@/constants";

  // Custom Components
  import KeywordInput from "./keyword-input.vue";
  import FeaturesDropdown from "./features-dropdown.vue";
  import LocationDropdown from "./location-dropdown.vue";
  import RangeSelectDropdown from "./range-select-dropdown.vue";

  const emit = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-filter", props: any): void;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: "on-filter-options", props: any): void;
  }>();
  const props = defineProps({
    keyword: {
      type: String
    },
    mode: {
      type: String
    },
    searchBarData: {
      type: Object
    }
  });

  const priceOptions = {
    icon: "fas fa-dollar-sign",
    label: "searchBar.price.label",
    title: "searchBar.price.title",
    unit: props.mode == SearchMode.Rent ? "K" : "Million"
  };

  const bedOptions = {
    icon: "fa-solid fa-bed",
    label: "searchBar.bedroom.label",
    markerLabels: { 0: "Studio", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5+" },
    multiplier: 1,
    title: "searchBar.bedroom.title",
    unit: "Rooms"
  };

  const sizeOptions = {
    icon: "",
    label: "searchBar.size.label",
    markerLabels: { 0: "0", 1: "400", 2: "800", 3: "1200", 4: "1600", 5: "2000+" },
    multiplier: 400,
    title: "searchBar.size.title",
    unit: "Sq Ft"
  };

  const res = ref<FilterOptions>({
    locations: [],
    features: null,
    bedrooms: { min: 0, max: 5 },
    price: { min: 0, max: null },
    size: null
  });

  const features = extractAmenities(props.searchBarData);
  const locations = extractLocation(props.searchBarData);

  const handleBedroomChange = (e: any) => {
    const max = e.max >= 5 ? null : e.max;
    const output = { min: e.min, max: max } as RangeValue;

    res.value.bedrooms = output;
    emit("on-filter-options", res.value);
  };

  const handleFeatureChange = (e: any) => {
    res.value.features = e;
    emit("on-filter-options", res.value);
  };

  const handleKeywordChange = (val: string) => {
    emit("on-filter", val);
  };

  const handleLocationChange = (e: any) => {
    res.value.locations = e;
    emit("on-filter-options", res.value);
  };

  const handlePriceChange = (e: any) => {
    const multiplifer = props.mode == SearchMode.Rent ? 10000 : 1000000;
    const max = e.max >= 5 ? null : e.max * multiplifer;
    const output = { min: e.min * multiplifer, max: max } as RangeValue;

    res.value.price = output;
    emit("on-filter-options", res.value);
  };

  const handleSizeChange = (e: any) => {
    const multiplifer = 400;
    const max = e.max >= 5 ? null : e.max * multiplifer;
    const output = { min: e.min * multiplifer, max: max } as RangeValue;

    res.value.size = output;
    emit("on-filter-options", res.value);
  };

  provide<SearchBarOptions>("searchOptions", {
    territories: locations,
    features: features
  });
</script>
