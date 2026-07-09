<template>
  <div class="play-page" v-if="movie">
    <!-- 播放器区域 -->
    <div class="player-container">
      <div class="player-wrapper">
        <!-- YouTube 预告片嵌入 -->
        <iframe
          v-if="movie.trailerUrl"
          class="player-video"
          :src="`${movie.trailerUrl}?autoplay=1&mute=0&rel=0`"
          title="电影播放器"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <!-- 无预告片时的模拟播放器 -->
        <div v-else class="player-fallback">
          <div class="player-fallback__bg" :style="{ backgroundImage: `url(${movie.backdrop || movie.poster})` }"></div>
          <div class="player-fallback__overlay">
            <div class="play-icon">&#9654;</div>
            <p>{{ movie.title }}</p>
          </div>
        </div>

        <!-- 播放器遮罩控件 -->
        <div class="player-controls-bar">
          <div class="controls-left">
            <button class="ctrl-btn" @click="togglePlay" title="播放/暂停">
              {{ isPlaying ? '&#10074;&#10074;' : '&#9654;' }}
            </button>
            <button class="ctrl-btn" title="下一集">&#9193;</button>
            <span class="volume-icon">&#128266;</span>
          </div>
          <div class="controls-right">
            <span class="quality-badge">预告片</span>
            <button class="ctrl-btn" title="全屏" @click="goFullscreen">&#9974;</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 电影信息区域 -->
    <div class="play-info container">
      <div class="play-info__main">
        <div class="play-info__header">
          <div>
            <h1 class="play-info__title">{{ movie.title }}</h1>
            <p class="play-info__subtitle">{{ movie.originalTitle }}</p>
          </div>
          <div class="play-info__actions">
            <button
              class="btn btn-primary"
              :class="{ 'btn-secondary': isFav }"
              @click="favStore.toggleFavorite(movie)"
            >
              <span v-if="isFav">&#9829; 已收藏</span>
              <span v-else>&#9825; 收藏</span>
            </button>
            <button class="btn btn-secondary" @click="$router.push(`/movie/${movie.id}`)">
              影片详情
            </button>
          </div>
        </div>

        <div class="play-info__meta">
          <span class="tag">{{ getRegionLabel(movie.region) }}</span>
          <span class="tag" v-for="g in movie.genres" :key="g">{{ g }}</span>
          <span class="tag">{{ movie.year }}</span>
          <span class="tag">{{ formatRuntime(movie.runtime) }}</span>
          <span class="meta-rating">&#9733; {{ formatRating(movie.rating) }}</span>
        </div>

        <p class="play-info__summary">{{ movie.summary }}</p>

        <div class="play-info__crew">
          <span>导演: <strong>{{ movie.director }}</strong></span>
          <span class="dot">&#183;</span>
          <span>主演: <strong>{{ movie.cast.slice(0, 3).join(' / ') }}</strong></span>
        </div>
      </div>

      <!-- 侧边推荐 -->
      <div class="play-info__sidebar">
        <h3>相关推荐</h3>
        <div class="sidebar-list">
          <div
            v-for="m in relatedMovies"
            :key="m.id"
            class="sidebar-item"
            @click="$router.push(`/play/${m.id}`)"
          >
            <img :src="m.poster" :alt="m.title" loading="lazy" />
            <div class="sidebar-item__info">
              <p class="sidebar-item__title">{{ m.title }}</p>
              <p class="sidebar-item__meta">
                &#9733; {{ formatRating(m.rating) }} &#183; {{ m.year }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 未找到 -->
  <div v-else-if="notFound" class="not-found container">
    <p class="not-found__icon">&#128533;</p>
    <h2>影片未找到</h2>
    <router-link to="/" class="btn btn-primary">返回首页</router-link>
  </div>

  <!-- 加载中 -->
  <div v-else class="container play-loading">
    <div class="play-skeleton">
      <div class="skeleton" style="width:100%;aspect-ratio:16/9;border-radius:var(--radius)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoriteStore } from '@/stores/favorite.js'
