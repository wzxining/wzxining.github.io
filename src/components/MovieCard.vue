<template>
  <div
    class="movie-card"
    @click="goToPlay"
    @mouseenter="$emit('hover', movie.poster || movie.backdrop)"
    @mouseleave="$emit('hover-end')"
  >
    <div class="movie-card__poster">
      <img
        :src="movie.poster"
        :alt="movie.title"
        loading="lazy"
      />
      <div class="movie-card__overlay">
        <span class="movie-card__play-icon">&#9654;</span>
      </div>
      <div class="movie-card__rating" v-if="movie.rating">
        <span class="star-icon">&#9733;</span>
        {{ movie.rating }}
      </div>
    </div>
    <div class="movie-card__info">
      <h3 class="movie-card__title">{{ movie.title }}</h3>
      <p class="movie-card__meta">
        <span>{{ movie.year }}</span>
        <span class="dot">&#183;</span>
        <span>{{ movie.genres?.slice(0, 2).join(' / ') }}</span>
      </p>
    </div>
    <button
      class="movie-card__favorite"
      :class="{ favorited: isFav }"
      @click.stop="handleFavorite"
      :title="isFav ? '取消收藏' : '添加收藏'"
    >
      {{ isFav ? '&#9829;' : '&#9825;' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/stores/favorite.js'

const props = defineProps({
  movie: { type: Object, required: true }
})

defineEmits(['hover', 'hover-end'])

const router = useRouter()
const favStore = useFavoriteStore()
const isFav = computed(() => favStore.isFavorite(props.movie.id))

function goToPlay() {
  router.push(`/play/${props.movie.id}`)
}

function handleFavorite() {
  favStore.toggleFavorite(props.movie)
}
</script>

<style scoped>
.movie-card {
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow var(--transition);
  box-shadow: var(--shadow-card);
}

.movie-card:hover {
  transform: scale(1.06);
  box-shadow: var(--shadow-card-hover);
  z-index: 10;
}

.movie-card__poster {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.movie-card__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .movie-card__poster img {
  transform: scale(1.1);
}

.movie-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}
.movie-card:hover .movie-card__overlay {
  background: rgba(0, 0, 0, 0.35);
}
.movie-card__play-icon {
  font-size: 2.5rem;
  color: #fff;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}
.movie-card:hover .movie-card__play-icon {
  opacity: 1;
  transform: scale(1);
}

.movie-card__rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-star);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}
.star-icon {
  margin-right: 3px;
  font-size: 0.75rem;
}

.movie-card__info {
  padding: 14px 16px;
}

.movie-card__title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
  color: var(--color-text);
}

.movie-card__meta {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}
.dot {
  color: var(--color-text-muted);
}

.movie-card__favorite {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: all var(--transition);
  opacity: 0;
  transform: scale(0.8);
}
.movie-card:hover .movie-card__favorite {
  opacity: 1;
  transform: scale(1);
}
.movie-card__favorite:hover {
  background: rgba(248, 81, 73, 0.8);
}
.movie-card__favorite.favorited {
  opacity: 1;
  color: var(--color-danger);
  background: rgba(248, 81, 73, 0.5);
}
</style>
