<template>
  <div class="detail-page" v-if="movie">
    <!-- 头部背景 -->
    <div class="detail-hero">
      <div
        class="detail-hero__backdrop"
        :style="{ backgroundImage: `url(${movie.backdrop || movie.poster})` }"
      ></div>
      <div class="container detail-hero__content">
        <div class="detail-poster">
          <img :src="movie.poster" :alt="movie.title" />
        </div>
        <div class="detail-meta">
          <h1 class="detail-title">{{ movie.title }}</h1>
          <p class="detail-original">原名: {{ movie.originalTitle }}</p>
          <div class="detail-tags">
            <span class="tag">{{ getRegionLabel(movie.region) }}</span>
            <span class="tag" v-for="g in movie.genres" :key="g">{{ g }}</span>
            <span class="tag">{{ movie.year }}</span>
            <span class="tag">{{ formatRuntime(movie.runtime) }}</span>
          </div>
          <div class="detail-rating">
            <span class="detail-rating__star">&#9733;</span>
            <span class="detail-rating__score">{{ formatRating(movie.rating) }}</span>
          </div>
          <p class="detail-summary">{{ movie.summary }}</p>

          <div class="detail-crew">
            <p><strong>导演:</strong> {{ movie.director }}</p>
            <p><strong>主演:</strong> {{ movie.cast.join(' / ') }}</p>
          </div>

          <div class="detail-actions">
            <router-link :to="`/play/${movie.id}`" class="btn btn-primary" style="font-size:1rem;padding:12px 28px">
              &#9654; 立即播放
            </router-link>
            <button
              class="btn btn-secondary"
              :class="{ 'btn-secondary': isFav }"
              @click="favStore.toggleFavorite(movie)"
            >
              <span v-if="isFav">&#9829; 已收藏</span>
              <span v-else>&#9825; 加入收藏</span>
            </button>
            <button class="btn btn-secondary" @click="$router.back()">
              返回
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户评分 & 评论区域 -->
    <div class="container detail-extra">
      <!-- 评分 -->
      <section class="detail-section">
        <h2>我的评分</h2>
        <div class="star-rating">
          <span
            v-for="s in 5"
            :key="s"
            class="star"
            :class="{ filled: s <= userRating }"
            @click="rateMovie(s)"
          >
            &#9733;
          </span>
          <span class="rating-hint" v-if="userRating > 0">
            {{ userRating }} / 5
          </span>
        </div>
      </section>

      <!-- 评论 -->
      <section class="detail-section">
        <h2>我的短评</h2>
        <div class="comment-form">
          <textarea
            v-model="commentText"
            class="comment-input"
            placeholder="写下你对这部电影的看法..."
            rows="3"
            maxlength="500"
          ></textarea>
          <button
            class="btn btn-primary comment-btn"
            :disabled="!commentText.trim()"
            @click="submitComment"
          >
            发布评论
          </button>
        </div>

        <div v-if="movieComments.length > 0" class="comment-list">
          <div v-for="(c, i) in movieComments" :key="i" class="comment-item">
            <p class="comment-item__text">{{ c.text }}</p>
            <span class="comment-item__date">{{ formatDate(c.date) }}</span>
          </div>
        </div>
        <div v-else class="comment-empty">暂无评论</div>
      </section>

      <!-- 相似推荐 -->
      <section class="detail-section" v-if="similarMovies.length > 0">
        <h2>你可能也喜欢</h2>
        <div class="similar-grid">
          <div
            v-for="m in similarMovies"
            :key="m.id"
            class="similar-item"
            @click="$router.push(`/play/${m.id}`)"
          >
            <img :src="m.poster" :alt="m.title" loading="lazy" />
            <p class="similar-item__title">{{ m.title }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- 未找到 -->
  <div v-else-if="notFound" class="not-found container">
    <p class="not-found__icon">&#128533;</p>
    <h2>电影未找到</h2>
    <router-link to="/" class="btn btn-primary">返回首页</router-link>
  </div>

  <!-- 加载中 -->
  <div v-else class="container">
    <div class="detail-skeleton">
      <div class="skeleton" style="width:300px;height:450px"></div>
      <div>  <div class="skeleton" style="width:400px;height:36px;margin-bottom:16px"></div>
        <div class="skeleton" style="width:250px;height:20px;margin-bottom:8px"></div>
        <div class="skeleton" style="width:100%;height:100px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoriteStore } from '@/stores/favorite.js'
import { useUserStore } from '@/stores/user.js'
import { fetchMovieById, fetchSimilarMovies } from '@/api/index.js'
import { formatRating, formatDate, formatRuntime } from '@/utils/format.js'

const route = useRoute()
const favStore = useFavoriteStore()
const userStore = useUserStore()

const movie = ref(null)
const notFound = ref(false)
const similarMovies = ref([])

const userRating = computed(() => userStore.getRating(Number(route.params.id)))
const movieComments = computed(() => userStore.getComments(Number(route.params.id)))
const isFav = computed(() => movie.value && favStore.isFavorite(movie.value.id))

const commentText = ref('')

async function loadMovie() {
  const id = Number(route.params.id)
  movie.value = null
  notFound.value = false

  const data = await fetchMovieById(id)
  if (data) {
    movie.value = data
    // 通过 TMDB 获取相似电影推荐
    similarMovies.value = await fetchSimilarMovies(id, 6)
  } else {
    notFound.value = true
  }
}

function rateMovie(star) {
  userStore.setRating(Number(route.params.id), star)
}

function submitComment() {
  if (!commentText.value.trim()) return
  userStore.addComment(Number(route.params.id), commentText.value.trim())
  commentText.value = ''
}

function getRegionLabel(region) {
  const map = { china: '华语', america: '欧美', japan: '日本', korea: '韩国', other: '其他' }
  return map[region] || region
}

onMounted(loadMovie)
watch(() => route.params.id, loadMovie)
</script>

<style scoped>
.detail-page {
  animation: fadeInUp 0.5s ease forwards;
  margin-top: -32px;
}

/* Hero区域 */
.detail-hero {
  position: relative;
  padding: 48px 0;
  margin-bottom: 40px;
}

.detail-hero__backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 20%;
  filter: blur(40px) brightness(0.2);
  transform: scale(1.05);
}

