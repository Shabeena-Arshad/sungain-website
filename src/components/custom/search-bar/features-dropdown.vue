<template>
  <q-btn-dropdown stretch flat :label="$t('searchBar.features.label')">
    <q-list style="width: 460px">
      <q-item>
        <q-item-section>
          <div class="row items-center">
            <app-item-title :title="$t('searchBar.features.title')" />
            <q-avatar>
              <q-badge rounded color="red" :label="features.length" v-show="features.length > 0" />
            </q-avatar>
          </div>
        </q-item-section>
        <q-item-section side>
          <app-button-clear @click="resetOptions" v-show="features.length > 0" />
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item style="margin-bottom: -1.25rem">
        <q-toggle
          v-model="isExactMatch"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          class="text-caption"
          :label="$t('searchBar.features.matchAll')"
          @update:model-value="onUpdateModel"
        />
      </q-item>
      <q-item>
        <q-item-section>
          <q-option-group
            v-model="selectedFeatures1"
            :options="list1"
            class="q-ma-md"
            color="green"
            type="checkbox"
            @update:model-value="onUpdateModel"
          >
            <template #label="opt">
              <div class="row items-center">
                <span>{{ translate(opt.label, opt.meta) }}</span>
              </div>
            </template>
          </q-option-group>
        </q-item-section>

        <q-item-section top>
          <q-option-group
            v-model="selectedFeatures2"
            :options="list2"
            class="q-ma-md"
            color="green"
            type="checkbox"
            @update:model-value="onUpdateModel"
          >
            <template #label="opt">
              <div class="row items-center">
                <span>{{ translate(opt.label, opt.meta) }}</span>
              </div>
            </template>
          </q-option-group>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
  import { ref, inject } from "vue";
  import { SearchBarOptions } from "@/interfaces/search-bar-options";
  import { translate } from "@/composable/use-search-bar-options";
  import AppItemTitle from "@/components/widgets/app-item-title.vue";
  import AppButtonClear from "@/components/widgets/app-button-clear.vue";

  const searchOptions = inject<SearchBarOptions>("searchOptions");
  const [option, option1] = splitDisctrict(searchOptions?.features);
  const list1 = option;
  const list2 = option1;

  const features = ref([]);
  const selectedFeatures1 = ref([]);
  const selectedFeatures2 = ref([]);

  const isExactMatch = ref(false);

  const emit = defineEmits(["change"]);

  function onUpdateModel() {
    const mergedFeatures = [...selectedFeatures1.value, ...selectedFeatures2.value];
    features.value = mergedFeatures;
    emit("change", { ids: mergedFeatures, matchAll: isExactMatch.value });
  }

  function resetOptions() {
    features.value = [];
    selectedFeatures1.value = [];
    selectedFeatures2.value = [];
    isExactMatch.value = false;
    emit("change", { ids: features, matchAll: isExactMatch.value });
  }

  function splitDisctrict(districts: any) {
    const half = Math.ceil(districts.length / 2);
    const firstHalf = districts.slice(0, half);
    const secondHalf = districts.slice(half);

    return [firstHalf, secondHalf].map(half =>
      half.map((district: any) => ({
        value: district.value,
        label: district.label,
        meta: {
          hk: district.meta?.i18n?.hk,
          cn: district.meta?.i18n?.cn
        }
      }))
    );
  }
</script>
