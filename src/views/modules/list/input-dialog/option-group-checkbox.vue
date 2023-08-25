<template>
  <q-list class="bg-green-1" style="border-radius: 4px">
    <q-item dense>
      <q-item-label class="q-mt-md">{{ $t("listingRequest.dialog.features") }}</q-item-label>
    </q-item>

    <q-item>
      <q-item-section top>
        <q-option-group
          v-bind="$attrs"
          :model-value="modelValueLeft"
          :options="optionsLeft"
          color="primary"
          type="checkbox"
          dense
          @update:modelValue="updateModelValueLeft"
        >
          <template #label="opt">
            <div class="row items-center">
              <span>{{ translate(opt.label, opt.meta, "amenityName") }}</span>
            </div>
          </template>
        </q-option-group>
      </q-item-section>

      <q-item-section top>
        <q-option-group
          v-bind="$attrs"
          :model-value="modelValueRight"
          :options="optionsRight"
          color="primary"
          type="checkbox"
          dense
          @update:model-value="updateModelValueRight"
        >
          <template #label="opt">
            <div class="row items-center">
              <span>{{ translate(opt.label, opt.meta, "amenityName") }}</span>
            </div>
          </template>
        </q-option-group>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
  import { PropType, ref } from "vue";
  import { QOptionGroupProps } from "quasar";
  import { useUtilities } from "@/composable/use-utilities";

  const { splitAmenity, translate } = useUtilities();

  const emit = defineEmits(["update:modelValue"]);

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => null
    },
    options: {
      type: Array as PropType<QOptionGroupProps["options"]>
    }
  });

  const [optionsLeft, optionsRight] = splitAmenity(props.options);

  const modelValueLeft = ref(props.modelValue.filter(value => optionsLeft.includes(value)));
  const modelValueRight = ref(props.modelValue.filter(value => optionsRight.includes(value)));

  const updateModelValueLeft = (val: any) => {
    modelValueLeft.value = val;
    const newVal = [...val, ...modelValueRight.value];
    emit("update:modelValue", newVal);
  };

  const updateModelValueRight = (val: any) => {
    modelValueRight.value = val;
    const newVal = [...modelValueLeft.value, ...val];
    emit("update:modelValue", newVal);
  };
</script>
