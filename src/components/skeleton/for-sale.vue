<template>
  <q-card style="border-radius: 10px">
    <q-card-section class="q-pa-sm">
      <q-skeleton height="229.73px" style="border-radius: 10px" />
    </q-card-section>

    <q-card-section horizontal>
      <q-card-section class="q-pa-sm col-8">
        <q-item-section>
          <q-item-label class="text-subtitle1 text-weight-medium" lines="1">
            <q-skeleton type="text" class="text-subtitle1"></q-skeleton>
          </q-item-label>
          <q-item-label caption><q-skeleton type="text"></q-skeleton></q-item-label>
        </q-item-section>
      </q-card-section>

      <q-card-section class="q-pa-sm col-4">
        <q-item-section>
          <q-item-label class="text-h6 text-warning text-right">
            <q-skeleton type="text"></q-skeleton
          ></q-item-label>
          <q-item-label caption class="text-warning text-right">
            <q-skeleton type="text"></q-skeleton
          ></q-item-label>
        </q-item-section>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions align="left">
      <q-skeleton class="q-mr-xs" type="text" width="66.7px" />
      <q-skeleton type="QBadge" class="q-mx-xs" width="30px" />
      <q-skeleton type="QBadge" class="q-mx-xs" width="30px" />
      <q-space />
      <q-skeleton type="QBtn" class="q-ma-none" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  defineProps({
    fields: {
      type: Number
    }
  });
</script>
