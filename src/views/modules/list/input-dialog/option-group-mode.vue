<template>
  <q-option-group
    v-bind="$attrs"
    :modelValue="newModelValue"
    :options="optionPropertyMode"
    color="primary"
    type="checkbox"
    inline
    @update:modelValue="updateModelValue"
  />
</template>

<script setup lang="ts">
  // Vue Import
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";

  // .ts file
  import { useUtilities } from "@/composable/use-utilities";

  const { t } = useI18n({ useScope: "global" });
  const { isNthBitSet } = useUtilities();

  const emit = defineEmits(["update:modelValue"]);
  const props = defineProps({
    modelValue: {
      type: Number,
      default: () => null
    }
  });

  const optionPropertyMode = [
    {
      label: t("listingRequest.dialog.forRentTab"),
      value: 1
    },
    {
      label: t("listingRequest.dialog.forSaleTab"),
      value: 2
    }
  ];

  const updateModelValue = (val: any) => {
    // If no item is checked, toggle the value instead
    if (val.length === 0) {
      const toggleValue = newModelValue.value[0] === 1 ? 2 : 1;
      newModelValue.value = [toggleValue];
      emit("update:modelValue", toggleValue);
      return;
    }

    // update the UI
    newModelValue.value = val;

    // Emit value to parent
    const newVal = val.includes(1) && val.includes(2) ? 3 : val[0];
    emit("update:modelValue", newVal);
  };

  const newModelValue = ref<number[]>([]);

  onMounted(() => {
    // Set initial value of newModelValue based on props.modelValue
    newModelValue.value = [];

    if (isNthBitSet(props.modelValue, 1)) {
      newModelValue.value.push(1);
    }

    if (isNthBitSet(props.modelValue, 2)) {
      newModelValue.value.push(2);
    }

    // If neither condition is true, set newModelValue.value to [1]
    if (newModelValue.value.length === 0) {
      newModelValue.value = [1];
    }
  });
</script>
