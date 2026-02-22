import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Async action with loading/error pattern
    async fetchUser(id) {
      this.loading = true
      this.error   = null
      try {
        const res  = await fetch(`/api/users/${id}`)
        this.data  = await res.json()
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    // Simulated version for demo purposes
    async fetchSimulated(succeed) {
      this.loading = true
      this.error   = null
      this.data    = null
      await new Promise(r => setTimeout(r, 700))
      if (succeed) {
        this.data = { id: 1, name: 'Ada Lovelace', email: 'ada@pinia.dev', role: 'admin' }
      } else {
        this.error = 'Network timeout — could not reach server.'
      }
      this.loading = false
    },

    // Action calling another action
    async reload() {
      await this.fetchSimulated(true)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
