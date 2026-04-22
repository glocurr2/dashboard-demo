<template>
  <div :class="props.gradientClasses">
    {{ props.metricTitle }}:<br />
    {{ props.metric }}K
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  metricTitle: {
    type: String,
    default: '',
  },
  metric: {
    type: Number,
    default: 10,
  },
  gradientClasses: {
    type: String,
    default: '',
  },
});
</script>
