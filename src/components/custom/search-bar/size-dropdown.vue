<template>
  <q-btn-dropdown stretch flat :label="$t(options.title)">
    <!-- <q-btn-dropdown stretch flat :label="$t('searchBar.search.price')"> -->
    <q-list padding style="width: 480px">
      <q-item>
        <q-item-section>
          <app-item-title :title="$t('searchBar.size.title')" />
        </q-item-section>

        <q-item-section side>
          <app-button-clear @click="resetOptions" />
        </q-item-section>
      </q-item>
      <q-separator />

      <q-item>
        <q-item-section>
          <div class="text-center text-subtitle1 text-weight-bold">{{ formattedRange }}</div>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar top>
          <q-icon :name="options.icon" />
        </q-item-section>

        <q-item-section class="q-pr-xl" colspan="2">
          <q-range
            v-model="secondModel"
            color="brown"
            thumb-color="primary"
            label-color="black"
            markers
            snap
            :min="0"
            :max="20"
            :step="2.5"
            :marker-labels="markerLabels"
            @update:model-value="onUpdateModel"
          >
            <template v-slot:marker-label-group="scope">
              <div
                v-for="(marker, index) in getExtendedMarkerList(scope.markerList)"
                :key="index"
                :class="['text-subtitle1', 'text-weight-medium', marker.classes]"
                :style="marker.style"
                @click="secondModel = marker.value"
              >
                {{ marker.label }}
              </div>
            </template>
          </q-range>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-none">
        <q-item-section top class="q-mx-xl">
          <div class="text-right text-subtitle2">{{ options.unit }}</div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import { SliderMarkerLabelArrayConfig } from "quasar";

  import AppButtonClear from "@/components/widgets/app-button-clear.vue";
  import AppItemTitle from "@/components/widgets/app-item-title.vue";
  import { PriceRange } from "@/interfaces/search-bar-options";

  const props = defineProps({
    options: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits(["change"]);

  function getExtendedMarkerList(markerList: SliderMarkerLabelArrayConfig[]) {
    return markerList.map((marker, index) => {
      const value = (marker as unknown as any).value;
      const label = (marker as unknown as any).label;
      const classes = (marker as unknown as any).classes;
      const style = (marker as unknown as any).style;

      return {
        index,
        label,
        value,
        classes,
        style
      };
    });
  }

  const secondModel = ref({
    min: 0,
    max: 20
  });

  const formattedRange = computed(() => {
    const unit = props.options.unit || "";
    const { min, max } = secondModel.value;
    const multiplier = props.options.multiplier || 100;
    const multipliedMin = min * multiplier;
    const multipliedMax = max * multiplier;
    const limit = 2000;

    if (multipliedMin === 0 && multipliedMax === limit) {
      return "";
    } else if (multipliedMax === limit && multipliedMin > 0) {
      return `${multipliedMin} ${unit}+`;
    } else if (multipliedMin === multipliedMax) {
      return `${multipliedMin} ${unit}`;
    } else {
      return `${multipliedMin} to ${multipliedMax} ${unit}`;
    }
  });

  const markerLabels = computed(() => {
    const labels = {
      0: "0",
      5: "500",
      10: "1000",
      15: "1500",
      20: "2000+"
    };

    return props.options.markerLabels ? props.options.markerLabels : labels;
  });

  function resetOptions() {
    secondModel.value = {
      min: 0,
      max: 20
    };
    onUpdateModel(secondModel.value);
  }
  function onUpdateModel(val: { min: number; max: number }) {
    const output = ref<PriceRange>({ min: 0, max: null });
    output.value.min = val.min * 100;
    output.value.max = val.max == 20 ? null : val.max * 100;
    emit("change", output);
  }
</script>
