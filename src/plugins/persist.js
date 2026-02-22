/**
 * Persist Plugin
 * Hydrates store state from sessionStorage on init,
 * and saves it back on every state change.
 *
 * Opt-in: only stores with `persist: true` in their state are persisted.
 * For a simpler "persist all" variant, remove the guard below.
 */
export function persistPlugin({ store }) {
  const key   = `pinia_${store.$id}`
  const saved = sessionStorage.getItem(key)

  // Hydrate on init
  if (saved) {
    try {
      store.$patch(JSON.parse(saved))
    } catch (e) {
      console.warn(`[persistPlugin] Could not restore store "${store.$id}":`, e)
    }
  }

  // Persist on every mutation
  store.$subscribe((_, state) => {
    sessionStorage.setItem(key, JSON.stringify(state))
  })
}
