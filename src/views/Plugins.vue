<template>
  <div>
    <div class="page-title">Plugins</div>
    <div class="page-desc">
      Plugins extend every store globally. Registered via <code>pinia.use()</code>
      before mounting the app.
    </div>

    <div class="code-block">
      <div class="code-label">src/plugins/persist.js</div>
      <pre class="code"><span class="kw">export function</span> <span class="fn">persistPlugin</span>({ store }) {
  <span class="cm">// Hydrate on init</span>
  <span class="kw">const</span> key   = <span class="str">`pinia_${store.$id}`</span>
  <span class="kw">const</span> saved = sessionStorage.<span class="fn">getItem</span>(key)
  <span class="kw">if</span> (saved) store.<span class="fn">$patch</span>(JSON.<span class="fn">parse</span>(saved))

  <span class="cm">// Persist on every state change</span>
  store.<span class="fn">$subscribe</span>((_, state) => {
    sessionStorage.<span class="fn">setItem</span>(key, JSON.<span class="fn">stringify</span>(state))
  })
}</pre>
    </div>

    <div class="code-block">
      <div class="code-label">src/plugins/logger.js</div>
      <pre class="code"><span class="kw">export function</span> <span class="fn">loggerPlugin</span>({ store }) {
  store.<span class="fn">$onAction</span>(({ name, args, after, onError }) => {
    console.<span class="fn">log</span>(<span class="str">`[${store.$id}] → ${name}`</span>, args)
    <span class="fn">after</span>  (result => console.<span class="fn">log</span>(<span class="str">'  ✓'</span>, result))
    <span class="fn">onError</span>(error  => console.<span class="fn">error</span>(<span class="str">'  ✗'</span>, error))
  })
}</pre>
    </div>

    <div class="code-block">
      <div class="code-label">src/main.js — register plugins</div>
      <pre class="code"><span class="kw">const</span> pinia = <span class="fn">createPinia</span>()
pinia.<span class="fn">use</span>(persistPlugin)
pinia.<span class="fn">use</span>(loggerPlugin)
app.<span class="fn">use</span>(pinia)</pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo — Persisted Note (sessionStorage)</div>
      <div class="card-body">
        <div class="label">Type below — content auto-saves via plugin</div>
        <textarea v-model="notes.content" rows="4" style="width:100%;resize:vertical"></textarea>
        <div class="row" style="margin-top:10px">
          <span class="badge badge-green">Auto-saved</span>
          <span style="color:var(--muted);font-size:12px;font-family:var(--mono)">{{ notes.content.length }} chars</span>
          <button class="btn btn-default btn-sm" @click="notes.clear()">Clear</button>
        </div>
        <div class="divider"></div>
        <div class="label">sessionStorage snapshot</div>
        <pre class="code" style="font-size:11.5px;border-radius:5px">{{ storagePreview || '(empty)' }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '../stores/notes'

const notes = useNotesStore()

const storagePreview = computed(() => {
  const v = sessionStorage.getItem('pinia_notes') || ''
  return v.length > 80 ? v.slice(0, 80) + '…' : v
})
</script>
