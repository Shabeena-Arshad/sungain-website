<template>
  <q-card flat>
    <q-card-section>
      <q-item>
        <q-item-section top>
          <q-item-label class="text-h5 text-weight-medium text-black" lines="1">
            {{ props.rowData.buildingName }}
          </q-item-label>
          <q-item-label>
            {{ props.rowData.buildingAddress }}
          </q-item-label>

          <div class="flex justify-start items-center">
            <q-item-label lines="1" class="text-h6 text-weight-bold text-primary">
              {{ price1 }}
            </q-item-label>
            <q-item-label lines="1" class="text-h7 text-weight-bold text-grey">
              {{ sfAskingPrice }}
            </q-item-label>
          </div>
          <!-- <q-item-label top lines="1" class="text-h6 text-weight-bold text-primary">
            {{ price1 }}
          </q-item-label> -->
          <div class="flex justify-start items-center">
            <q-item-label lines="1" class="text-h6 text-weight-bold text-primary">
              {{ price2 }}
            </q-item-label>
            <q-item-label lines="1" class="text-h7 text-weight-bold text-grey">
              {{ sfRentPrice }}
            </q-item-label>
          </div>
          <q-card-actions class="q-pt-lg q-px-none">
            <div>{{ $t("propertyListing.format.area", { sfPrice: rowData.areaNet ?? 0 }) }}</div>
            <q-separator vertical size="2px" spaced color="grey-8" />

            <div>{{ $t("propertyListing.format.bed", { bed: rowData.noOfBedRooms ?? 0 }) }}</div>
            <q-separator vertical size="2px" spaced color="grey-8" />

            <div>{{ $t("propertyListing.format.bath", { bath: rowData.bathroom ?? 0 }) }}</div>
          </q-card-actions>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-weight-medium text-primary">
            {{ $t("propertyListing.format.referenceNo", { ref: rowData.referenceNo }) }}
          </q-item-label>
          <q-item-label class="text-weight-medium text-primary">
            {{
              $t("propertyListing.format.advertisementDate", {
                date: formatDate(rowData.modifiedAt)
              })
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, PropType } from "vue";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";
  import { useUtilities } from "@/composable/use-utilities";

  const { formatDate, formatPrice } = useUtilities();

  const props = defineProps({
    rowData: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const price1 = computed(() => {
    if ((props.rowData.listingMode & 1) === 1) {
      // Sell mode is selected
      const price = formatPrice(props.rowData.askingPrice);
      return `Ask ${price} `;
    }
    return null; // Sell mode is not selected
  });

  const price2 = computed(() => {
    if ((props.rowData.listingMode & 2) === 2) {
      // Rent mode is selected
      const price = formatPrice(props.rowData.rentalPrice);
      return `Rent ${price}`;
    }
    return null;
  });

  const sfAskingPrice = computed(() => {
    if ((props.rowData.listingMode & 1) === 1) {
      let sfPriceText = "";

      if (
        props.rowData.askingPrice !== null &&
        props.rowData.areaNet !== null &&
        props.rowData.areaNet !== 0
      ) {
        const sfPrice = props.rowData.askingPrice / props.rowData.areaNet;
        sfPriceText = `( SFP ${formatPrice(sfPrice)})`;
      }

      return sfPriceText;
    }
    return null;
  });

  const sfRentPrice = computed(() => {
    if ((props.rowData.listingMode & 2) === 2) {
      let sfPriceText = "";

      if (
        props.rowData.rentalPrice !== null &&
        props.rowData.areaNet !== null &&
        props.rowData.areaNet !== 0
      ) {
        const sfPrice = props.rowData.rentalPrice / props.rowData.areaNet;
        sfPriceText = `( SFP ${formatPrice(sfPrice)})`;
      }

      return sfPriceText;
    }
    return null;
  });
</script>
