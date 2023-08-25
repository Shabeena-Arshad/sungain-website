<template>
  <div v-if="data && data?.length > 0">
    <q-responsive :ratio="aspectRatio()">
      <q-carousel
        v-model="slide"
        animated
        control-color="white"
        swipeable
        padding
        transition-prev="fade"
        transition-next="fade"
        transition-duration="1200"
        :autoplay="slideInterval"
        arrows
        class="bg-primary"
      >
        <q-carousel-slide
          v-for="row in data"
          :key="row.propertyListingId"
          :name="row.propertyListingId"
          class="q-pa-none"
          :img-src="
            row.bannerPath !== null || row.bannerPath !== ''
              ? `https://insightpropertystorage.blob.core.windows.net/realty-hub-dev/${row.bannerPath}`
              : `@/assets/img/home-bg.webp`
          "
          @click="showPropertyDetails(row)"
        >
        </q-carousel-slide>
      </q-carousel>
    </q-responsive>
  </div>
  <div v-else>
    <q-img src="@/assets/img/home-bg.webp" :ratio="3 / 1" style="height: 380px" />
  </div>
</template>

<script setup lang="ts">
  // Vue Import
  import { PropType, ref } from "vue";
  import { useRouter } from "vue-router";

  // 3rd Party Import
  import { useQuasar } from "quasar";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";

  const props = defineProps({
    data: {
      type: Array as PropType<PropertyListing[] | null>,
      required: false,
      default: null
    }
  });

  const $q = useQuasar();
  const router = useRouter();
  const slideInterval = 10000;
  const data = ref(props.data);

  const slide = ref(data.value?.[0]?.propertyListingId ?? 0);
  function aspectRatio() {
    switch ($q.screen.name) {
      case "xs":
        return 2;
      case "sm":
        return 2;
      case "md":
        return 2.5;
      case "lg":
      default:
        return 3;
    }
  }

  function showPropertyDetails(row: PropertyListing) {
    router.push({ name: "property-detail", params: { id: row.propertyListingId } });
  }
</script>

<style>
  .q-carousel__arrow .q-icon {
    font-size: 46px;
  }
</style>
