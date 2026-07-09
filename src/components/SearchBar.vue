<template>
  <div class="search-bar">
    <div class="search-bar__input-wrap">
      <span class="search-bar__icon">&#128269;</span>
      <input
        v-model="query"
        type="text"
        :placeholder="placeholder"
        class="search-bar__input"
        @input="onInput"
        @keyup.enter="onSearch"
      />
      <button v-if="query" class="search-bar__clear" @click="clearSearch">
        &#10005;
      </button>
    </div>
    <button class="btn btn-primary search-bar__btn" @click="onSearch">
      搜索
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '搜索电影名称、导演、演员...' },
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['search', 'update:modelValue'])
const query = ref(props.modelValue)

let timer = null
function onInput() {
  emit('update:modelValue', query.value)
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('search', query.value)
  }, 400)
}

function onSearch() {
  clearTimeout(timer)
  emit('search', query.value)
}

function clearSearch() {
  query.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  max-width: 640px;
  width: 100%;
}

.search-bar__input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar__icon {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  height: 46px;
  padding: 0 40px 0 42px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.95rem;
  transition: all var(--transition);
}
.search-bar__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(247, 129, 102, 0.15);
}

.search-bar__clear {
  position: absolute;
  right: 10px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-bg-card-hover);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}
.search-bar__clear:hover {
  background: var(--color-border);
  color: var(--color-text);
}

.search-bar__btn {
  height: 46px;
  white-space: nowrap;
}
</style>
