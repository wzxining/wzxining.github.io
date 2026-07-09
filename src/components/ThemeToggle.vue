<template>
  <button class="theme-toggle" @click="themeStore.toggleTheme()" :title="themeStore.isDark ? '切换亮色模式' : '切换暗色模式'">
    <span v-if="themeStore.isDark">&#9728;</span>
    <span v-else>&#9790;</span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.js'
const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  color: var(--color-text);
}
.theme-toggle:hover {
  background: var(--color-bg-card-hover);
  transform: rotate(15deg);
}
</style>
