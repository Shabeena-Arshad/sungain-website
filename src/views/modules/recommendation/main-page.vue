<template>
  <q-page class="bg-grey-2">
    <q-toolbar class="q-pa-md shadow-1 bg-white row justify-between">
      <q-btn flat unelevated class="q-pa-none no-hover" :ripple="false" @click="navigateHome">
        <q-img :src="logo" width="196px" fit="contain" />
      </q-btn>

      <q-toolbar-title v-if="$q.screen.gt.sm" class="text-h5 text-center">
        {{ $t("recommend.title") }}
      </q-toolbar-title>

      <language-select class="q-mr-md" />
    </q-toolbar>

    <q-bar
      v-if="$q.screen.lt.md"
      class="bg-grey text-white justify-center q-mb-sm"
      style="width: 100%"
    >
      <div class="text-h5">
        {{ $t("recommend.title") }}
      </div>
    </q-bar>

    <agent-card v-if="agent" :agent="agent" :recommendation-date="recommendation?.createdAt" />

    <div v-if="recommendedProperties && recommendedProperties.length">
      <listing-grid-table row-key="propertyListingId" :rows="recommendedProperties" />
    </div>

    <template v-else>
      <error-404 :error="error" />
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="z-max">
      <q-btn fab icon="fa-brands fa-whatsapp" color="accent" @click="navigateToWhatsApp" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";

  //.ts Import
  import { Agent } from "@/interfaces/agent";
  import { PropertyListing } from "@/interfaces/property-listing";
  import { Recommendation } from "@/interfaces/recommendation";

  // Custom Components
  import AgentCard from "./section/agent-card.vue";
  import Error404 from "../errors/error-404.vue";
  import LanguageSelect from "@/components/custom/language-select.vue";
  import ListingGridTable from "./section/listing-grid-table.vue";

  const router = useRouter();
  const route = useRoute();
  const recommendationId = Number(route.params.id);

  const logo = ref("/img/icons/logo.png");

  const error = ref<string | null>(null);
  const recommendedProperties = ref<PropertyListing[]>();
  const agent = ref<Agent>();
  const agentContact = ref(agent.value);
  const recommendation = ref<Recommendation>();

  const navigateHome = () => {
    router.push("/");
  };

  function navigateToWhatsApp() {
    const whatsappURL = `https://wa.me/${agentContact.value?.phone}?text=Hello,%20I'm%20interested%20in%20your%20property.`;
    window.open(whatsappURL, "_blank");
  }

  try {
    const [response1] = await Promise.all([
      axios.get<Recommendation>(`/Recommendation/RecommendationProperties/${recommendationId}`)
    ]);
    recommendation.value = response1.data;
    recommendedProperties.value = recommendation.value.propertyListings ?? [];
    agent.value = recommendation.value.agent;
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
