<template>
  <div class="text-h6 q-mb-md text-grey-10 text-center">
    {{ $t("listingRequest.dialog.title") }}
  </div>
  <q-card-section
    :horizontal="$q.screen.gt.sm"
    class="justify-between q-pa-none"
    :class="$q.screen.gt.sm ? '' : 'q-pa-none'"
  >
    <q-card-section class="col-8 q-pl-none" :class="$q.screen.gt.sm ? '' : 'q-pa-none'">
      <option-group-mode v-model="listingRequestInput.listingMode" />

      <q-card-section
        class="q-pa-none"
        :class="$q.screen.lt.sm ? 'column justify-center' : 'row justify-between '"
      >
        <vee-input
          v-if="listingRequestInput.listingMode === 1 || listingRequestInput.listingMode === 3"
          v-model="listingRequestInput.rentalPrice"
          outlined
          class="q-mb-sm"
          name="rentalPrice"
          mask="######"
          :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 48.5%'"
          :label="$t('listingRequest.columns.rentalPrice')"
          placeholder="20,000"
        />

        <vee-input
          v-if="listingRequestInput.listingMode === 2 || listingRequestInput.listingMode === 3"
          v-model="listingRequestInput.askingPrice"
          outlined
          class="q-mb-sm"
          mask="#######"
          name="askingPrice"
          :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 48.5%'"
          :initial-value="listingRequestInput.askingPrice"
          :label="$t('listingRequest.columns.askingPrice')"
          placeholder="10,000,000"
        />
      </q-card-section>

      <vee-input
        v-model="listingRequestInput.saleableArea"
        outlined
        class="q-mb-sm"
        mask="####"
        name="saleableArea"
        :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 48.5%'"
        :label="$t('listingRequest.columns.saleableArea')"
        placeholder="2000 SF"
      />

      <q-card-section
        :horizontal="$q.screen.gt.sm"
        :class="$q.screen.gt.sm ? '' : 'q-pa-none'"
        class="justify-between"
      >
        <vee-input
          v-model="listingRequestInput.address"
          outlined
          counter
          maxlength="200"
          type="textarea"
          name="address"
          :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 48.5%'"
          :label="$t('listingRequest.columns.address')"
        />

        <vee-input
          v-model="listingRequestInput.description"
          outlined
          counter
          maxlength="200"
          type="textarea"
          name="description"
          :style="$q.screen.lt.sm ? 'width: 100%' : 'width: 48.5%'"
          :label="$t('listingRequest.dialog.description')"
        />
      </q-card-section>
    </q-card-section>

    <q-card-section
      class="col-4 q-pl-none q-pr-none justify-between"
      :class="$q.screen.gt.sm ? '' : 'q-pa-none'"
    >
      <option-group-checkbox v-model="listingRequestInput.features" :options="amenityData" />

      <option-group-radio
        v-model="listingRequestInput.noOfBedRooms"
        :title="$t('listingRequest.dialog.bedrooms')"
        :options="localizedBedrooms"
      />

      <option-group-radio
        v-model="listingRequestInput.bathRoom"
        :title="$t('listingRequest.dialog.bathrooms')"
        :options="bathrooms"
      />
    </q-card-section>
  </q-card-section>
</template>

<script setup lang="ts">
  // Vue Import
  import { inject, Ref, computed, PropType } from "vue";
  import { useI18n } from "vue-i18n";

  // 3rd Party Import
  import { QOptionGroupProps } from "quasar";

  // .ts file
  import { ListingRequest } from "@/interfaces/listing-request";
  import { useListingRequestInput } from "./use-listing-request-input";

  // Custom Components
  import VeeInput from "@/components/widgets/vee-input.vue";
  import OptionGroupCheckbox from "./option-group-checkbox.vue";
  import OptionGroupMode from "./option-group-mode.vue";
  import OptionGroupRadio from "./option-group-radio.vue";

  const { t } = useI18n();

  defineProps({
    amenityData: {
      type: Array as PropType<QOptionGroupProps["options"]>
    },
    title: {
      type: String
    }
  });

  const localizedBedrooms = computed(() => {
    return bedrooms.value.map(bedroom => {
      return {
        ...bedroom,
        label: t(bedroom.label)
      };
    });
  });
  const { bathrooms, bedrooms } = useListingRequestInput();
  // Inject propertyListingInput
  const listingRequestInput = inject("listingRequestInput") as Ref<ListingRequest>;
</script>
