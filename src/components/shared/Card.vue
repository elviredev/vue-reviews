<template>
<div class="card" :class="{ 'reverse' : reverse }">
  <slot />
</div>
</template>

<script setup>
/*
  props
*/
const props = defineProps({
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  background: #f1f1f1;
  color: #212121;
}
.card.reverse {
  background: #212121;
  color: #fff;
}
</style>