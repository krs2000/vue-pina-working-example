import { defineStore, acceptHMRUpdate } from 'pinia'

const PRODUCTS = ['Apple', 'Banana', 'Coffee', 'Desk', 'Earphones', 'Flask', 'Notebook']

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    // 1. Simple getter
    itemCount: (state) => state.items.length,

    // 2. Getter using another getter via `this`
    isEmpty() { return this.itemCount === 0 },

    // 3. Getter that accepts an argument (returns a function)
    getById: (state) => (id) => state.items.find(i => i.id === id),

    // 4. Derived computation
    total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  },

  actions: {
    addRandom() {
      const name = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]
      const existing = this.items.find(i => i.name === name)
      if (existing) {
        existing.qty++
      } else {
        this.items.push({
          id: Date.now(),
          name,
          price: +(Math.random() * 50 + 5).toFixed(2),
          qty: 1,
        })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
