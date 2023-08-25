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

      <div class="q-pa-md">
        <q-card flat>
          <q-card-section class="q-py-lg q-pl-lg q-pr-none">
            <vee-form
              ref="form"
              :initial-values="initialValues"
              :validation-schema="schema"
              @submit="onOKClick"
              v-slot="{ meta }"
            >
              <q-scroll-area style="height: calc(100vh - 350px)" class="q-ma-none q-pr-lg">
                <input-data :amenityData="amenityData" />
                <contact-detail />

                <app-button
                  color="primary"
                  type="submit"
                  :label="$t('action.submit')"
                  :disabled="isSubmitDisabled(meta)"
                />
              </q-scroll-area>
            </vee-form>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  // Vue Import
  import { onMounted, provide, ref } from "vue";

  // 3rd Party Import
  import { useDialogPluginComponent } from "quasar";
  import * as yup from "yup";

  // .ts files
  import eventBus from "@/utils/event-bus";
  import { useListingRequestInput } from "./use-listing-request-input";

  // Custom Components
  import AppButton from "@/components/widgets/app-button.vue";
  import AppDialogCloseBar from "@/components/dialogs/app-dialog-close-bar.vue";
  import contactDetail from "./contact-detail.vue";
  import InputData from "./input-data.vue";

  defineProps({
    amenityData: {
      type: Object
    },
    title: {
      type: String
    }
  });

  defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
  const { createListingRequest, resetListingInput, listingRequestInput } = useListingRequestInput();

  provide("listingRequestInput", listingRequestInput);

  const initialValues = ref({});
  const form = ref();

  const isDialogVisible = ref();
  const schema = yup.object({
    name: yup.string().min(3),
    email: yup.string().email().label("Email"),
    phone: yup.string().label("Phone")
  });

  function isSubmitDisabled(meta: any) {
    return !(meta.valid && meta.dirty);
  }

  const onOKClick = () => {
    createListingRequest(onDialogCancel);
  };

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
