<template>
  <q-bar class="bg-primary" style="width: 100%">
    <q-space />
    <q-btn v-close-popup dense flat icon="close" color="white" size="xs">
      <q-tooltip class="bg-white text-primary">{{ $t("action.close") }}</q-tooltip>
    </q-btn>
  </q-bar>
</template>

<script setup lang="ts"></script>
