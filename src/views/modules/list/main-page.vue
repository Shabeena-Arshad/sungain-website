<template>
  <q-card flat square>
    <q-card-section class="q-pa-none bg-transparent">
      <q-img :src="image" fit="cover" :ratio="3 / 1">
        <q-item class="absolute-full text-subtitle2 flex flex-center justify-center items-center">
          <q-item-section class="items-center">
            <q-item-label class="text-h3 text-white">{{ $t("listingRequest.title") }}</q-item-label>
            <q-item-label class="q-mt-none">
              <q-btn flat square class="q-mb-lg q-mt-md q-pa-none" @click="showCreateUpdateDialog">
                <div class="text-center bg-white text-primary q-px-md q-py-sm q-pr-xl">
                  {{ $t("listingRequest.enterPropertyAddress") }}
                </div>
                <div class="text-center bg-primary q-px-md q-py-sm">
                  {{ $t("listingRequest.btn") }}
                </div>
              </q-btn>
            </q-item-label>
            <q-item-label class="text-h6 text-white q-ma-none"
              >{{ $t("listingRequest.question") }} +852 2851 1438</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-img>
    </q-card-section>
    <q-card-section class="q-ma-xl q-pa-none">
      <div class="text-h4 text-primary q-mb-md text-center" style="text-decoration: underline">
        {{ $t("listingRequest.columns.listPropertyHeading") }}
      </div>

      <q-card-section>
        <div v-html="translate(contentData, meta, 'contentData')"></div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { defineAsyncComponent, ref } from "vue";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";
  import { useQuasar } from "quasar";

  // .ts file
  import { Amenity } from "@/interfaces/amenity";
  import { Content } from "@/interfaces/content";
  import { AMENITY_URL, LISTING_INTRO_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { useUtilities } from "@/composable/use-utilities";

  const { translate } = useUtilities();

  const $q = useQuasar();
  const image = ref<string>();
  const data = ref<Content | null>(null);
  const error = ref<string | null>(null);

  const amentityData = ref<Amenity[]>([]);

  const contentData = ref("");
  const meta = ref({});

  function showCreateUpdateDialog() {
    axios
      .get<Amenity[]>(AMENITY_URL)
      .then(response => {
        amentityData.value = response.data;

        $q.dialog({
          component: defineAsyncComponent(() => import("./input-dialog/index.vue")),
          componentProps: {
            amenityData: amentityData.value
          }
        });
      })
      .catch(err => {
        console.error("Error fetching amenity data:", err);
      });
  }

  try {
    const response = await axios.get<Content>(LISTING_INTRO_URL);

    contentData.value = response.data.contentData;
    meta.value = response.data.meta as any;

    data.value = response.data;
    // uses optional chaining (?.) to test
    if (data.value.meta?.image) {
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
