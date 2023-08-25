<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="isDialogVisible"
    @hide="onDialogHide"
    @update:model-value="updateDialogState"
  >
    <q-card style="width: 500px">
      <app-dialog-close-bar />

      <q-card-section class="q-pa-none">
        <q-list>
          <q-item class="q-py-md bg-green-1 q-px-lg">
            <q-item-section top avatar>
              <q-item-label>{{ $t("contact.title") }}</q-item-label>
              <q-item-label caption>{{ $t("contact.headerTagLine") }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="q-py-md bg-grey-2 q-px-lg">
            <q-item-section>
              <q-item-label overline>{{ row?.buildingName }}</q-item-label>
              <q-item-label caption>{{ row?.buildingAddress }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-section style="height: 38px" top>
                <q-item-label v-show="sellPrice != '0'" class="text-right text-grey-10">{{
                  sellPrice
                }}</q-item-label>

                <q-item-label v-show="rentPrice != '0'" class="text-right text-grey-10 q-ma-none">{{
                  rentPrice
                }}</q-item-label>
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-section class="col-8 q-px-lg">
          <div class="text-grey">{{ $t("contact.question") }}</div>
          <vee-form
            ref="form"
            :initial-values="initialValues"
            :validation-schema="schema"
            @submit="sendMessage"
            v-slot="{ meta }"
          >
            <q-card-section class="q-pa-none">
              <vee-input
                name="contactName"
                v-model="contactName"
                :label="$t('contact.contactName')"
              />

              <vee-input
                name="phone"
                v-model="phoneNumber"
                maxlength="8"
                :label="$t('contact.phone')"
              />

              <vee-input name="email" v-model="email" :label="$t('contact.email')" />
            </q-card-section>

            <q-card-actions align="right">
              <app-button
                :imageIcon="'fa-brands fa-whatsapp'"
                color="primary"
                :label="$t('contact.whatsapp')"
                type="submit"
                :disabled="isSubmitDisabled(meta)"
              />
            </q-card-actions>
          </vee-form>
          <q-card-section class="q-pa-none text-grey text-caption">
            {{ $t("contact.footerTagLine") }}
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  //Vue Import
  import { computed, ref, type PropType } from "vue";
  import { useI18n } from "vue-i18n";

  // 3rd Party Import
  import { useDialogPluginComponent } from "quasar";
  import * as yup from "yup";

  // .ts file
  import eventBus from "@/utils/event-bus";
  import { PropertyListing } from "@/interfaces/property-listing";

  // Custom Components
  import AppButton from "@/components/widgets/app-button.vue";
  import AppDialogCloseBar from "@/components/dialogs/app-dialog-close-bar.vue";
  import VeeInput from "@/components/widgets/vee-input.vue";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>
    }
  });

  const { t } = useI18n({ useScope: "global" });
  const initialValues = ref({});
  const form = ref();

  const schema = {
    contactName: yup.string().min(3).label(t("contact.contactName")),
    email: yup.string().email().label("contact.email"),
    phone: yup.string().label(t("contact.phone"))
  };

  const contactName = ref<string>();
  const phoneNumber = ref<string>();
  const email = ref<string>();

  function isSubmitDisabled(meta: any) {
    return !(meta.valid && meta.dirty);
  }

  const { dialogRef, onDialogHide } = useDialogPluginComponent();
  const isDialogVisible = ref();

  function updateDialogState(status: any) {
    isDialogVisible.value = status;
    eventBus.emit("DialogStatus", status);
  }

  const sellPrice = computed(() => {
    if (props.row && (props.row.listingMode & 1) === 1) {
      // Selling price
      return `HK$ ` + props.row.askingPrice;
    }
    return "0";
  });

  const rentPrice = computed(() => {
    if (props.row && (props.row.listingMode & 2) === 2) {
      // Rental price
      return `HK$ ` + props.row.rentalPrice;
    }
    return "0";
  });

  async function sendMessage() {
    const text = `Name : ${contactName.value} \n Email : ${email.value}`;

    // Construct the WhatsApp URL with the phone number and text
    const url = `https://wa.me/${phoneNumber.value}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp in a new tab/window
    window.open(url, "_blank");
  }
</script>
