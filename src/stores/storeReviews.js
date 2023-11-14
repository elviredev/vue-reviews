import { defineStore } from 'pinia'

export const useStoreReviews = defineStore('storeReviews', {
  state: () => ({
    reviews: [],
    editedData: {
      editable: false,
      item: null
    }
  }),
  actions: {
    // Ajouter un avis
    async addReview(review){
      const response = await fetch(`http://localhost:5000/reviews/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      })
      // Récupère le new avis dans la variable newReview
      const newReview = await response.json()
      // console.log(newReview)
      // Ajouter le new avis dans le tableau reviews
      this.reviews = [newReview, ...this.reviews]
    },
    // Récupérer les avis
    async fetchReviews() {
      try {
        const reviews = await fetch(`http://localhost:5000/reviews?_sort=id&_order=desc`)
        const datas = await reviews.json()
        this.reviews = datas
        // console.log(datas)
      } catch (error) {
        console.error(error)
      }
    },
    // Editer un avis (click sur btn edition)
    editReview(review) {
      let editedData = {
        editable: true,
        item: review
      }
      // Met à jour le store
      this.editedData = editedData
    },
    // Modifier un avis
    async updateReview(review) {
      const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      })
      const updatedReview = await response.json()
      // Mettre à jour le state
      let reviews = this.reviews.map(item => item.id === review.id ? {...item, ...updatedReview} : item)
      this.reviews = reviews
      let editedData = {
        editable: false,
        item: null
      }
      this.editedData = editedData
      // Récupérer les avis
      await this.fetchReviews()
    },
    // Supprimer un avis
    async deleteReview(review) {
      await fetch(`http://localhost:5000/reviews/${review.id}`, {
        method: 'DELETE',
      });
      // Mettre à jour le state
      this.reviews = this.reviews.filter(rev => rev.id !== review.id)
      // Récupérer tous les avis
      await this.fetchReviews()
    }
  },
  getters: {
    // Calcul de la moyenne des notes
    averageRating(state) {
      let avg = state.reviews.reduce((acc, currentValue) => {
        // Somme de toutes les notes (rating)
        return acc + currentValue.rating
      }, 0) / state.reviews.length
      // Regex : on accepte que 1 chiffre après la virgule
      avg = avg.toFixed(1).replace(/[.,]0$/, "")
      return avg
    },
    // Récupérer le nombre d'avis
    reviewsCount() {
      return this.reviews.length
    },
    reviewsContent() {
      return this.reviews
    },
    editedContent() {
      return this.editedData
    }
  }
})
