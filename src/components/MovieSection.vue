<template>
  <section class="movie-section">
    <div class="section__header">
      <h2 class="section__title">{{ title }}</h2>
      <router-link v-if="moreLink" :to="moreLink" class="section__more">
        查看全部 &#8594;
      </router-link>
    </div>

    <!-- 悬停背景海报 -->
    <div
      class="section__backdrop"
      :class="{ active: !!hoveredPoster }"
      :style="{ backgroundImage: hoveredPoster ? `url(${hoveredPoster})` : 'none' }"
    ></div>

    <div class="section__grid" v-if="!loading">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @hover="onHover"
        @hover-end="onHoverEnd"
      />
    </div>

    <!-- 骨架屏加载 -->
    <div class="section__grid" v-else>
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>

    <div v-if="!loading && movies.length === 0" class="section__empty">
      <p>暂无数据</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
import SkeletonCard from './SkeletonCard.vue'

defineProps({
  title: { type: String, required: true },
  movies: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  moreLink: { type: String, default: '' }
})

const hoveredPoster = ref('')

function onHover(poster) {
  hoveredPoster.value = poster
}
function onHoverEnd() {
  hoveredPoster.value = ''
}
</script>

<style scoped>
.movie-section {
  position: relative;
  margin-bottom: 48px;
}

.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
}

.section__more {
  font-size: 0.85rem;
  color: var(--color-primary);
  transition: all var(--transition);
}
.section__more:hover {
  color: var(--color-primary-hover);
}

.section__backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius);
  filter: blur(80px) brightness(0.25);
  opacity: 0;
  transition: opacity 0.6s ease;
  z-index: 0;
  pointer-events: none;
}
.section__backdrop.active {
  opacity: 1;
}

.section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

.section__empty {
  text-align: center;
  padding: 60px;
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .section__grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>
