<template>
  <div class="feedback-stats">
    <h4>{{ storeReviews.reviewsCount ? storeReviews.reviewsCount : "Aucun" }} avis</h4>
    <h4>Moyenne des notes: {{ isNaN(storeReviews.averageRating) ? 0 : storeReviews.averageRating }}</h4>
  </div>
</template>

<script setup>
/*
  imports
*/
import {useStoreReviews} from "@/stores/storeReviews";

/*
  store
*/
const storeReviews = useStoreReviews()
</script>

<style scoped>

</style>