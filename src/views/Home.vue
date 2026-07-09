<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero__backdrop" :style="{ backgroundImage: heroBackdrop }"></div>
      <div class="container hero__content">
        <h1 class="hero__title">探索电影世界</h1>
        <p class="hero__subtitle">发现国内外精彩影片，收藏你的最爱</p>
        <SearchBar @search="handleSearch" :placeholder="'搜索你喜欢的电影...'" />
      </div>
    </section>

    <div class="container">
      <!-- 热门电影 -->
      <MovieSection
        title="&#128293; 热门推荐"
        :movies="movieStore.hotMovies"
        :loading="!homeLoaded"
      />

      <!-- 最新上映 -->
      <MovieSection
        title="&#127871; 最新上映"
        :movies="movieStore.latestMovies"
        :loading="!homeLoaded"
        more-link="/movies"
      />

      <!-- 华语佳片 -->
      <MovieSection
        title="&#127464;&#127475; 华语佳片"
        :movies="movieStore.domesticMovies"
        :loading="!homeLoaded"
        more-link="/movies?region=china"
      />

      <!-- 国际精选 -->
      <MovieSection
        title="&#127758; 国际精选"
        :movies="movieStore.internationalMovies"
        :loading="!homeLoaded"
        more-link="/movies?region=america"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movie.js'
import MovieSection from '@/components/MovieSection.vue'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const movieStore = useMovieStore()
const homeLoaded = ref(false)

const heroBackdrop = ref(
  'url(https://picsum.photos/seed/hero-bg/1200/400)'
)

function handleSearch(query) {
  if (query.trim()) {
    router.push({ path: '/search', query: { q: query } })
  }
}

onMounted(async () => {
  await movieStore.loadHomeData()
  homeLoaded.value = true

  // 如果热门电影有数据，用第一张做 hero 背景
  if (movieStore.hotMovies.length > 0) {
    heroBackdrop.value = `url(${movieStore.hotMovies[0].backdrop || movieStore.hotMovies[0].poster})`
  }
})
</script>

<style scoped>
.home-page {
  animation: fadeInUp 0.5s ease forwards;
}

/* Hero */
.hero {
  position: relative;
  padding: 80px 0 64px;
  margin-top: -32px;
  margin-bottom: 48px;
  overflow: hidden;
}

.hero__backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 20%;
  filter: blur(4px) brightness(0.25);
  transform: scale(1.05);
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.hero__title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
}

.hero__subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .hero__title {
    font-size: 1.8rem;
  }
  .hero {
    padding: 48px 0 40px;
  }
}
</style>
