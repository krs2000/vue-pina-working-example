import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    content: sessionStorage.getItem('pinia_notes') || '',
  }),

  actions: {
    clear() {
      this.content = ''
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
