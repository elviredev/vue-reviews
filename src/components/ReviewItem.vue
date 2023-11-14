<template>
  <Card>
    <button class="close" @click="storeReviews.deleteReview(item)">
      <i class="fas fa-times"></i>
    </button>
    <button class="edit" @click="storeReviews.editReview(item)">
      <i class="fas fa-edit"></i>
    </button>
    <div class="num-display">{{ item.rating }}</div>
    <div class="text-display">{{ item.text }}</div>
  </Card>
</template>

<script setup>
/*
  imports
*/
import Card from "@/components/shared/Card.vue";
import { useStoreReviews } from "@/stores/storeReviews";

/*
  props
*/
const props = defineProps({
  item: {
    type: Object
  }
})

/*
  store
*/
const storeReviews = useStoreReviews()

</script>

<style scoped>

</style>