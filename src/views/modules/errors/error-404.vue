<template>
  <q-card
    flat
    square
    class="window-height window-width fullscreen column justify-center items-center"
  >
    <q-img src="@/assets/img/404.png" fit="cover" :ratio="16 / 9">
      <q-item class="absolute-bottom text-subtitle2 flex flex-center justify-center items-center">
        <q-item-section class="items-center">
          <q-item-label class="text-h4 text-primary">
            {{ "Page " + error }}
          </q-item-label>
          <q-item-label class="text-subtitle1 text-grey-5 q-mb-md">
            We can't seem to find a page you are looking for..
          </q-item-label>
          <q-item-label class="text-primary">
            <q-btn rounded class="bg-primary text-white" label="Back to Home" to="/"> </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-img>
  </q-card>
</template>

<script setup lang="ts">
  defineProps({
    error: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .q-img__content > div {
    background: transparent;
    bottom: 140px;
  }
</style>
