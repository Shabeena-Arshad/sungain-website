<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ $t("propertyListing.columns.buildingAge") }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>17 Years</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />

  <!-- <q-item>
    <q-item-section >
      <q-item-label>{{ $t("propertyListing.columns.areaGross") }}</q-item-label>
    </q-item-section>

    <q-item-section >
      <q-item-label caption>{{ props.row.areaGross }}</q-item-label>
    </q-item-section>
  </q-item> -->

  <q-separator />

  <q-item>
    <q-item-section>
      <q-item-label>{{ $t("propertyListing.columns.elevation") }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ props.row.elevation }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />

  <q-item>
    <q-item-section>
      <q-item-label>{{ $t("propertyListing.columns.propertyLayout") }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ props.row.propertyLayout }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />

  <q-item>
    <q-item-section>
      <q-item-label>{{ $t("propertyListing.columns.maidRoom") }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ props.row.maidRoom }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-item>
    <q-item-section>
      <q-item-label>{{ $t("propertyListing.columns.outdoorAreas") }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ props.row.outdoorAreas }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-list class="q-mt-md">
    <q-item-label>Other:</q-item-label>

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
</template>

<script setup lang="ts">
  // Vue Import
  import { PropType, computed, ref } from "vue";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const group = ref(["op1"]);

  const options = [
    {
      label: "Furnished",
      value: "op1"
    },
    {
      label: "Maid Room",
      value: "op5"
    },
    {
      label: "Car Park",
      value: "op6"
    },
    {
      label: "Management Fee",
      value: "op2"
    },
    {
      label: "Government Rates",
      value: "op3"
    },
    {
      label: "Government Rent",
      value: "op4"
    }
  ];

  const activeOptions = computed(() => {
    return options.filter(option => group.value.includes(option.value));
  });

  const handleClick = (event: any) => {
    // Prevent default checkbox behavior
    event.sPropagation();
    event.preventDefault();
  };
</script>
