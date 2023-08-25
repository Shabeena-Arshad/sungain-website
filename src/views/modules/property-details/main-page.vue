<template>
  <template v-if="listingDetails != null">
    <q-page>
      <q-toolbar class="q-pa-md shadow-1 bg-white row justify-between">
        <q-btn flat unelevated class="q-pa-none no-hover" :ripple="false" @click="navigateHome">
          <q-img :src="logo" width="196px" fit="contain" />
        </q-btn>

        <q-toolbar-title v-if="$q.screen.gt.sm" class="text-h5 text-center">
          {{ $t("propertyListing.title") }}
        </q-toolbar-title>

        <language-select class="q-mr-md" />
      </q-toolbar>

      <q-bar
        v-if="$q.screen.lt.md"
        class="bg-grey text-white justify-center q-mb-sm"
        style="width: 100%"
      >
        <div class="text-h5">
          {{ $t("propertyListing.title") }}
        </div>
      </q-bar>

      <q-card square flat class="bg-grey-3">
        <q-card-section class="q-pa-none">
          <image-gallery :galleryImages="galleryImages" />
        </q-card-section>

        <q-card-section v-if="$q.screen.gt.sm" horizontal class="justify-center">
          <q-card-section class="col-lg-6 col-md-6">
            <basic-info :rowData="listingDetails" />
            <expansion-items
              :row-data="listingDetails"
              :amenities="amenityList"
              :galleryImages="galleryImages"
            />
          </q-card-section>

          <q-card-section class="q-px-none col-lg-3 col-md-4">
            <contact-info :propertyListingId="propertyListingId" />
            <other-info :row-data="listingDetails" />
          </q-card-section>
        </q-card-section>

        <q-card-section v-else-if="$q.screen.sm" class="q-pa-xl">
          <q-card-section class="q-px-xl q-pb-none">
            <basic-info :rowData="listingDetails" />
            <expansion-items
              :row-data="listingDetails"
              :amenities="amenityList"
              :galleryImages="galleryImages"
            />
          </q-card-section>

          <q-card-section class="q-px-xl q-pt-lg">
            <contact-info :propertyListingId="propertyListingId" />
            <other-info :row-data="listingDetails" />
          </q-card-section>
        </q-card-section>

        <q-card-section v-else class="q-pa-none">
          <q-card-section>
            <basic-info :rowData="listingDetails" />
            <expansion-items
              :row-data="listingDetails"
              :amenities="amenityList"
              :galleryImages="galleryImages"
            />
          </q-card-section>

          <q-card-section>
            <contact-info :propertyListingId="propertyListingId" />
            <other-info :row-data="listingDetails" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-page>
  </template>

  <template v-if="error">
    <error-404 :error="error" />
  </template>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";
  import { useRouter, useRoute } from "vue-router";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";

  // .ts file
  import { Amenity } from "@/interfaces/amenity";
  import { AMENITY_URL } from "@/constants";
  import { PropertyListing } from "@/interfaces/property-listing";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  // Custom Components
  import BasicInfo from "./section/basic-info.vue";
  import ContactInfo from "./section/contact-info.vue";
  import Error404 from "../errors/error-404.vue";
  import ExpansionItems from "./section/expansion-items.vue";
  import ImageGallery from "./section/image-gallery.vue";
  import LanguageSelect from "@/components/custom/language-select.vue";
  import OtherInfo from "./section/other-info.vue";

  const router = useRouter();
  const listingDetails = ref<PropertyListing>();

  const galleryImages = ref<PropertyListingImage[]>([]);
  const error = ref<string | null>(null);
  const amenityList = ref<Amenity[]>([]);

  const logo = ref("/img/icons/logo.png");
  const route = useRoute();
  const propertyListingId = Number(route.params.id);

  const navigateHome = () => {
    router.push("/");
  };

  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get<PropertyListing>(`/PropertyListing/PropertyListingDetail/${propertyListingId}`),
      axios.get<PropertyListingImage[]>(`/propertyListingImage/GalleryImages/${propertyListingId}`),
      axios.get<Amenity[]>(AMENITY_URL)
    ]);

    listingDetails.value = response1.data;
    galleryImages.value = response2.data;
    amenityList.value = response3.data;
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
