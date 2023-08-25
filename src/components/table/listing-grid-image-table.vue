<template>
  <div>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="lightBoxImage"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>

  <q-table
    ref="qTableRef"
    v-bind="$attrs"
    card-container-class="q-pa-sm q-col-gutter-sm"
    binary-state-sort
    flat
    square
    grid
    :hide-pagination="true"
    :rows-per-page-options="[25, 30, 50]"
    :rows-per-page="25"
  >
    <template #item="props">
      <div v-if="$q.screen.lg" class="custom-grid-item col-lg-2 grid-style-transition">
        <q-img
          :src="getImageUrl(props.row.imagePath)"
          :ratio="4 / 3"
          @click="showImg(props.row.imagePath)"
        />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  //Vue Import
  import { ref } from "vue";

  // 3rd Party Import
  import { QTable } from "quasar";
  import VueEasyLightbox from "vue-easy-lightbox";

  // .ts file
  import { BLOB_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";

  const qTableRef = ref(null);

  defineProps({
    hidePagination: { type: Boolean, default: false }
  });

  const showImg = (imagePath: any) => {
    lightBoxImage.value = `${BLOB_URL}/${imagePath}`;
    visibleRef.value = true;
  };

  function getImageUrl(url: any) {
    if (url !== null || url !== "") {
      return `${BLOB_URL}/${url}`;
    } else {
      return PLACEHOLDER_THUMBNAIL;
    }
  }
  const lightBoxImage = ref();
  const visibleRef = ref(false);
  const indexRef = ref();
  const onHide = () => (visibleRef.value = false);
</script>

<style lang="scss">
  .custom-grid-item {
    width: 100%;

    /* Oberrid the style lg breakpoint */
    @media (min-width: $breakpoint-lg-min) {
      width: 20% !important;
    }
  }
  .grid-style-transition {
    transition:
      transform 0.28s,
      background-color 0.28s;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
</style>
