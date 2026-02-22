import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'World',
  }),

  getters: {
    doubled: (state) => state.count * 2,
  },

  actions: {
    increment() { this.count++ },
    decrement() { this.count-- },
  },
})

// Preserve state across Vite hot reloads
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
