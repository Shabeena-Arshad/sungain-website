<template>
  <q-card-section class="q-pa-none">
    <q-list>
      <q-toolbar class="bg-primary text-white">
        <div>{{ $t("propertyListing.format.ref", { ref: row.referenceNo }) }}</div>
        <q-space />
        <div>
          {{
            $t("propertyListing.format.updatedDate", {
              updatedDate: dateFormatter(row.advertisementDate)
            })
          }}
        </div>
      </q-toolbar>

      <q-separator />

      <q-item>
        <q-item-section top>
          <q-item-label class="text-h6 text-weight-light text-black" lines="1">{{
            props.row.buildingName
          }}</q-item-label>
          <q-item-label caption lines="1">{{ props.row.address }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label lines="1" class="text-subtitle1 text-weight-medium text-teal-9">{{
            sellPrice
          }}</q-item-label>
          <q-item-label lines="1" class="text-subtitle1 text-teal-9">{{ rentPrice }}</q-item-label>
          <q-item-label class="text-weight-medium" lines="1">{{ squareFeetAreaSale }}</q-item-label>
          <q-item-label class="text-weight-medium" lines="1">{{ squareFeetAreaRent }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>

  <q-card-actions class="q-pa-md">
    <div>{{ $t("propertyListing.format.area", { sfPrice: row.areaNet ?? 0 }) }}</div>
    <q-separator vertical spaced="6px" color="grey-6" />

    <div>{{ $t("propertyListing.format.fullBed", { bed: row.noOfBedRooms ?? 0 }) }}</div>
    <q-separator vertical spaced="6px" color="grey-6" />

    <div>{{ $t("propertyListing.format.fullBath", { bath: row.bathroom ?? 0 }) }}</div>
  </q-card-actions>

  <q-separator />

  <q-card-section class="q-pa-sm">
    <q-list>
      <q-item class="q-px-none q-py-md">
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.description") }}</q-item-label>
          <q-item-label caption lines="2">{{ props.row.description }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-body2 text-dark">{{
            $t("propertyListing.columns.remarks")
          }}</q-item-label>
          <q-item-label caption lines="2">{{ props.row.view }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, PropType } from "vue";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";
  import { useUtilities } from "@/composable/use-utilities";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const { dateFormatter } = useUtilities();

  const { formatPrice } = useUtilities();

  const sellPrice = computed(() => {
    if ((props.row.listingMode & 2) == 2) {
      // Selling price
      return formatPrice(props.row.askingPrice);
    }
    return null;
  });

  const rentPrice = computed(() => {
    if ((props.row.listingMode & 1) == 1) {
      // Rental price
      return formatPrice(props.row.rentalPrice);
    }
    return null;
  });

  const squareFeetAreaSale = computed(() => {
    const areaNet = Number(props.row.areaNet);
    const askingPrice = Number(props.row.askingPrice);

    if (!isNaN(areaNet) && !isNaN(askingPrice) && askingPrice !== 0) {
      const perFootPrice = askingPrice / areaNet;
      return `@ ${perFootPrice.toFixed(2)} / SF (S)`;
    } else {
      return "Invalid data for calculation";
    }
  });

  const squareFeetAreaRent = computed(() => {
    const areaNet = Number(props.row.areaNet);
    const rentalPrice = Number(props.row.rentalPrice);

    if (!isNaN(areaNet) && !isNaN(rentalPrice) && rentalPrice !== 0) {
      const perFootPrice = rentalPrice / areaNet;
      return `@ ${perFootPrice.toFixed(2)} / SF (S)`;
    } else {
      return "Invalid data for calculation";
    }
  });
</script>
