import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchMovies, fetchHotMovies, fetchLatestMovies, fetchDomesticMovies, fetchInternationalMovies } from '@/api/index.js'

export const useMovieStore = defineStore('movie', () => {
  // 首页数据
  const hotMovies = ref([])
  const latestMovies = ref([])
  const domesticMovies = ref([])
  const internationalMovies = ref([])

  // 列表数据
  const movieList = ref([])
  const loading = ref(false)
  const hasMore = ref(true)
  const total = ref(0)

  // 加载首页数据
  async function loadHomeData() {
    const [hot, latest, domestic, international] = await Promise.all([
      fetchHotMovies(),
      fetchLatestMovies(),
      fetchDomesticMovies(),
      fetchInternationalMovies()
    ])
    hotMovies.value = hot
    latestMovies.value = latest
    domesticMovies.value = domestic
    internationalMovies.value = international
  }

  // 加载电影列表（支持筛选+分页）
  async function loadMovies(filters = {}, append = false) {
    loading.value = true
    try {
      const res = await fetchMovies(filters)
      if (append) {
        movieList.value = [...movieList.value, ...res.items]
      } else {
        movieList.value = res.items
      }
      hasMore.value = res.hasMore
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  return {
    hotMovies, latestMovies, domesticMovies, internationalMovies,
    movieList, loading, hasMore, total,
    loadHomeData, loadMovies
  }
})
