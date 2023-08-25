<template>
  <q-card flat square>
    <q-card-section class="q-pa-none">
      <q-list>
        <q-item class="q-py-md bg-green-1 q-px-lg justify-center">
          <q-item-section class="text-center">
            <q-item-label class="text-h5">{{ title }}</q-item-label>
            <q-item-label caption class="text-center">{{
              $t("contact.findHomeTagLine")
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <vee-form
        ref="form"
        :initial-values="initialValues"
        :validation-schema="schema"
        @submit="onOKClick"
        v-slot="{ meta }"
      >
        <q-card-section class="q-pa-lg">
          <div class="text-grey">{{ $t("contact.question") }}</div>
          <q-card-section class="q-pa-none">
            <vee-input name="contactName" :label="$t('contact.contactName')" />

            <vee-input name="phone" maxlength="8" :label="$t('contact.phone')" />

            <vee-input name="email" :label="$t('contact.email')" />
          </q-card-section>

          <q-card-actions class="justify-between q-pa-none">
            <app-button
              color="primary"
              :imageIcon="'fa-brands fa-whatsapp'"
              :label="$t('contact.whatsapp')"
              type="submit"
              :disabled="isSubmitDisabled(meta)"
            />
          </q-card-actions>

          <q-card-section class="q-px-none q-pb-none text-grey text-caption">
            {{ $t("contact.footerTagLine") }}
          </q-card-section>
        </q-card-section>
      </vee-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { Notify } from "quasar";
  import AppButton from "@/components/widgets/app-button.vue";
  import VeeInput from "@/components/widgets/vee-input.vue";
  import { useI18n } from "vue-i18n";
  import * as yup from "yup";

  defineProps({
    title: {
      type: String
    }
  });

  const initialValues = ref({});
  const form = ref();

  const { t } = useI18n({ useScope: "global" });

  const schema = {
    contactName: yup.string().min(3).label(t("contact.contactName")),
    email: yup.string().email().label("contact.email"),
    phone: yup.string().label(t("contact.phone"))
  };

  function isSubmitDisabled(meta: any) {
    return !(meta.valid && meta.dirty);
  }

  function notify(message: string, type: string) {
    Notify.create({
      message: message,
      type: type
    });
  }

  async function onOKClick() {
    const successMessage = "Submitted";
    notify(successMessage, "positive");
  }
</script>
