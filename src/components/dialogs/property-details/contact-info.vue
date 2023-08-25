<template>
  <q-item class="bg-grey-3 q-mb-sm q-py-none">
    <q-item-section avatar>
      <q-avatar size="30px" round>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ agentData.firstName }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-btn-toggle
    v-model="model"
    spread
    no-caps
    dense
    toggle-color="primary"
    color="white"
    text-color="black"
    class="q-mb-md"
    :options="[
      { label: 'Email', value: 'one' },
      { label: 'Whatsapp', value: 'two' }
    ]"
    @update:model-value="onUpdateModel"
  />
</template>

<script setup lang="ts">
  // Vue Import
  import { PropType, ref } from "vue";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";

  const props = defineProps({
    row: {
      type: Object as PropType<PropertyListing>,
      required: true
    }
  });

  const agentData = ref<any | null>(null);
  const model = ref("one");

  const onUpdateModel = (value: any) => {
    model.value = value;

    if (value === "one") {
      navigateToEmail();
    } else if (value === "two") {
      navigateToWhatsApp();
    }
  };

  function navigateToEmail() {
    const emailTo = props.row.contactEmail;
    const emailSubject = "Property Inquiry";

    const mailtoURL = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
    window.location.href = mailtoURL;
  }

  function navigateToWhatsApp() {
    const whatsappURL = `https://wa.me/${props.row.contactPhone}?text=Hello,%20I'm%20interested%20in%20your%20property.`;
    window.open(whatsappURL, "_blank");
  }
</script>