import { fetchMovieById } from '@/api/index.js'
import { mockMovies } from '@/mock/movies.js'
import { formatRating, formatRuntime } from '@/utils/format.js'

const route = useRoute()
const favStore = useFavoriteStore()

const movie = ref(null)
const notFound = ref(false)
const isPlaying = ref(true)

const isFav = computed(() => movie.value && favStore.isFavorite(movie.value.id))

const relatedMovies = computed(() => {
  if (!movie.value) return []
  return mockMovies
    .filter(m => m.id !== movie.value.id && m.genres.some(g => movie.value.genres.includes(g)))
    .slice(0, 5)
})

function togglePlay() {
  isPlaying.value = !isPlaying.value
}

function goFullscreen() {
  const iframe = document.querySelector('.player-video')
  if (iframe) {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen()
    }
  }
}

function getRegionLabel(region) {
  const map = { china: '华语', america: '欧美', japan: '日本', korea: '韩国', other: '其他' }
  return map[region] || region
}

async function loadMovie() {
  const id = Number(route.params.id)
  movie.value = null
  notFound.value = false
  const data = await fetchMovieById(id)
  if (data) {
    movie.value = data
  } else {
    notFound.value = true
  }
}

onMounted(loadMovie)
watch(() => route.params.id, loadMovie)
</script>

<style scoped>
.play-page {
  margin-top: -32px;
  animation: fadeInUp 0.5s ease forwards;
}

/* 播放器 */
.player-container {
  width: 100%;
  background: #000;
}

.player-wrapper {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.player-video {
  width: 100%;
  height: 100%;
  border: none;
}

/* 无预告片时的模拟播放器 */
.player-fallback {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.player-fallback__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5) blur(4px);
  transform: scale(1.05);
}

.player-fallback__overlay {
  position: relative;
  text-align: center;
  color: #fff;
  z-index: 1;
}

.player-fallback__overlay .play-icon {
  font-size: 4rem;
  width: 90px;
  height: 90px;
  border: 3px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  cursor: pointer;
  transition: all var(--transition);
}

.player-fallback__overlay .play-icon:hover {
  border-color: #fff;
  background: rgba(255,255,255,0.1);
}

.player-fallback__overlay p {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* 播放器底部控件 */
.player-controls-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  opacity: 0;
  transition: opacity 0.3s;
}

.player-wrapper:hover .player-controls-bar {
  opacity: 1;
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.ctrl-btn:hover {
  background: rgba(255,255,255,0.15);
}

.volume-icon {
  font-size: 1.1rem;
  opacity: 0.8;
}

.quality-badge {
  font-size: 0.8rem;
  color: #fff;
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 4px;
  margin-right: 4px;
}

/* 电影信息 */
.play-info {
  display: flex;
  gap: 36px;
  padding-top: 28px;
  padding-bottom: 48px;
}

.play-info__main {
  flex: 1;
  min-width: 0;
}

.play-info__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.play-info__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text);
}

.play-info__subtitle {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.play-info__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.play-info__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.meta-rating {
  font-size: 1rem;
  color: var(--color-star);
  font-weight: 600;
  margin-left: 4px;
}

.play-info__summary {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.play-info__crew {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.play-info__crew strong {
  color: var(--color-text-secondary);
}

.dot {
  color: var(--color-text-muted);
}

/* 侧边栏 */
.play-info__sidebar {
  width: 280px;
  flex-shrink: 0;
}

.play-info__sidebar h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-item {
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);
}

.sidebar-item:hover {
  background: var(--color-bg-card-hover);
}

.sidebar-item img {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.sidebar-item__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-item__title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}

.sidebar-item__meta {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* 404 & 加载 */
.not-found {
  text-align: center;
  padding: 100px 24px;
}

.not-found__icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.not-found h2 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--color-text-secondary);
}

.play-loading {
  padding: 40px 0;
}

.play-skeleton {
  width: 100%;
}

@media (max-width: 900px) {
  .play-info {
    flex-direction: column;
  }

  .play-info__sidebar {
    width: 100%;
  }

  .sidebar-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 8px;
  }
}
</style>
