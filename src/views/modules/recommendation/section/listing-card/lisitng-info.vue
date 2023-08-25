<template>
  <q-card-section :class="$q.screen.xs ? 'q-px-none' : 'q-px-md q-py-sm'">
    <q-item>
      <q-item-section top>
        <q-item-label class="text-subtitle1 text-weight-regular text-black" lines="1">{{
          row.title
        }}</q-item-label>
        <q-item-label caption lines="1">{{ row.buildingAddress }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label
          lines="1"
          v-show="sellPrice != '0'"
          class="text-subtitle1 text-weight-medium text-teal-9"
        >
          {{ sellPrice }}
        </q-item-label>
        <q-item-label
          lines="1"
          v-show="rentPrice != '0'"
          class="text-subtitle1 text-weight-medium text-teal-9"
        >
          {{ rentPrice }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card-section>

  <q-separator />

  <q-card-section :class="$q.screen.xs ? 'q-pa-none' : 'q-py-md'">
    <q-item class>
      <q-item-section>
        <q-item-label class="text-subtitle1 text-dark text-weight-medium">
          {{ $t("propertyListing.columns.remarks") }}
        </q-item-label>
        <q-item-label class="text-grey-8" lines="5" style="min-height: 50px">
          {{ row.view }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card-section>

  <q-card-section :class="$q.screen.xs ? 'q-pa-none' : ''" class="absolute-bottom">
    <q-item>
      <div>
        {{ $t("propertyListing.format.area", { sfPrice: row.areaNet ?? 0 }) }}
      </div>
      <q-separator vertical size="2px" spaced color="grey-8" />

      <div>{{ $t("propertyListing.format.bed", { bed: row.noOfBedRooms ?? 0 }) }}</div>
      <q-separator vertical size="2px" spaced color="grey-8" />

      <div>{{ $t("propertyListing.format.bath", { bath: row.bathroom ?? 0 }) }}</div>
    </q-item>
  </q-card-section>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, PropType } from "vue";

  // .ts files
  import { PropertyListing } from "@/interfaces/property-listing";
  import { useUtilities } from "@/composable/use-utilities";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const { formatPrice } = useUtilities();

  const sellPrice = computed(() => {
    if ((props.row.listingMode & 1) == 1) {
      // Selling price
      return formatPrice(props.row.askingPrice);
    }
    return null;
  });

  const rentPrice = computed(() => {
    if ((props.row.listingMode & 2) == 2) {
      // Rental price
      return formatPrice(props.row.rentalPrice);
    }
    return null;
  });
</script>
