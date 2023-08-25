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
          :key="row.id"
          :name="row"
          class="q-pa-none"
          :img-src="row.img !== null && row.img !== '' ? `${row.img}` : `@/assets/img/home-bg.webp`"
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
  import { ref } from "vue";
  //import { useRouter } from "vue-router";
  import WelcomeImage from "@/assets/img/welcome.jpg";
  import MetalsPurchased from "@/assets/img/metals-purchased.jpg";
  import FloorTiles from "@/assets/img/floor-tiles-banner.jpg";
  import CollectionService from "@/assets/img/collection-service.jpg";
  import VehicleRecycling from "@/assets/img/vehicle-recycling.jpg";
  // 3rd Party Import
  import { useQuasar } from "quasar";

  const data = ref([
    {
      id: 1,
      img: WelcomeImage
    },
    {
      id: 2,
      img: MetalsPurchased
    },
    {
      id: 3,
      img: FloorTiles
    },
    {
      id: 4,
      img: CollectionService
    },
    {
      id: 5,
      img: VehicleRecycling
    }
  ]);

  const $q = useQuasar();
  // const router = useRouter();
  const slideInterval = 10000;

  const slide = ref(0);
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

  function showPropertyDetails(row: any) {
    // router.push({ name: "property-detail", params: { id: row.id } });
    console.log(row);
  }
</script>

<style>
  .q-carousel__arrow .q-icon {
    font-size: 46px;
  }
</style>
