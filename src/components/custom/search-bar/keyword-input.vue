<template>
  <q-input
    v-model="searchKey"
    style="width: 360px"
    borderless
    clearable
    debounce="600"
    dense
    :placeholder="$t('searchBar.search.keyword')"
    @clear="clearSearch"
    @update:modelValue="handleSearchKeyChange"
  >
    <template #after>
      <q-icon class="q-ml-sm" name="search" color="gray" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";

  const props = defineProps({
    keyword: {
      type: String,
      default: ""
    }
  });

  const emit = defineEmits(["change"]);

  const searchKey = ref(props.keyword);

  watch(
    () => props.keyword,
    newKeyword => {
      searchKey.value = newKeyword;
    }
  );

  function handleSearchKeyChange(val: any) {
    searchKey.value = val;
    emit("change", val);
  }

  function clearSearch() {
    searchKey.value = "";
  }
</script>
