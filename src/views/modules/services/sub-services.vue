<template>
  <div class="q-pa-md row items-center justify-center q-gutter-md">
    <q-card
      class="my-card"
      flat
      bordered
      style="width: 500px"
      v-for="subservice in subservices"
      :key="subservice.id"
    >
      <q-img :src="subservice.img" :ratio="16 / 10" />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ subservice.tagline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ subservice.title }}</div>
        <div class="text-caption text-grey">
          {{ subservice.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Find Out More" />
      </q-card-actions>
    </q-card>

    <!-- <q-card
      class="my-card"
      flat
      bordered
      style="width: 500px"
      v-for="plastics in plastic"
      :key="plastics.id"
    >
      <q-img :src="plastics.img" :ratio="16 / 10" />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ plastics.tagline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ plastics.title }}</div>
        <div class="text-caption text-grey">
          {{ plastics.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Find Out More" />
      </q-card-actions>
    </q-card> -->
  </div>
</template>

<script setup lang="ts">
  defineProps({
    subservices: {
      type: Object,
      required: true
    }
  });
</script>
