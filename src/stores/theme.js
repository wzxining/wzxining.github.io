import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  const themeClass = computed(() => isDark.value ? 'dark' : 'light')

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, themeClass, toggleTheme }
}, {
  persist: true
})
