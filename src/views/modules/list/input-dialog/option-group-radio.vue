<template>
  <q-item class="q-px-md bg-green-1 q-mt-sm" style="border-radius: 10px">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        <q-option-group
          v-bind="$attrs"
          :modelValue="modelValue"
          :options="options"
          color="primary"
          dense
          inline
          @update:modelValue="updateModelValue"
        />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { PropType } from "vue";
  import { QOptionGroupProps } from "quasar";

  defineProps({
    modelValue: {
      type: [String, Number, null] as PropType<string | number | null>,
      default: () => null
    },
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<QOptionGroupProps["options"]>,
      required: true
    }
  });

  const emit = defineEmits(["update:modelValue"]);

  const updateModelValue = (value: any) => {
    emit("update:modelValue", value);
  };
</script>
