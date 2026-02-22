/**
 * Logger Plugin
 * Logs every action call, its result, and any errors to the console.
 * Only active in development mode.
 */
export function loggerPlugin({ store }) {
  if (import.meta.env.PROD) return

  store.$onAction(({ name, store, args, after, onError }) => {
    const start = Date.now()
    console.log(`%c[${store.$id}] → ${name}`, 'color: #2563eb; font-weight: bold;', args)

    after((result) => {
      console.log(
        `%c[${store.$id}] ✓ ${name} (${Date.now() - start}ms)`,
        'color: #16a34a;',
        result,
      )
    })

    onError((error) => {
      console.error(
        `[${store.$id}] ✗ ${name} (${Date.now() - start}ms)`,
        error,
      )
    })
  })
}
