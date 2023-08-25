<template>
  <q-toolbar class="bg-grey-3 q-ma-none q-px-md shadow-1">
    <keyword-input @change="handleKeywordChange" />
    <q-separator class="q-mx-md" vertical />

    <location-dropdown @selectedlocation="handleLocationChange" />
    <price-dropdown @change="handlePriceChange" />
    <bedroom-dropdown @change="handleBedroomChange" />
    <features-dropdown @change="handleFeatureChange" />
    <size-dropdown @change="handleSizeChange" />
    <q-space />
    <div>ddd</div>
  </q-toolbar>
</template>

<script setup lang="ts">
  import { computed, ref, provide } from "vue";
  import { SearchBarOptions } from "@/interfaces/search-bar-options";

  import {
    bedrooms,
    salePriceMarker,
    sizeMarker,
    extractAmenities,
    extractLocation
  } from "@/composable/use-search-bar-options";
  import KeywordInput from "./keyword-input.vue";
  import BedroomDropdown from "./bedroom-dropdown.vue";
  import FeaturesDropdown from "./features-dropdown.vue";
  import LocationDropdown from "./location-dropdown.vue";
  import PriceDropdown from "./price-dropdown.vue";
  import SizeDropdown from "./size-dropdown.vue";

  const props = defineProps({
    searchBarData: {
      type: Object
    }
  });

  const emit = defineEmits<{
    (event: "on-refresh"): void;
    (event: "on-search", props: any): void;
    (event: "on-filter", props: any): void;
  }>();

  const keyWord = ref();
  const filterOption = ref({
    locations: [],
    bedrooms: null,
    features: null,
    price: null,
    size: null
  });

  const features = extractAmenities(props.searchBarData);
  const locations = extractLocation(props.searchBarData);

  const handleKeywordChange = (e: any) => {
    keyWord.value = e.value;
    emit("on-search", keyWord.value);
  };

  const handleLocationChange = (e: any) => {
    filterOption.value.locations = e;
    emit("on-filter", filterOption.value);
  };

  const handlePriceChange = (e: any) => {
    filterOption.value.price = e;
    emit("on-filter", filterOption.value);
  };

  const handleBedroomChange = (e: any) => {
    filterOption.value.bedrooms = e;
    emit("on-filter", filterOption.value);
  };

  const handleFeatureChange = (e: any) => {
    filterOption.value.features = e;
    emit("on-filter", filterOption.value);
  };

  const handleSizeChange = (e: any) => {
    filterOption.value.size = e;
    emit("on-filter", filterOption.value);
  };

  const priceMarkerLabels = computed(() => salePriceMarker);

  provide<SearchBarOptions>("searchOptions", {
    territories: locations,
    bedrooms: bedrooms,
    features: features,
    price: priceMarkerLabels.value,
    size: sizeMarker
  });
</script>
