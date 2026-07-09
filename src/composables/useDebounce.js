import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value ?? value)

  watch(
    () => (typeof value === 'object' && 'value' in value ? value.value : value),
    (val) => {
      const timer = setTimeout(() => {
        debouncedValue.value = val
      }, delay)
      return () => clearTimeout(timer)
    }
  )

  return debouncedValue
}
