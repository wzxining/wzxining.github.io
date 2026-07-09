import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户评分：{ movieId: rating }
  const ratings = ref({})

  // 用户评论：{ movieId: [{ text, date }] }
  const comments = ref({})

  function setRating(movieId, rating) {
    ratings.value[movieId] = rating
  }

  function getRating(movieId) {
    return ratings.value[movieId] || 0
  }

  function addComment(movieId, text) {
    if (!comments.value[movieId]) {
      comments.value[movieId] = []
    }
    comments.value[movieId].unshift({
      text,
      date: new Date().toISOString()
    })
  }

  function getComments(movieId) {
    return comments.value[movieId] || []
  }

  return { ratings, comments, setRating, getRating, addComment, getComments }
}, {
  persist: true
})
