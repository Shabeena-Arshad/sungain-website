<template>
  <q-input
    debounce="400"
    v-model="filter"
    class="q-ml-md"
    style="min-width: 360px; height: 80px"
    :placeholder="$t('action.search')"
    @keyup.enter="handleFilter"
    @click:append="handleFilter"
  >
    <template v-slot:append>
      <q-icon name="search" @click="handleFilter" class="cursor-pointer" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const emit = defineEmits<{
    (event: "on-search", props: any): void;
  }>();

  const filter = ref("");

  function handleFilter() {
    emit("on-search", filter.value);
  }
</script>
