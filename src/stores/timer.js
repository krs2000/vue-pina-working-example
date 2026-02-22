import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

// Setup Store syntax: ref() = state, computed() = getters, functions = actions
export const useTimerStore = defineStore('timer', () => {
  const seconds = ref(0)
  const running = ref(false)
  let interval  = null

  const formatted = computed(() => {
    const m = Math.floor(seconds.value / 60)
    const s = seconds.value % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  })

  function start() {
    if (running.value) return
    running.value = true
    interval = setInterval(() => seconds.value++, 1000)
  }

  function stop() {
    running.value = false
    clearInterval(interval)
  }

  function reset() {
    stop()
    seconds.value = 0
  }

  return { seconds, running, formatted, start, stop, reset }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
