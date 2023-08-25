<template>
  <q-card square>
    <listing-img :rowData="row" @click="handleDetail" />

    <q-card-section class="q-pa-none" style="height: 56px">
      <q-item>
        <q-item-section top>
          <q-item-label class="text-subtitle1 text-weight-regular text-black" lines="1">{{
            row.buildingName
          }}</q-item-label>
          <q-item-label caption lines="1">{{ row.address }}</q-item-label>
        </q-item-section>

        <q-item-section side top style="height: 38px">
          <q-item-label lines="1" class="text-subtitle1 text-weight-medium text-teal-9">{{
            sellPrice
          }}</q-item-label>
          <q-item-label caption lines="1" class="text-subtitle1 text-teal-9">{{
            rentPrice
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-separator />

    <q-card-actions class="q-pa-md">
      <div>{{ $t("propertyListing.format.area", { sfPrice: row.areaNet ?? 0 }) }}</div>
      <q-separator vertical inset size="2px" spaced color="grey-6" />

      <div>{{ $t("propertyListing.format.bed", { bed: row.noOfBedRooms ?? 0 }) }}</div>
      <q-separator vertical inset size="2px" spaced color="grey-6" />

      <div>{{ $t("propertyListing.format.bath", { bath: row.bathroom ?? 0 }) }}</div>

      <q-space />

      <q-btn
        outline
        color="primary"
        icon="fa-brands fa-whatsapp"
        :label="$t('propertyListing.format.contact')"
        @click="handleContact"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, type PropType } from "vue";

  // .ts files
  import { PropertyListing } from "@/interfaces/property-listing";
  import { useUtilities } from "@/composable/use-utilities";

  // Custom Components
  import ListingImg from "./listing-img.vue";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const emits = defineEmits(["on-contact", "on-detail"]);
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

  function handleContact() {
    emits("on-contact", props.row);
  }

  function handleDetail() {
    emits("on-detail", props.row);
  }
</script>
