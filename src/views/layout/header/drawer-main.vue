<template>
  <q-drawer show-if-above v-model="drawerOpen" side="left" bordered>
    <q-scroll-area class="fit">
      <q-list>
        <q-separator class="q-mb-md" />

        <template v-for="(menus, i) in menu" :key="'category_' + i">
          <q-item v-ripple exact clickable class="q-py-none q-px-xl" :to="menus.link">
            <q-item-section avatar>
              <q-icon :name="menus.icon" />
            </q-item-section>
            <q-item-section
              dense
              class="text-subtitle1 text-uppercase text-weight-medium q-pa-sm text-secondary"
              >{{ $t(menus.name) }}
            </q-item-section>
          </q-item>
        </template>
        <q-separator spaced />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
  import eventBus from "@/utils/event-bus";
  import { ref, onBeforeUnmount, onMounted } from "vue";

  const menu = ref([
    {
      name: "layout.menu.buy",
      link: "/buy",
      icon: "meeting_room"
    },
    {
      name: "layout.menu.rent",
      link: "/rent-listing",
      icon: "apartment"
    },
    {
      name: "layout.menu.list",
      link: "/property-listing",
      icon: "list"
    },
    {
      name: "layout.menu.agents",
      link: "/agents",
      icon: "groups_3"
    },
    {
      name: "layout.menu.aboutUs",
      link: "/about-us",
      icon: "receipt_long"
    }
  ]);

  const drawerOpen = ref(false);

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value;
  };

  onMounted(() => {
    eventBus.on("toggle-drawer", toggleDrawer);
  });

  onBeforeUnmount(() => {
    eventBus.off("toggle-drawer");
  });
</script>

<style>
  aside.q-drawer {
    top: 79px !important;
  }
  .fullscreen.q-drawer__backdrop {
    background-color: transparent !important;
  }
</style>
