<template>
  <q-carousel
    ref="carousel"
    v-model:fullscreen="fullscreen"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    class="z-max"
  >
    <q-carousel-slide
      v-for="(image, index) in galleryImages"
      :key="index"
      :name="index"
      :img-src="getImageUrl(image.imagePath)"
    />
    <template v-slot:control>
      <q-carousel-control
        v-if="slide > 0"
        position="left"
        :offset="[20, 0]"
        class="q-gutter-xs flex flex-center items-center"
      >
        <q-btn
          v-if="slide > 0"
          push
          round
          dense
          color="orange-5"
          text-color="white"
          icon="arrow_left"
          @click="carousel.previous()"
        />
      </q-carousel-control>

      <q-carousel-control
        position="right"
        :offset="[20, 0]"
        class="q-gutter-xs flex flex-center items-center"
      >
        <q-btn
          v-if="slide < galleryImages.length - 1"
          push
          round
          dense
          color="orange-5"
          text-color="white"
          icon="arrow_right"
          @click="carousel.next()"
        />
      </q-carousel-control>
      <q-carousel-control position="bottom-right" :offset="[18, 18]">
        <q-btn
          push
          round
          dense
          color="white"
          text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref, PropType } from "vue";

  // .ts files
  import { BLOB_URL } from "@/constants";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  defineProps({
    galleryImages: {
      type: Array as PropType<PropertyListingImage[]>,
      required: true
    }
  });

  const carousel = ref<any>(null);
  const fullscreen = ref(false);
  const slide = ref(0);

  function getImageUrl(image: string) {
    return `${BLOB_URL}/${image}`;
  }
</script>
