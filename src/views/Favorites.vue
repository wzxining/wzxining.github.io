<template>
  <div class="favorites-page container">
    <h1 class="page-title">&#9829; 我的收藏</h1>

    <div v-if="favStore.favorites.length > 0">
      <p class="fav-count">共收藏 {{ favStore.favorites.length }} 部电影</p>
      <div class="fav-grid">
        <div
          v-for="movie in favStore.favorites"
          :key="movie.id"
          class="fav-card"
        >
          <div class="fav-card__poster" @click="$router.push(`/play/${movie.id}`)">
            <img :src="movie.poster" :alt="movie.title" loading="lazy" />
            <div class="fav-card__overlay">
              <span>&#9654; 播放</span>
            </div>
          </div>
          <div class="fav-card__info">
            <h3 class="fav-card__title" @click="$router.push(`/play/${movie.id}`)">
              {{ movie.title }}
            </h3>
            <p class="fav-card__meta">
              {{ movie.year }} <span class="dot">&#183;</span> {{ getRegionLabel(movie.region) }}
            </p>
          </div>
          <button
            class="fav-card__remove btn-icon"
            @click="favStore.toggleFavorite(movie)"
            title="取消收藏"
          >
            &#10005;
          </button>
        </div>
      </div>
    </div>

    <div v-else class="fav-empty">
      <p class="fav-empty__icon">&#128064;</p>
      <h2>还没有收藏任何电影</h2>
      <p class="fav-empty__hint">浏览电影库，点击爱心收藏你喜欢的影片</p>
      <router-link to="/movies" class="btn btn-primary">去发现好电影</router-link>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/favorite.js'
const favStore = useFavoriteStore()

function getRegionLabel(region) {
  const map = { china: '华语', america: '欧美', japan: '日本', korea: '韩国', other: '其他' }
  return map[region] || region
}
</script>

<style scoped>
.favorites-page {
  animation: fadeInUp 0.5s ease forwards;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.fav-count {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.fav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.fav-card {
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition);
}
.fav-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.fav-card__poster {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  cursor: pointer;
}
.fav-card__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.fav-card:hover .fav-card__poster img {
  transform: scale(1.08);
}

.fav-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
}
.fav-card__poster:hover .fav-card__overlay {
  opacity: 1;
}

.fav-card__info {
  padding: 12px 14px;
}
.fav-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-text);
}
.fav-card__title:hover {
  color: var(--color-primary);
}
.fav-card__meta {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-top: 4px;
}
.dot {
  margin: 0 4px;
}

.fav-card__remove {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity var(--transition);
  width: 32px;
  height: 32px;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  backdrop-filter: blur(4px);
}
.fav-card:hover .fav-card__remove {
  opacity: 1;
}
.fav-card__remove:hover {
  background: rgba(248, 81, 73, 0.7);
}

/* 空状态 */
.fav-empty {
  text-align: center;
  padding: 80px 24px;
}
.fav-empty__icon {
  font-size: 4rem;
  margin-bottom: 16px;
}
.fav-empty h2 {
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}
.fav-empty__hint {
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

@media (max-width: 640px) {
  .fav-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>
