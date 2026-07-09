<template>
  <div class="movie-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="movie-tabs__tab"
      :class="{ active: active === tab.key }"
      @click="$emit('change', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true },
  active: { type: String, required: true }
})
defineEmits(['change'])
</script>

<style scoped>
.movie-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.movie-tabs__tab {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: all var(--transition);
  white-space: nowrap;
}
.movie-tabs__tab:hover {
  color: var(--color-text);
  background: var(--color-bg-card-hover);
}
.movie-tabs__tab.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
</style>
