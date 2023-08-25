<template>
  <q-list>
    <q-expansion-item
      class="bg-white q-mt-lg"
      expand-icon="fas fa-arrow-circle-up"
      default-opened
      expand-icon-toggle
      expand-separator
    >
      <template v-slot:header>
        <q-item-section class="q-px-md text-subtitle1 text-weight-medium">
          <q-item-label> {{ $t("propertyListing.expansions.description") }} </q-item-label>
        </q-item-section>
      </template>

      <q-item>
        <q-item-section class="q-px-md">
          <q-item-label lines="5"> {{ props.rowData.view }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item
      class="bg-white q-mt-lg"
      expand-icon="fas fa-arrow-circle-up"
      expand-icon-toggle
      expand-separator
    >
      <template v-slot:header>
        <q-item-section class="q-px-md text-subtitle1 text-weight-medium">
          <q-item-label> {{ $t("propertyListing.expansions.amenities") }} </q-item-label>
        </q-item-section>
      </template>

      <q-card>
        <q-card-actions>
          <q-item>
            <q-item-section>
              <checkbox-status
                :options="amenitiesGroup1"
                v-model="selectedFeatures1"
                name="amenityGroup1Ids"
                aria-readonly="true"
              />
            </q-item-section>

            <q-item-section top>
              <checkbox-status
                :options="amenitiesGroup2"
                v-model="selectedFeatures2"
                name="amenityGroup2Ids"
              />
            </q-item-section>
            <q-item-section top style="width: 250px">
              <checkbox-status
                :options="amenitiesGroup3"
                v-model="selectedFeatures3"
                name="amenityGroup3Ids"
              />
            </q-item-section>
          </q-item>
        </q-card-actions>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      class="bg-white q-mt-lg"
      expand-icon="fas fa-arrow-circle-up"
      expand-icon-toggle
      expand-separator
    >
      <template v-slot:header>
        <q-item-section class="q-px-md text-subtitle1 text-weight-medium">
          <q-item-label> {{ $t("propertyListing.expansions.floorPlan") }} </q-item-label>
        </q-item-section>
      </template>

      <q-card class="bg-grey-2">
        <q-card-section>
          <q-img :src="imagelink" :ratio="16 / 9" />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      class="bg-white q-mt-lg"
      expand-icon="fas fa-arrow-circle-up"
      expand-icon-toggle
      expand-separator
    >
      <template v-slot:header>
        <q-item-section class="q-px-md text-subtitle1 text-weight-medium">
          <q-item-label> {{ $t("propertyListing.expansions.remarks") }} </q-item-label>
        </q-item-section>
      </template>

      <q-item>
        <q-item-section class="q-px-md">
          <q-item-label lines="5"> {{ props.rowData.detail }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section> </q-card-section>
    </q-expansion-item>
  </q-list>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, onMounted, PropType, ref } from "vue";

  // .ts file
  import { Amenity } from "@/interfaces/amenity";
  import { BLOB_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { PropertyListing } from "@/interfaces/property-listing";
  import { PropertyListingImage } from "@/interfaces/property-listing-image";

  // Custom Components
  import CheckboxStatus from "@/components/custom/checkbox-status.vue";

  const props = defineProps({
    rowData: {
      type: Object as PropType<PropertyListing>,
      required: true
    },
    galleryImages: {
      type: Object as PropType<PropertyListingImage[]>,
      required: true
    },
    amenities: {
      type: Array as PropType<Amenity[]>,
      required: false
    }
  });

  const filteredAmenities: Amenity[] = props.amenities.filter(amenity =>
    props.rowData.amenityIds.includes(amenity.amenityId)
  );

  const [amenitiesGroup1, amenitiesGroup2, amenitiesGroup3] = splitFeatures(
    filteredAmenities || []
  );

  const selectedFeatures1 = ref<number[]>([]);
  const selectedFeatures2 = ref<number[]>([]);
  const selectedFeatures3 = ref<number[]>([]);

  const imagelink = computed(() => {
    const url = `${BLOB_URL}/${props.rowData.iconPath}`;
    return url || PLACEHOLDER_THUMBNAIL;
  });

  onMounted(() => {
    updateSelectedFeatures();
  });
  function updateSelectedFeatures() {
    selectedFeatures1.value = []; // Clear the array
    selectedFeatures2.value = []; // Clear the array
    selectedFeatures3.value = []; // Clear the array

    props.rowData.amenityIds.forEach((amenityId: number) => {
      if (amenitiesGroup1.some(a => a.value === amenityId)) {
        selectedFeatures1.value.push(amenityId);
      } else if (amenitiesGroup2.some(a => a.value === amenityId)) {
        selectedFeatures2.value.push(amenityId);
      } else if (amenitiesGroup3.some(a => a.value === amenityId)) {
        selectedFeatures3.value.push(amenityId);
      }
    });
  }

  function splitFeatures(
    amenity: any[]
  ): { value: any; label: string; meta: { hk?: string; cn?: string } }[][] {
    const oneThird = Math.ceil(amenity.length / 3);
    const firstThird = amenity.slice(0, oneThird);
    const secondThird = amenity.slice(oneThird, 2 * oneThird);
    const thirdThird = amenity.slice(2 * oneThird);

    return [firstThird, secondThird, thirdThird].map(section =>
      section.map((amenity: any) => ({
        value: amenity.amenityId,
        label: amenity.amenityName,
        meta: {
          hk: amenity.meta?.i18n?.hk,
          cn: amenity.meta?.i18n?.cn
        }
      }))
    );
  }
</script>
