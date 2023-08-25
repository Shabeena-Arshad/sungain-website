<template>
  <q-card-section
    flat
    class="row justify-between q-pa-none"
    :class="$q.screen.gt.sm ? '' : 'q-pa-none'"
  >
    <vee-input
      v-model="listingRequestInput.userName"
      outlined
      counter
      maxlength="25"
      name="name"
      style="width: 32.5%"
      :label="$t('listingRequest.dialog.name')"
    />

    <vee-input
      v-model="listingRequestInput.email"
      outlined
      counter
      maxlength="25"
      name="email"
      style="width: 32.5%"
      :label="$t('listingRequest.dialog.email')"
    />

    <vee-input
      v-model="listingRequestInput.phone"
      outlined
      counter
      maxlength="25"
      name="phone"
      mask="#########"
      style="width: 32.5%"
      :label="$t('listingRequest.dialog.phone')"
    />
  </q-card-section>
</template>

<script setup lang="ts">
  import VeeInput from "@/components/widgets/vee-input.vue";
  import { ListingRequest } from "@/interfaces/listing-request";
  import { inject, Ref } from "vue";

  const listingRequestInput = inject("listingRequestInput") as Ref<ListingRequest>;
</script>
