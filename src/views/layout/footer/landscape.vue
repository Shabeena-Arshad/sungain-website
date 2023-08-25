<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-card
    square
    flat
    class="text-white bg-green-10"
    style="linear-gradient(90deg, rgba(9,121,93,1) 0%, rgba(53,131,85,1) 82%, rgba(9,121,93,1) 100%);"
  >
    <q-card-section horizontal class="q-px-none">
      <q-card-section class="col-xs-4 col-sm-4 col-md-4 offset-md-1">
        <q-list dense dark>
          <q-item>
            <q-item-section dense>
              <q-item-label class="text-subtitle2">{{ $t("layout.footer.contact") }}</q-item-label>

              <q-item-label caption class="text-white" v-for="item in contacts" :key="item.key">
                <q-icon :name="item.icon"></q-icon> {{ item.value }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="col-xs-6 col-sm-6 col-md-4">
        <q-list dense dark>
          <q-item>
            <q-item-section dense>
              <q-item-label class="text-subtitle2">{{ $t("layout.footer.address") }}</q-item-label>
              <q-item-label
                caption
                class="text-white"
                v-for="item in translateAddress(data?.meta)"
                :key="item.key"
                >{{ item.value }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="col-2" :vertical="$q.screen.lt.md" align="right">
        <q-item>
          <q-item-section dense>
            <q-item-label class="text-subtitle2">{{ $t("layout.footer.followUs") }}</q-item-label>
            <q-item-label>
              <q-btn
                v-for="item in socials"
                :key="item.icon"
                class="q-ma-xs"
                color="white"
                text-color="primary"
                round
                dense
                :href="item.link"
                :icon="item.icon"
                target="_blank"
              >
              </q-btn
            ></q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
    </q-card-section>

    <q-separator color="white" inset />

    <q-card-section class="text-center text-subtitle2 q-pa-xs q-py-md">
      {{ $t("layout.footer.copyRightText", { currentYear: currentYear }) }}
      {{ $t("layout.footer.copyRightStatement") }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { ref } from "vue";

  // 3rd Party Import
  import axios, { AxiosError } from "axios";
  import { date } from "quasar";

  // .ts file
  import { Content } from "@/interfaces/content";
  import { FOOTER_CONTENT_URL } from "@/constants";
  import { useSocialLinks } from "@/composable/use-social-links";
  import { useUtilities } from "@/composable/use-utilities";

  const { translateAddress } = useUtilities();
  const data = ref<Content | null>(null);
  const error = ref<string | null>(null);
  const { socialLinks: socials } = useSocialLinks();

  try {
    const response = await axios.get<Content>(FOOTER_CONTENT_URL);
    data.value = response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.status === 404) {
        error.value = "Not found";
      } else {
        error.value = "An error occurred";
      }
    } else {
      error.value = "An unexpected error occurred";
    }
  }

  const contacts = ref([
    { key: "phone", icon: "fa-solid fa-phone", value: data.value?.meta?.phone || "" },
    { key: "whatsapp", icon: "fa-brands fa-whatsapp", value: data.value?.meta?.whatsapp || "" },
    { key: "email", icon: "fa-regular fa-envelope", value: data.value?.meta?.email || "" }
  ]);

  const currentYear = ref(date.formatDate(Date.now(), "YYYY"));
</script>
