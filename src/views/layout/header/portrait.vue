<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-header class="text-white q-mx-auto">
    <q-toolbar class="bg-white text-grey-10 q-py-sm shadow-1">
      <q-btn
        v-model="drawerOpen"
        dense
        flat
        round
        :icon="drawerOpen == true ? 'close' : 'menu'"
        @click="onClick"
      />

      <q-btn
        flat
        unelevated
        class="q-pa-none q-ml-md no-hover"
        :ripple="false"
        @click="handleLogoClick"
      >
        <q-img :src="logo" width="150px" height="64px" fit="contain" />
      </q-btn>
      <q-space />

      <language-select class="q-mr-md" />
    </q-toolbar>
  </q-header>
  <drawer-main />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import DrawerMain from "./drawer-main.vue";
  import LanguageSelect from "@/components/custom/language-select.vue";

  const props = defineProps({
    isDrawerOpen: {
      type: Boolean
    }
  });

  const emits = defineEmits(["on-click"]);

  const logo = ref("/img/icons/logo.png");
  const drawerOpen = ref(props.isDrawerOpen);
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  function onClick() {
    emits("on-click");
  }
</script>

<style scoped>
  :deep(.q-btn.no-hover .q-focus-helper) {
    display: none;
  }
</style>
