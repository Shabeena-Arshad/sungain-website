<template>
  <q-card bordered flat square>
    <q-carousel v-model="slide" animated class="bg-thumbnail">
      <q-carousel-slide
        v-for="(image, index) in galleryImages"
        :key="index"
        :name="image.imageId"
        :img-src="getImageUrl(image.imagePath)"
      >
      </q-carousel-slide>
    </q-carousel>
  </q-card>

  <q-card flat square v-if="galleryImages != null">
    <q-card-section horizontal class="q-py-sm">
      <q-card-actions class="bg-grey-3">
        <q-btn flat icon="chevron_left" @click="scrollLeft" color="primary"
      /></q-card-actions>

      <q-virtual-scroll
        ref="virtualScroll"
        class="justify-center full-width"
        :items="galleryImages"
        :virtual-scroll-item-size="360"
        virtual-scroll-horizontal
        @virtual-scroll="onVirtualScroll"
      >
        <template v-slot="{ item: row }">
          <div class="q-pa-xs" style="width: 110px">
            <property-dialog-img :rowData="row" @on-image="showImage(row)" />
          </div>
        </template>
      </q-virtual-scroll>
      <q-card-actions class="bg-grey-3">
        <q-btn flat icon="chevron_right" @click="scrollRight" color="primary" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref, PropType } from "vue";

  // .ts file
  import { BLOB_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { PropertyListing } from "@/interfaces/property-listing";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  // Custom Components
  import PropertyDialogImg from "@/components/dialogs/property-dialog-images.vue";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    },
    galleryImages: {
      type: Object as PropType<PropertyListingImage[]>,
      required: true
    }
  });

  function getImageUrl(imagePath: any) {
    const url = `${BLOB_URL}/${imagePath}`;
    return url || PLACEHOLDER_THUMBNAIL;
  }
  const slide = ref(0);
  const selectedImage = ref<string | null>(null);

  const virtualScroll = ref(null);
  const virtualScrollIndex = ref(0);

  function showImage(row: any) {
    slide.value = row.imageId;
  }

  function onVirtualScroll(detail: any) {
    virtualScrollIndex.value = detail.index;
  }

  function scrollLeft() {
    if (virtualScroll.value && virtualScrollIndex.value > 0) {
      virtualScrollIndex.value -= 1;
      (virtualScroll.value as any).scrollTo(virtualScrollIndex.value, "end-force");
      showPreviousImage();
      slide.value = virtualScrollIndex.value;
    }
  }

  function scrollRight() {
    if (virtualScroll.value && virtualScrollIndex.value < props.galleryImages.length - 1) {
      virtualScrollIndex.value += 1;
      (virtualScroll.value as any).scrollTo(virtualScrollIndex.value, "start-force");
      showNextImage();
      slide.value = virtualScrollIndex.value;
    }
  }

  function showPreviousImage() {
    if (!props.galleryImages) return;
    const currentIndex = props.galleryImages.findIndex(
      image => image.imagePath === selectedImage.value
    );
    if (currentIndex > 0) {
      selectedImage.value = props.galleryImages[currentIndex - 1].imagePath;
    }
  }

  // Method to show the next image
  function showNextImage() {
    if (!props.galleryImages) return;
    const currentIndex = props.galleryImages.findIndex(
      image => image.imagePath === selectedImage.value
    );
    if (currentIndex < props.galleryImages.length - 1) {
      selectedImage.value = props.galleryImages[currentIndex + 1].imagePath;
    }
  }
</script>

<style scoped>
  .bg-thumbnail {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==");
    background-size: cover;
    background-position: center center;
  }
</style>
