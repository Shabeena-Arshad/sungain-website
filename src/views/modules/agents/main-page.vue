<template>
  <q-card flat square>
    <q-card-section class="q-pa-none bg-transparent">
      <q-img :src="image" fit="cover" :ratio="3 / 1">
        <q-item class="absolute-full text-subtitle2 flex flex-center justify-center items-center">
          <q-item-section class="items-center">
            <q-item-label class="text-h3 text-white">{{ $t("agent.title") }}</q-item-label>
            <q-item-label class="q-mt-none">
              <q-btn
                flat
                square
                class="text-green-1 bg-primary q-mb-lg q-mt-md"
                :label="$t('agent.btnJoinUs')"
                @click="showJoinUsDialog"
              />
              <q-btn
                flat
                square
                class="text-primary bg-green-1 q-mb-lg q-mt-md"
                :label="$t('agent.btnContactUs')"
                @click="showContactUsDialog"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-img>
    </q-card-section>
    <q-card-section class="q-ma-xl q-pa-none">
      <div class="text-h4 text-primary q-mb-md text-center" style="text-decoration: underline">
        {{ $t("agent.title") }}
      </div>

      <q-card-section class="text-center">
        <div v-html="translate(contentData, meta, 'contentData')"></div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { defineAsyncComponent, ref } from "vue";
  import { useI18n } from "vue-i18n";

  // 3rd Party Import
  import Axios, { AxiosError } from "axios";
  import { useQuasar } from "quasar";

  // .ts file
  import { AGENT_CONTENT_URL, PLACEHOLDER_THUMBNAIL } from "@/constants";
  import { Content } from "@/interfaces/content";
  import { useUtilities } from "@/composable/use-utilities";

  const { translate } = useUtilities();

  const image = ref<string>();
  const data = ref<Content | null>(null);
  const error = ref<string | null>(null);

  const contentData = ref("");
  const meta = ref({});

  try {
    const response = await Axios.get(AGENT_CONTENT_URL);

    contentData.value = response.data.contentData;
    meta.value = response.data.meta as any;

    data.value = response.data;
    if (data.value !== null && data.value.meta?.image) {
      image.value = data.value.meta?.image as string;
    } else {
      image.value = PLACEHOLDER_THUMBNAIL;
    }
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

  const { t } = useI18n({ useScope: "global" });
  const $q = useQuasar();

  const showJoinUsDialog = () => {
    showCreateUpdateDialog("join", t("agent.joinUsText"));
  };

  const showContactUsDialog = () => {
    showCreateUpdateDialog("contact", t("agent.contactUsText"));
  };

  const showCreateUpdateDialog = (method: string, title: string) => {
    $q.loading.show({
      message: "Loading data. Hang on..."
    });
    setTimeout(() => {
      $q.loading.hide();
    }, 250);

    $q.dialog({
      component: defineAsyncComponent(() => import("./dialog/index.vue")),
      componentProps: {
        method: method,
        title: title
      }
    });
  };
</script>
