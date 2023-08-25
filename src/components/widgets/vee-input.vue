<!-- app-input-with-validation.vue -->
<template>
  <q-input v-bind="$attrs" v-model="value" :error="!!errorMessage" :error-message="errorMessage" />
</template>

<script setup lang="ts">
  import { Ref } from "vue";
  import { useField } from "vee-validate";

  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  });

  const { errorMessage, value: untypedValue } = useField(props.name);
  const value = untypedValue as Ref<string | number | null>;
</script>