.detail-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.detail-poster {
  flex-shrink: 0;
  width: 300px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card-hover);
}
.detail-poster img {
  width: 100%;
}

.detail-meta {
  flex: 1;
  padding-top: 8px;
}

.detail-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}

.detail-original {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.detail-tags .tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
}

.detail-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: var(--color-star);
}
.detail-rating__score {
  font-size: 2rem;
  font-weight: 700;
}

.detail-summary {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  margin-bottom: 20px;
  max-width: 600px;
}

.detail-crew {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.8;
  margin-bottom: 24px;
}
.detail-crew strong {
  color: rgba(255, 255, 255, 0.8);
}

.detail-actions {
  display: flex;
  gap: 12px;
}

/* 评分评论区域 */
.detail-extra {
  display: grid;
  gap: 36px;
  max-width: 800px;
  margin-top: 0;
}

.detail-section h2 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--color-text);
}

.rating-hint {
  margin-left: 8px;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.95rem;
  resize: vertical;
  font-family: inherit;
}
.comment-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(247, 129, 102, 0.15);
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-item {
  background: var(--color-bg-card);
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}
.comment-item__text {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 6px;
}
.comment-item__date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.comment-empty {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  padding: 20px 0;
}

/* 相似推荐 */
.similar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}
.similar-item {
  cursor: pointer;
  transition: transform var(--transition);
}
.similar-item:hover {
  transform: scale(1.05);
}
.similar-item img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
}
.similar-item__title {
  font-size: 0.85rem;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

/* 404 */
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

/* 详情骨架屏 */
.detail-skeleton {
  display: flex;
  gap: 40px;
  padding: 40px 0;
}

@media (max-width: 768px) {
  .detail-hero__content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .detail-poster {
    width: 200px;
  }
  .detail-title {
    font-size: 1.6rem;
  }
  .detail-summary {
    text-align: left;
  }
  .detail-actions {
    justify-content: center;
  }
}
</style>
