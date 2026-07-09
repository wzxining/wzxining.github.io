import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])

  const isFavorite = computed(() => {
    return (movieId) => favorites.value.some(f => f.id === movieId)
  })

  function toggleFavorite(movie) {
    const idx = favorites.value.findIndex(f => f.id === movie.id)
    if (idx > -1) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        year: movie.year,
        region: movie.region
      })
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}, {
  persist: true
})
