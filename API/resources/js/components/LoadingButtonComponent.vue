
<script setup>
import { defineProps } from "@vue/runtime-core";

const props = defineProps({
  loading: Boolean,
});
</script>

<template>
  <span
    v-if="props.loading"
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  >
    <span class="sr-only">Loading...</span></span
  >
</template>
