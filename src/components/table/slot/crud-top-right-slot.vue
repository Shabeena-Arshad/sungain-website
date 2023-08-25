<template>
  <q-toolbar class="q-gutter-x-md">
    <q-btn flat round color="primary" icon="mdi-refresh" @click="$emit('on-refresh')">
      <q-tooltip class="bg-dark text-caption shadow-4">{{ $t("action.refresh") }}</q-tooltip>
    </q-btn>

    <q-btn
      v-show="isNthBitSet(buttonOption, ButtonOption.CREATE)"
      flat
      round
      color="primary"
      icon="mdi-plus"
      @click="$emit('on-create')"
    >
      <q-tooltip class="bg-dark text-caption shadow-4">{{ $t(tipTextCreate) }}</q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  import { ButtonOption } from "@/constants";
  import { useUtilities } from "@/composable/use-utilities";

  const { isNthBitSet } = useUtilities();
  const props = defineProps({
    toolTipCreate: String,
    buttonOption: {
      type: Number,
      default: 1,
      required: false
    }
  });

  defineEmits<{
    (event: "on-create"): void;
    (event: "on-refresh"): void;
  }>();

  const tipTextCreate = ref(props.toolTipCreate || "");
</script>
