<template>
  <Header />
  <RouterView />
</template>

<script setup>
/*
  imports
*/
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import { useStoreReviews } from "@/stores/storeReviews";
import { onMounted } from "vue";

/*
  store
*/
const storeReviews = useStoreReviews()

/*
  onMounted Hook
*/
onMounted(() => {
  storeReviews.fetchReviews()
})
</script>
