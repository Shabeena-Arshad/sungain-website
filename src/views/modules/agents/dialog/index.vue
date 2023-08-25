<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="isDialogVisible"
    persistent
    fixed
    @hide="onDialogHide"
    @update:model-value="updateDialogState"
  >
    <q-card flat square style="width: 1160px; max-width: 90vw">
      <app-dialog-close-bar />

      <joinus-contactus :title="title" @move-next="onSubmit" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  // Vue Import
  import { onMounted, ref } from "vue";

  // 3rd Party Import
  import { useDialogPluginComponent } from "quasar";

  // .ts files
  import eventBus from "@/utils/event-bus";
  import { useListingRequestInput } from "./use-listing-request-input";

  // Custom Components
  import AppDialogCloseBar from "@/components/dialogs/app-dialog-close-bar.vue";
  import joinusContactus from "./joinus-contactus.vue";

  defineProps({
    method: {
      type: String
    },
    title: {
      type: String
    }
  });

  defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
  const { createListingRequest, resetListingInput } = useListingRequestInput();

  const isDialogVisible = ref();

  function onSubmit() {
    createListingRequest(onDialogCancel);
  }

  onMounted(() => {
    resetListingInput();
    eventBus.on("CloseDilaog", () => {
      isDialogVisible.value = false;
    });
  });

  function updateDialogState(status: any) {
    isDialogVisible.value = status;
    eventBus.emit("DialogStatus", status);
  }
</script>

<style lang="scss">
  .q-stepper--horizontal .q-stepper__step-inner {
    padding-right: 0 !important;
  }

  .q-stepper__header.row.items-stretch.justify-between.q-stepper__header--standard-labels {
    display: none !important;
  }
</style>
