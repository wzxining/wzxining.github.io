<template>
  <div class="movie-list-page container">
    <h1 class="page-title">电影库</h1>

    <!-- 筛选栏 -->
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label">地区</label>
        <MovieTabs
          :tabs="REGIONS"
          :active="filters.region"
          @change="onRegionChange"
        />
      </div>
      <div class="filter-group">
        <label class="filter-label">类型</label>
        <MovieTabs
          :tabs="genreTabs"
          :active="filters.genre"
          @change="onGenreChange"
        />
      </div>
      <div class="filter-group">
        <label class="filter-label">年份</label>
        <select v-model="filters.year" class="filter-select" @change="onFilterChange">
          <option value="">全部年份</option>
          <option v-for="y in YEARS" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <!-- 电影列表 -->
    <MovieSection
      title="全部影片"
      :movies="movieStore.movieList"
      :loading="movieStore.loading"
    />

    <!-- 无限滚动触发点 -->
    <div v-if="movieStore.hasMore" ref="loadTrigger" class="load-more">
      <div v-if="movieStore.loading" class="loading-spinner">
        <span class="spinner"></span>
        加载中...
      </div>
    </div>

    <div v-if="!movieStore.hasMore && movieStore.movieList.length > 0" class="load-more end">
      已加载全部 {{ movieStore.total }} 部影片
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movie.js'
import { REGIONS, GENRES, YEARS } from '@/utils/constants.js'
import MovieTabs from '@/components/MovieTabs.vue'
import MovieSection from '@/components/MovieSection.vue'

const route = useRoute()
const movieStore = useMovieStore()

const filters = reactive({
  region: 'all',
  genre: '',
  year: ''
})

const genreTabs = [
  { key: '', label: '全部类型' },
  ...GENRES.map(g => ({ key: g, label: g }))
]

let currentPage = 1

// 从 URL 读取初始参数
onMounted(() => {
  if (route.query.region) filters.region = route.query.region
  loadMovies()
})

function onRegionChange(val) {
  filters.region = val
  onFilterChange()
}
function onGenreChange(val) {
  filters.genre = val
  onFilterChange()
}
function onFilterChange() {
  currentPage = 1
  loadMovies()
}

async function loadMovies() {
  await movieStore.loadMovies({
    region: filters.region !== 'all' ? filters.region : undefined,
    genre: filters.genre || undefined,
    year: filters.year || undefined,
    page: currentPage,
    pageSize: 12
  })
}

// 加载更多
const loadTrigger = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && movieStore.hasMore && !movieStore.loading) {
      currentPage++
      movieStore.loadMovies({
        region: filters.region !== 'all' ? filters.region : undefined,
        genre: filters.genre || undefined,
        year: filters.year || undefined,
        page: currentPage,
        pageSize: 12
      }, true)
    }
  }, { rootMargin: '200px' })
  if (loadTrigger.value) observer.observe(loadTrigger.value)
})

import { onUnmounted } from 'vue'
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.movie-list-page {
  animation: fadeInUp 0.5s ease forwards;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--color-text);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 36px;
  padding: 20px;
  background: var(--color-bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.filter-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.filter-select {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  cursor: pointer;
  outline: none;
}

.load-more {
  text-align: center;
  padding: 32px;
  color: var(--color-text-secondary);
}
.load-more.end {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.loading-spinner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
