<template>
  <q-img
    v-bind="$attrs"
    fit="cover"
    class="cursor-pointer"
    :placeholder-src="PLACEHOLDER_THUMBNAIL"
    :ratio="4 / 3"
    :src="imagelink"
    style="height: 100px; max-width: 110px"
    @click="handleimage"
  >
    <template #error>
      <q-img :src="PLACEHOLDER_THUMBNAIL" />
    </template>

    <template #loading>
      <div class="absolute-full flex flex-center bg-gray text-white">
        <q-inner-loading showing class="spinner-card row justify-center items-center">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </div>
    </template>
  </q-img>
</template>

<script setup lang="ts">
  //Vue Import
  import { computed, PropType } from "vue";

  // .ts files
  import { BLOB_URL } from "@/constants";
  import { PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { PropertyListing } from "@/interfaces/property-listing";

  const emits = defineEmits(["on-image"]);
  const props = defineProps({
    rowData: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const imagelink = computed(() => {
    const url = `${BLOB_URL}/${props.rowData.imagePath}`;
    return url || PLACEHOLDER_THUMBNAIL;
  });

  function handleimage(props: any) {
    emits("on-image", props);
  }
</script>
