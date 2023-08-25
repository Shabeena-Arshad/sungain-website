<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-header class="bg-white text-black" :class="{ narrowed: isNarrowed }" transition="fade">
    <q-toolbar class="q-pa-md shadow-1">
      <q-btn
        v-if="isNarrowed"
        flat
        unelevated
        class="q-pa-none q-ma-none no-hover"
        :ripple="false"
        @click="handleLogoClick"
      >
        <q-img :src="logo" width="124px" height="51px" fit="contain" />
      </q-btn>

      <q-space v-if="isNarrowed" />

      <q-btn
        v-else
        flat
        unelevated
        class="q-pa-none q-mr-xl no-hover"
        :ripple="false"
        @click="handleLogoClick"
      >
        <q-img :src="logo" width="236px" height="96px" fit="contain" />
      </q-btn>

      <q-btn-toggle
        v-model="menuNav"
        toggle-color="primary"
        flat
        size="16px"
        text-color="grey-10"
        :options="[
          { label: $t('layout.menu.services'), value: 'services' },
          { label: $t('layout.menu.recyclingProcess'), value: 'recyclingProcess' },
          { label: $t('layout.menu.industriesServed'), value: 'industriesServed' },
          { label: $t('layout.menu.testimonials'), value: 'testimonials' },
          { label: $t('layout.menu.aboutUs'), value: 'aboutus' },
          {
            label: $t('layout.menu.sustainabilityInitiatives'),
            value: 'sustainabilityInitiatives'
          },
          { label: $t('layout.menu.faq'), value: 'faq' },
          { label: $t('layout.menu.blognews'), value: 'aboutus' }
        ]"
        @update:model-value="handleToggleUpdate"
      />

      <q-space />

      <language-select class="q-mr-md" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import { useRouter } from "vue-router";
  import LanguageSelect from "@/components/custom/language-select.vue";

  const logo = ref("/img/icons/logo.png");

  const menuNav = ref("");
  const router = useRouter();

  const isNarrowed = ref(false);

  const handleLogoClick = () => {
    menuNav.value = "";
    router.push("/");
  };

  const handleToggleUpdate = (newVal: any) => {
    switch (newVal) {
      case "services":
        router.push("/buy");
        break;
      case "recyclingProcess":
        router.push("/rent-listing");
        break;
      case "industriesServed":
        router.push("/property-listing");
        break;
      case "testimonials":
        router.push("/agents");
        break;
      case "aboutus":
        router.push("/about-us");
        break;
      case "sustainabilityInitiatives":
        router.push("/about-us");
        break;
      case "faq":
        router.push("/about-us");
        break;
      case "blognews":
        router.push("/about-us");
        break;
      default:
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const scrollThreshold = 100;

    isNarrowed.value = scrollPosition > scrollThreshold;
  }
</script>

<style>
  .narrowed {
    height: 84px;
    transition: height 0.3s ease;
  }

  .q-btn.no-hover .q-focus-helper {
    display: none;
  }
</style>
