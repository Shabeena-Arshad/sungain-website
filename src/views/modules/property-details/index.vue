<template>
  <suspense>
    <!-- "default" slot belongs to Suspense -->
    <template #default>
      <main-page />
    </template>

    <!-- "fallback" slot belongs to Suspense -->
    <template #fallback>
      <div class="row justify-center items-center" style="height: 500px">
        <app-spinner size="1em" />
      </div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
  // Custom Components
  import AppSpinner from "@/components/widgets/app-spinner.vue";
  import MainPage from "./main-page.vue";
</script>
