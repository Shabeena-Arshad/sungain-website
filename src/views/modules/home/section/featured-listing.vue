<!-- feature-listing.vue -->
<template>
  <q-card-section class="text-center">
    <div class="text-h5 text-weight-Medium">{{ $t("home.featuredSection.slogan") }}</div>
  </q-card-section>

  <q-card-section class="text-center">
    <div class="text-subtitle1">{{ $t("home.featuredSection.title") }}</div>
  </q-card-section>

  <div v-if="data != null">
    <div class="q-px-md">
      <q-virtual-scroll
        ref="virtualScroll"
        :items="data"
        :virtual-scroll-item-size="360"
        virtual-scroll-horizontal
        @virtual-scroll="onVirtualScroll"
      >
        <template v-slot="{ item: row }">
          <div class="q-pa-xs" style="width: 360px">
            <listing-card :row="row" @on-contact="handleContact" @on-detail="handleDetail" />
          </div>
        </template>
      </q-virtual-scroll>

      <div class="row justify-center q-my-lg">
        <q-btn icon="chevron_left" @click="scrollLeft" />
        <q-btn icon="chevron_right" @click="scrollRight" class="q-ml-sm" />
      </div>
    </div>
  </div>
  <div v-else>
    <h3>Error:</h3>
  </div>
</template>

<script setup lang="ts">
  // Vue Import
  import { defineAsyncComponent, PropType, ref } from "vue";
  import { useRouter } from "vue-router";

  // 3rd Party Import
  import { useQuasar } from "quasar";

  // .ts file
  import { PropertyListing } from "@/interfaces/property-listing";

  // Custom Components
  import ListingCard from "@/components/cards/listing-card.vue";

  const router = useRouter();

  const props = defineProps({
    data: {
      type: Array as PropType<PropertyListing[]>,
      required: false,
      default: null
    }
  });

  const $q = useQuasar();

  const virtualScroll = ref(null);
  const virtualScrollIndex = ref(0);

  function onVirtualScroll(detail: any) {
    virtualScrollIndex.value = detail.index;
  }

  function scrollLeft() {
    if (virtualScroll.value && virtualScrollIndex.value > 0) {
      virtualScrollIndex.value -= 1;
      (virtualScroll.value as any).scrollTo(virtualScrollIndex.value, "end-force");
    }
  }

  function scrollRight() {
    if (virtualScroll.value && virtualScrollIndex.value < props.data.length - 1) {
      virtualScrollIndex.value += 1;
      (virtualScroll.value as any).scrollTo(virtualScrollIndex.value, "start-force");
    }
  }

  function handleContact(data: PropertyListing) {
    $q.dialog({
      component: defineAsyncComponent(() => import("@/components/dialogs/contact-dialog.vue")),
      componentProps: {
        row: data
      }
    });
  }

  function handleDetail(data: PropertyListing) {
    router.push({ name: "property-detail", params: { id: data.propertyListingId } });
  }
</script>
