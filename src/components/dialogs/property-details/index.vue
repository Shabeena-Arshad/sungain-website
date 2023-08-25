<template>
  <q-dialog
    ref="dialogRef"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="isDialogVisible"
    @hide="onDialogHide"
    @update:model-value="updateDialogState"
  >
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="bg-white">
          <app-dialog-close-bar />

          <q-card flat>
            <q-card-section horizontal class="q-pa-lg justify-center">
              <q-card-section class="q-pa-sm col-6">
                <image-gallery :row="row" :galleryImages="galleryImages" />
                <listing-info :row="row" />
              </q-card-section>

              <q-card-section class="q-pa-sm col-2 column">
                <contact-info :row="row" />

                <other-info :row="row" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
  // Vue Import
  import { PropType, ref, onMounted } from "vue";

  // 3rd Party
  import axios from "axios";
  import { useDialogPluginComponent } from "quasar";

  // .ts file
  import eventBus from "@/utils/event-bus";
  import { PropertyListing } from "@/interfaces/property-listing";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  // Custom Components
  import AppDialogCloseBar from "@/components/dialogs/app-dialog-close-bar.vue";
  import ContactInfo from "./contact-info.vue";
  import ImageGallery from "./image-gallery.vue";
  import ListingInfo from "./listing-info.vue";
  import OtherInfo from "./other-info.vue";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide } = useDialogPluginComponent();
  const isDialogVisible = ref();
  const slide = ref();
  const galleryImages = ref<PropertyListingImage[]>([]);

  onMounted(() => {
    loadData();
    eventBus.on("CloseDialog", () => {
      isDialogVisible.value = false;
    });
  });

  // Method to show the selected image when an image is clicked
  const updateDialogState = (status: any) => {
    isDialogVisible.value = status;
    eventBus.emit("DialogStatus", status);
  };

  function loadData() {
    const propertyListingId = props.row.propertyListingId;
    const url = `/propertyListingImage/GalleryImages/${propertyListingId}`;

    axios.get(url).then(response => {
      galleryImages.value = response.data as Array<PropertyListingImage>;
      slide.value = galleryImages.value[0].imageId ?? 0;
    });
  }
</script>
