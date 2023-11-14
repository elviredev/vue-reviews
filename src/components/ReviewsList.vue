<template>
  <p v-if="!storeReviews.reviewsContent || storeReviews.reviewsContent.length === 0">Pas encore d'avis 😪</p>
  <div class="reviews-container">
    <!-- ReviewItem Component -->
    <ReviewItem
      v-for="(item, idx) in storeReviews.reviewsContent"
      :key="idx"
      :item="item"
    />
  </div>
</template>

<script setup>
/*
  imports
*/
import ReviewItem from "@/components/ReviewItem.vue";
import { useStoreReviews } from "@/stores/storeReviews";

/*
  store
*/
const storeReviews = useStoreReviews()

</script>

<style scoped>
  p {
    font-size: 22px;
    text-align: center;
    padding: 25px 0;
    margin-top: 25px;
  }
</style>