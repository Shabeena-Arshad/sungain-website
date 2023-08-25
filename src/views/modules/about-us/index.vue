<template>
  <q-page>
    <Suspense>
      <main>
        <main-page />
      </main>

      <template #fallback>
        <div class="row justify-center items-center" style="height: 500px">
          <app-spinner size="10em" />
        </div>
      </template>
    </Suspense>
  </q-page>
</template>

<script setup lang="ts">
  import MainPage from "./main-page.vue";

  import AppSpinner from "@/components/widgets/app-spinner.vue";
</script>
