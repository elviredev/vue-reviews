<template>
  <Card >
    <form @submit.prevent="handleSubmit">
      <h2>Comment évalueriez-vous nos services ?</h2>
      <!-- Rating Component -->
      <RatingSelect :rating="rating" @setRating="setRating" />
      <div class="input-group">
        <input
            type="text"
            placeholder="Écrire votre avis"
            v-model="text"
        >
        <button
            type="submit"
            class="btn btn-primary"
            :disabled="btnDisabled"
        >
          Envoyer
        </button>
      </div>
      <div class="message" v-if="message !== ''">
        {{ message }}
      </div>
    </form>
  </Card>
</template>

<script setup>
/*
  imports
*/
import {ref, watch} from "vue";
import Card from "@/components/shared/Card.vue";
import RatingSelect from "@/components/RatingSelect.vue";
import { useStoreReviews } from "@/stores/storeReviews";
import { storeToRefs } from "pinia";

/*
  input text
*/
const text = ref('')

// observer text compris entre 10 et 250 caract
watch(text, (newVal) => {
  if (newVal.trim().length <= 10 || newVal.trim().length >= 250) {
    btnDisabled.value = true
    message.value = "📢 Le texte doit être compris entre 10 et 250 caractères."
  } else {
    btnDisabled.value = false
    message.value = ""
  }
})

/*
  button
*/
const btnDisabled = ref(true)

/*
  error message
*/
const message = ref('')

/*
  rating
*/
const rating = ref(10)
const setRating = (val) => {
  rating.value = val
  // console.log(val)
}

/*
  store
*/
const storeReviews = useStoreReviews()
const { editedContent } = storeToRefs(storeReviews)

/*
  watch
*/
// chaque fois que le contenu est édité, maj le texte et la note dans le form
watch(editedContent, (newData) => {
  if (newData.editable) {
    text.value = newData.item.text
    rating.value = newData.item.rating
  }
})

/*
  submit form pour ajouter ou modifier un avis
*/
const handleSubmit = () => {
  const newReview = {
    text: text.value,
    rating: rating.value
  }
  // Si false, on est en mode ajout
  if (!storeReviews.editedContent.editable) {
    // Ajouter un avis
    storeReviews.addReview(newReview)
    // Mettre à jour les données
    text.value = ''
    rating.value = 10
  } else {
    // Si true, on est en mode edit donc on peut modifier l'avis
    storeReviews.updateReview({
      ...newReview,
      id: storeReviews.editedContent.item.id
    })
    text.value = ''
    rating.value = 10
  }
}
</script>

<style scoped>

</style>