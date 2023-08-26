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
      >
        <q-carousel-slide
          v-for="row in data"
          :key="row.id"
          :name="row"
          class="q-pa-none"
          :img-src="row.img !== null && row.img !== '' ? `${row.img}` : `@/assets/img/home-bg.webp`"
          @click="showPropertyDetails(row)"
        >
          <q-item class="absolute-full text-subtitle2 flex flex-center justify-center items-center">
            <q-item-section class="items-center">
              <q-item-label class="text-overline text-white">{{ row.tagline }}</q-item-label>
              <q-item-label class="text-h3 text-orange">{{ row.description }}</q-item-label>
              <q-item-label class="q-mt-none"
                ><q-btn
                  flat
                  square
                  class="text-green-1 bg-orange q-mb-lg q-mt-md"
                  @click="$router.push('/services')"
                  label="Learn More"
              /></q-item-label>
            </q-item-section>
          </q-item>
        </q-carousel-slide>
      </q-carousel>
    </q-responsive>
  </div>
  <div v-else>
    <q-img src="@/assets/img/home-bg.webp" :ratio="3 / 1" style="height: 380px" />
  </div>
  <recycling-process />
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
  import RecyclingProcess from "./recycling-process.vue";
  // 3rd Party Import
  import { useQuasar } from "quasar";

  const data = ref([
    {
      id: 1,
      img: WelcomeImage,
      tagline: "WELCOME TO",
      description: "Sungain Recycling Metals"
    },
    {
      id: 2,
      img: MetalsPurchased,
      tagline: "Material We Accept",
      description: "FERROUS METALS, NON-FERROUS Metals"
    },
    {
      id: 3,
      img: FloorTiles,
      tagline: "FERROUS METALS",
      description: "Sheet Iron, Bushling, Heavy, Cast, Turnings, Motors, Auto Cast, Dies and Rotors"
    },
    {
      id: 4,
      img: CollectionService,
      tagline: "NON-FERROUS METALS",
      description: "RED METALS, ALUMINUM, STAINLESS STEEL AND LEAD"
    },
    {
      id: 5,
      img: VehicleRecycling,
      tagline: "Welcome to",
      description: "Sungain Recycling Metals"
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
