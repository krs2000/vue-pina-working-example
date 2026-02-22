<template>
  <div>
    <div class="page-title">HMR, DevTools & Testing</div>
    <div class="page-desc">
      Pinia ships with Vue DevTools integration, Vite HMR support,
      and a dedicated <code>@pinia/testing</code> package.
    </div>

    <div class="section-divider">Hot Module Replacement</div>

    <div class="code-block">
      <div class="code-label">Add to the bottom of any store file</div>
      <pre class="code"><span class="kw">import</span> { acceptHMRUpdate } <span class="kw">from</span> <span class="str">'pinia'</span>

<span class="kw">if</span> (import.meta.hot) {
  import.meta.hot.<span class="fn">accept</span>(<span class="fn">acceptHMRUpdate</span>(useCounterStore, import.meta.hot))
}
<span class="cm">// State is preserved across hot reloads — no full page refresh needed</span></pre>
    </div>

    <div class="section-divider">Unit Testing</div>

    <div class="code-block">
      <div class="code-label">counter.spec.ts — Vitest / Jest</div>
      <pre class="code"><span class="kw">import</span> { setActivePinia, createTestingPinia } <span class="kw">from</span> <span class="str">'@pinia/testing'</span>
<span class="kw">import</span> { <span class="fn">useCounterStore</span> } <span class="kw">from</span> <span class="str">'./stores/counter'</span>

<span class="fn">beforeEach</span>(() => {
  <span class="fn">setActivePinia</span>(<span class="fn">createTestingPinia</span>({
    stubActions: <span class="kw">false</span>,
    initialState: { counter: { count: <span class="num">5</span> } }
  }))
})

<span class="fn">it</span>(<span class="str">'increments the count'</span>, () => {
  <span class="kw">const</span> store = <span class="fn">useCounterStore</span>()
  store.<span class="fn">increment</span>()
  expect(store.count).<span class="fn">toBe</span>(<span class="num">6</span>)
})

<span class="fn">it</span>(<span class="str">'tracks stubbed action calls'</span>, () => {
  <span class="fn">setActivePinia</span>(<span class="fn">createTestingPinia</span>({ stubActions: <span class="kw">true</span> }))
  <span class="kw">const</span> store = <span class="fn">useCounterStore</span>()
  store.<span class="fn">increment</span>()
  expect(store.increment).<span class="fn">toHaveBeenCalledOnce</span>()
})</pre>
    </div>

    <div class="section-divider">Outside Components</div>

    <div class="code-block">
      <div class="code-label">src/router/index.js — pass pinia instance explicitly</div>
      <pre class="code">router.<span class="fn">beforeEach</span>((to) => {
  <span class="cm">// Pass pinia when calling a store outside setup()</span>
  <span class="kw">const</span> auth = <span class="fn">useAuthStore</span>(pinia)
  <span class="kw">if</span> (to.meta.requiresAuth && !auth.isLoggedIn) {
    <span class="kw">return</span> { name: <span class="str">'login'</span> }
  }
})</pre>
    </div>

    <div class="card">
      <div class="card-header">$reset() Demo</div>
      <div class="card-body">
        <div class="row">
          <span style="font-size:13px">count: <strong>{{ counter.count }}</strong></span>
          <button class="btn btn-default btn-sm" @click="counter.count = 999">Set to 999</button>
          <button class="btn btn-primary btn-sm" @click="counter.$reset()">$reset()</button>
        </div>
        <div style="margin-top:10px;font-size:12px;color:var(--muted)">
          Note: <code>$reset()</code> is built-in for Options API stores.
          Setup stores must export their own reset function.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>
