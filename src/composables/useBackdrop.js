import { ref, readonly } from 'vue'

const backdropPoster = ref('')
const prevPoster = ref('')

export function useBackdrop() {
  const setBackdrop = (url) => {
    prevPoster.value = backdropPoster.value
    backdropPoster.value = url
  }

  const clearBackdrop = () => {
    prevPoster.value = backdropPoster.value
    backdropPoster.value = ''
  }

  return {
    backdropPoster: readonly(backdropPoster),
    prevPoster: readonly(prevPoster),
    setBackdrop,
    clearBackdrop
  }
}
