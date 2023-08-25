<template>
  <q-card square flat class="full-width">
    <q-responsive :ratio="32 / 10">
      <q-carousel
        v-if="!fullscreen"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        ref="carousel"
        class="bg-thumbnail"
      >
        <q-carousel-slide
          v-for="(imageGroup, index) in imageGroups"
          :name="index + 1"
          class="column q-pa-none"
          :key="index"
        >
          <div class="row fit justify-start items-center q-gutter-none no-wrap">
            <q-img class="col-6 full-height img-fill" :src="getImageUrl(imageGroup[0].imagePath)" />

            <q-img
              v-if="imageGroup[1]"
              class="col-6 full-height img-fill"
              :src="getImageUrl(imageGroup[1].imagePath)"
            />
          </div>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            v-if="slide > 1"
            position="left"
            :offset="[20, 0]"
            class="q-gutter-xs flex flex-center items-center"
          >
            <q-btn
              class="semi-transparent"
              icon="arrow_left"
              push
              round
              dense
              @click="carousel.previous()"
            />
          </q-carousel-control>

          <q-carousel-control
            v-if="slide < imageGroups.length"
            position="right"
            :offset="[20, 0]"
            class="q-gutter-xs flex flex-center items-center"
          >
            <q-btn
              class="semi-transparent"
              icon="arrow_right"
              push
              round
              dense
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

      <q-carousel
        v-if="fullscreen"
        animated
        v-model:fullscreen="fullscreen"
        v-model="slide"
        ref="carousel"
      >
        <q-carousel-slide
          v-for="(row, index) in galleryImages"
          :name="index"
          class="column q-pa-none"
          :key="index"
        >
          <q-img class="col-12 full-height img-fill" :src="getImageUrl(row.imagePath)" />
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            v-if="slide > 1"
            position="left"
            :offset="[20, 0]"
            class="q-gutter-xs flex flex-center items-center"
          >
            <q-btn
              class="semi-transparent"
              icon="arrow_left"
              push
              round
              dense
              @click="carousel.previous()"
            />
          </q-carousel-control>

          <q-carousel-control
            v-if="slide < imageGroups.length"
            position="right"
            :offset="[20, 0]"
            class="q-gutter-xs flex flex-center items-center"
          >
            <q-btn
              class="semi-transparent"
              icon="arrow_right"
              push
              round
              dense
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
    </q-responsive>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, ref, PropType } from "vue";

  // .ts file
  import { BLOB_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  const props = defineProps({
    galleryImages: {
      type: Object as PropType<PropertyListingImage[]>,
      required: true
    }
  });

  const slide = ref(1);
  const fullscreen = ref(false);

  const carousel = ref<any>(null);

  const imageGroups = computed(() => {
    const groups = [];
    for (let i = 0; i < props.galleryImages.length; i += 2) {
      groups.push(props.galleryImages.slice(i, i + 2));
    }
    return groups;
  });

  function getImageUrl(imagePath: any) {
    const url = `${BLOB_URL}/${imagePath}`;
    return url || PLACEHOLDER_THUMBNAIL;
  }
</script>

<style scoped>
  .bg-thumbnail {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==");
    background-size: cover;
    background-position: center center;
  }

  .semi-transparent {
    background-color: rgba(255, 165, 0, 0.6) !important;
  }
</style>
