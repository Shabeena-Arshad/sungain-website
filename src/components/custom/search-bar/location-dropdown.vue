<template>
  <q-btn-dropdown stretch flat :label="$t('searchBar.location.label')">
    <q-list style="width: 684px">
      <q-item>
        <q-item-section>
          <div class="row items-center">
            <app-item-title :title="$t('searchBar.location.title')" />
            <q-avatar>
              <q-badge
                rounded
                color="red"
                :label="selectedDistricts.length"
                v-show="selectedDistricts.length > 0"
              />
            </q-avatar>
          </div>
        </q-item-section>
        <q-item-section side>
          <app-button-clear @click="resetOptions" v-show="selectedDistricts.length > 0" />
        </q-item-section>
      </q-item>
      <q-separator />

      <q-expansion-item
        v-for="territory in territoriesList"
        :key="territory.value"
        :default-opened="territory.expanded"
        expand-separator
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar>
              <q-badge rounded color="red" :label="districtCount(territory)" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ translate(territory.label, territory.meta) }}</q-item-label>
          </q-item-section>
        </template>

        <q-card>
          <q-item>
            <q-item-section>
              <q-option-group
                v-model="territory.district"
                :options="territory.option"
                color="green"
                type="checkbox"
                @update:model-value="locationChange"
              >
                <template #label="opt">
                  <div class="row items-center">
                    <span>{{ translate(opt.label, opt.meta) }}</span>
                  </div>
                </template>
              </q-option-group></q-item-section
            >
            <q-item-section top
              ><q-option-group
                v-model="territory.district"
                :options="territory.option1"
                color="green"
                type="checkbox"
                @update:model-value="locationChange"
              >
                <template #label="opt">
                  <div class="row items-center">
                    <span>{{ translate(opt.label, opt.meta) }}</span>
                  </div>
                </template>
              </q-option-group>
            </q-item-section>
          </q-item>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref, inject } from "vue";

  // .ts file
  import { SearchBarOptions } from "@/interfaces/search-bar-options";
  import { translate } from "@/composable/use-search-bar-options";

  // Custom Components
  import AppButtonClear from "@/components/widgets/app-button-clear.vue";
  import AppItemTitle from "@/components/widgets/app-item-title.vue";

  const emit = defineEmits(["selectedlocation"]);

  const searchBarOptionData = inject<SearchBarOptions>("searchOptions");
  const territoriesList = ref(searchBarOptionData?.territories);

  const selectedDistricts = ref<any[]>([]);

  function locationChange() {
    selectedDistricts.value = territoriesList.value?.flatMap(
      (territory: any) => territory.district
    );
    emit("selectedlocation", selectedDistricts.value);
  }

  const districtCount = (territory: any) => {
    return selectedDistricts.value.filter(district => territory.district.includes(district)).length;
  };

  function resetOptions() {
    selectedDistricts.value = []; // Clear the selected districts
    territoriesList.value?.forEach((territory: any) => {
      territory.district = []; // Clear the selected districts for each territory
    });
    emit("selectedlocation", selectedDistricts.value);
  }
</script>
