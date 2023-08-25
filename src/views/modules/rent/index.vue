<template>
  <suspense>
    <main-page />
    <template #fallback>
      <div class="row justify-center items-center" style="height: 500px">
        <app-spinner size="10em" />
      </div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
  import MainPage from "./main-page.vue";
  import AppSpinner from "@/components/widgets/app-spinner.vue";
</script>
