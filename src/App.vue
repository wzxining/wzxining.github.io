<template>
  <div :class="themeStore.themeClass" class="app-root">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <p>银幕时光 &copy; 2026 — 前端框架技术实践作品</p>
    </footer>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.js'
import NavBar from '@/components/NavBar.vue'

const themeStore = useThemeStore()
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 32px 0;
}

.footer {
  text-align: center;
  padding: 24px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
