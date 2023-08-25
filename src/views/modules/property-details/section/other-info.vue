<template>
  <q-card flat>
    <q-list class="q-mt-md">
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.buildingAge") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ buildingAge }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset color="primary" size="2px" />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.elevation") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ rowData.elevation }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset color="primary" size="2px" />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.propertyLayout") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ rowData.propertyLayout }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset color="primary" size="2px" />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.maidRoom") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ rowData.maidRoom }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset color="primary" size="2px" />

      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("propertyListing.columns.outdoorAreas") }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>0</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset color="primary" size="2px" />
    </q-list>

    <q-list class="q-pt-md">
      <q-item>
        <q-item-section>
          <q-option-group
            v-model="group"
            :options="activeOptions"
            color="green"
            type="checkbox"
            @click.capture="handleClick"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { PropType, computed, ref } from "vue";
  import { useI18n } from "vue-i18n";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";

  const props = defineProps({
    rowData: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const group = ref(["op1"]);
  const { t } = useI18n({ useScope: "global" });

  const options = [
    {
      label: t("propertyListing.amenities.furnished"),
      value: "op1"
    },
    {
      label: t("propertyListing.amenities.maidRoom"),
      value: "op5"
    },
    {
      label: t("propertyListing.amenities.carPark"),
      value: "op6"
    },
    {
      label: t("propertyListing.amenities.managementFee"),
      value: "op2"
    },
    {
      label: t("propertyListing.amenities.governmentRates"),
      value: "op3"
    },
    {
      label: t("propertyListing.amenities.governmentRent"),
      value: "op4"
    }
  ];

  const activeOptions = computed(() => {
    return options.filter(option => group.value.includes(option.value));
  });

  const buildingAge = computed(() => {
    const currentYear = new Date().getFullYear();
    const calculateAge = currentYear - props.rowData.yearOfCompletion;
    return `${calculateAge} Years`;
  });

  const handleClick = (event: any) => {
    // Prevent default checkbox behavior
    event.sPropagation();
    event.preventDefault();
  };
</script>
