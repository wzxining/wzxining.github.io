<template>
  <div class="search-page container">
    <h1 class="page-title">搜索电影</h1>

    <SearchBar
      :model-value="query"
      @search="handleSearch"
      @update:model-value="handleQueryChange"
    />

    <!-- 搜索结果 -->
    <div v-if="results.length > 0" class="search-results">
      <p class="search-info">找到 {{ results.length }} 部相关电影</p>
      <div class="search-grid">
        <MovieCard
          v-for="movie in results"
          :key="movie.id"
          :movie="movie"
          @hover="onHover"
          @hover-end="onHoverEnd"
        />
      </div>
      <!-- 背景海报 -->
      <div
        class="search-backdrop"
        :class="{ active: !!hoveredPoster }"
        :style="{ backgroundImage: hoveredPoster ? `url(${hoveredPoster})` : 'none' }"
      ></div>
    </div>

    <!-- 无结果 -->
    <div v-else-if="searched && results.length === 0" class="search-empty">
      <p class="search-empty__icon">&#128270;</p>
      <h2>没有找到相关电影</h2>
      <p>换个关键词试试？</p>
    </div>

    <!-- 搜索提示 -->
    <div v-if="!searched" class="search-hint">
      <p class="search-hint__title">热门搜索</p>
      <div class="search-hint__tags">
        <button
          v-for="tag in hotTags"
          :key="tag"
          class="tag-btn"
          @click="quickSearch(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchMovie } from '@/api/index.js'
import SearchBar from '@/components/SearchBar.vue'
import MovieCard from '@/components/MovieCard.vue'

const route = useRoute()
const router = useRouter()

const query = ref(route.query.q || '')
const results = ref([])
const searched = ref(false)
const hoveredPoster = ref('')

const hotTags = ['肖申克的救赎', '哪吒', '宫崎骏', '科幻', '吴京', '诺兰', '寄生虫']

function onHover(poster) { hoveredPoster.value = poster }
function onHoverEnd() { hoveredPoster.value = '' }

async function handleSearch(q) {
  query.value = q
  if (!q.trim()) {
    results.value = []
    searched.value = false
    return
  }
  searched.value = true
  results.value = await searchMovie(q)

  // 更新 URL
  const queryObj = q ? { q } : {}
  router.replace({ query: queryObj })
}

function handleQueryChange(val) {
  query.value = val
}

function quickSearch(tag) {
  query.value = tag
  handleSearch(tag)
}

// 从 URL 恢复搜索
if (route.query.q) {
  handleSearch(route.query.q)
}
</script>

<style scoped>
.search-page {
  animation: fadeInUp 0.5s ease forwards;
  position: relative;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.search-info {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 24px 0 16px;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

/* 背景海报 */
.search-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius);
  filter: blur(80px) brightness(0.2);
  opacity: 0;
  transition: opacity 0.6s ease;
  z-index: 0;
  pointer-events: none;
}
.search-backdrop.active { opacity: 1; }

.search-empty {
  text-align: center;
  padding: 80px 24px;
}
.search-empty__icon { font-size: 4rem; margin-bottom: 16px; }
.search-empty h2 { font-size: 1.4rem; color: var(--color-text-secondary); margin-bottom: 8px; }
.search-empty p { color: var(--color-text-muted); }

.search-hint {
  text-align: center;
  padding: 60px 24px;
}
.search-hint__title {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}
.search-hint__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.tag-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  transition: all var(--transition);
}
.tag-btn:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

@media (max-width: 640px) {
  .search-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>
