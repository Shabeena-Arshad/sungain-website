<template>
  <hero-section :data="heroData" />

  <div class="q-ma-xl row justify-center">
    <template v-if="$q.screen.lt.md">
      <q-toolbar class="bg-transparent" style="overflow: hidden; min-width: 334px">
        <custom-search-input v-model="keyword" @search="handleSearch" dense />
      </q-toolbar>

      <q-toolbar class="justify-center q-mt-sm">
        <btn-toggle-buy-sell v-model="selectedOption" rounded size="md" />
      </q-toolbar>
    </template>

    <template v-else>
      <q-toolbar
        class="q-pa-none bg-grey-3"
        style="overflow: hidden; border-radius: 24px; height: 48px; max-width: 960px"
      >
        <btn-toggle-buy-sell square size="lg" v-model="selectedOption" />

        <q-separator vertical />
        <custom-search-input v-model="keyword" @search="handleSearch" />
      </q-toolbar>
    </template>
  </div>

  <feature-listing :data="featurePropertydata" />
  <latest-property :data="data" />
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";
  import { HERO_PROPERTIES_URL, Latest_PROPERTIES_URL, FEATURED_PROPERTIES_URL } from "@/constants";

  // Custom Components
  import BtnToggleBuySell from "./section/btn-toggle-buy-sell.vue";
  import CustomSearchInput from "./section/custom-search-input.vue";
  import FeatureListing from "./section/featured-listing.vue";
  import HeroSection from "./section/hero-section.vue";
  import LatestProperty from "./section/latest-property.vue";

  const keyword = ref("");
  const selectedOption = ref("buy");
  const router = useRouter();

  const data = ref<PropertyListing[]>([]);
  const featurePropertydata = ref<PropertyListing[]>([]);
  const heroData = ref<any | null>(null);
  const error = ref<string | null>(null);

  const handleSearch = () => {
    const queryString = { searchKeyword: keyword.value };
    switch (selectedOption.value) {
      case "buy":
        router.push({ name: "BuyPage", query: queryString });
        break;
      case "rent":
        router.push({ name: "RentPage", query: queryString });
        break;
      default:
        // Do nothing!!
        break;
    }
  };

  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get<PropertyListing[]>(Latest_PROPERTIES_URL),
      axios.get<PropertyListing[]>(HERO_PROPERTIES_URL),
      axios.get<PropertyListing[]>(FEATURED_PROPERTIES_URL)
    ]);
    data.value = response1.data;
    heroData.value = response2.data;
    featurePropertydata.value = response3.data;
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
@/interfaces/property-listing
