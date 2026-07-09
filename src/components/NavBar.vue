<template>
  <nav class="navbar">
    <div class="container navbar__inner">
      <router-link to="/" class="navbar__brand">
        <span class="brand-icon">&#127916;</span>
        <span class="brand-text">银幕时光</span>
      </router-link>

      <div class="navbar__links">
        <router-link to="/" class="nav-link" exact-active-class="active">
          首页
        </router-link>
        <router-link to="/movies" class="nav-link" active-class="active">
          电影库
        </router-link>
        <router-link to="/favorites" class="nav-link nav-link--fav" active-class="active">
          <span class="fav-icon">&#9829;</span>
          <span>我的收藏</span>
          <span v-if="favCount > 0" class="fav-badge">{{ favCount }}</span>
        </router-link>
      </div>

      <div class="navbar__actions">
        <router-link to="/search" class="btn-icon" title="搜索">
          &#128269;
        </router-link>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favorite.js'
import ThemeToggle from './ThemeToggle.vue'

const favStore = useFavoriteStore()
const favCount = computed(() => favStore.favorites.length)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition);
}

.light .navbar {
  background: rgba(246, 248, 250, 0.85);
}

.navbar__inner {
  display: flex;
  align-items: center;
  height: 60px;
  gap: 32px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
}
.brand-icon { font-size: 1.4rem; }

.navbar__links {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-link {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg-card-hover);
}
.nav-link.active {
  color: var(--color-primary);
  background: var(--color-bg-card);
}

.nav-link--fav .fav-icon {
  font-size: 0.8rem;
  color: var(--color-danger);
}

.fav-badge {
  background: var(--color-primary);
  color: #fff;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 640px) {
  .navbar__links {
    display: none;
  }
}
</style>
