<!-- eslint-disable vue/no-v-html -->
<template>
  <q-card-section class="q-pa-none bg-transparent">
    <q-img :src="image" fit="cover" :ratio="3 / 1" />
  </q-card-section>

  <q-card-section class="q-ma-xl q-pa-none">
    <div class="text-h4 text-primary q-mb-md text-center" style="text-decoration: underline">
      {{ $t("aboutUs.title") }}
    </div>
    <q-card-section
      ><div v-html="translate(contentData, meta, 'contentData')"></div
    ></q-card-section>
  </q-card-section>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";

  // .ts file
  import { ABOUT_INTRO_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { Content } from "@/interfaces/content";
  import { useUtilities } from "@/composable/use-utilities";

  const { translate } = useUtilities();

  const image = ref<string>();
  const data = ref<Content | null>(null);
  const error = ref<string | null>(null);

  const contentData = ref("");
  const meta = ref({});

  try {
    const response = await axios.get(ABOUT_INTRO_URL);

    contentData.value = response.data.contentData;
    meta.value = response.data.meta as any;

    data.value = response.data;
    if (data.value !== null && data.value.meta?.image) {
      image.value = data.value.meta?.image as string;
    } else {
      image.value = PLACEHOLDER_THUMBNAIL;
    }
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
