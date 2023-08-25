<template>
  <q-card>
    <q-card-section :horizontal="$q.screen.gt.xs">
      <q-card-section class="q-pa-none col-6">
        <q-responsive :ratio="$q.screen.sm ? 4 / 3 : 16 / 10">
          <listing-carousel :gallery-images="galleryImages" />
        </q-responsive>
      </q-card-section>

      <q-card-section class="q-pa-none col-6">
        <listing-info :row="rowData" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref, PropType } from "vue";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";

  // .ts files
  import { PropertyListing } from "@/interfaces/property-listing";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  // Custom Components
  import listingCarousel from "./listing-carousel.vue";
  import ListingInfo from "./lisitng-info.vue";

  const props = defineProps({
    rowData: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const error = ref<string | null>(null);
  const galleryImages = ref<PropertyListingImage[]>([]);

  try {
    const response = await axios.get<PropertyListingImage[]>(
      `/propertyListingImage/GalleryImages/${props.rowData.propertyListingId}`
    );
    galleryImages.value = response.data;
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

<style lang="scss" scoped>
  .bg-thumbnail {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==");
    background-size: cover;
    background-position: center center;
  }

  .semi-transparent {
    background-color: rgba(255, 165, 0, 0.6) !important;
  }
</style>
