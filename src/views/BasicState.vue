<template>
  <div>
    <div class="page-title">Basic State</div>
    <div class="page-desc">
      The simplest Pinia store: <code>defineStore</code> with <code>state</code>,
      direct mutation, and <code>$patch</code>.
    </div>

    <div class="code-block">
      <div class="code-label">src/stores/counter.js</div>
      <pre class="code"><span class="kw">import</span> { defineStore } <span class="kw">from</span> <span class="str">'pinia'</span>

<span class="kw">export const</span> <span class="fn">useCounterStore</span> = <span class="fn">defineStore</span>(<span class="str">'counter'</span>, {
  state: () => ({
    count: <span class="num">0</span>,
    name: <span class="str">'World'</span>,
  }),
  actions: {
    <span class="fn">increment</span>() { <span class="kw">this</span>.count++ },
    <span class="fn">decrement</span>() { <span class="kw">this</span>.count-- },
  }
})</pre>
    </div>

    <div class="code-block">
      <div class="code-label">Component.vue — all mutation methods</div>
      <pre class="code"><span class="kw">const</span> counter = <span class="fn">useCounterStore</span>()

counter.count++                                    <span class="cm">// direct assignment</span>
counter.<span class="fn">$patch</span>({ count: <span class="num">100</span>, name: <span class="str">'Pinia'</span> })       <span class="cm">// patch object</span>
counter.<span class="fn">$patch</span>(state => { state.count += <span class="num">10</span> })    <span class="cm">// patch function</span>
counter.<span class="fn">$reset</span>()                                  <span class="cm">// reset to initial state</span></pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo</div>
      <div class="card-body">
        <div class="row" style="margin-bottom: 16px">
          <button class="btn btn-default btn-sm" @click="counter.decrement()">− Decrement</button>
          <span style="font-size:28px;font-weight:600;min-width:48px;text-align:center">{{ counter.count }}</span>
          <button class="btn btn-primary btn-sm" @click="counter.increment()">+ Increment</button>
          <button class="btn btn-default btn-sm" @click="counter.$patch({ count: 42 })">$patch 42</button>
          <button class="btn btn-default btn-sm" @click="counter.$patch(s => s.count += 10)">$patch fn +10</button>
          <button class="btn btn-danger btn-sm" @click="counter.$reset()">$reset()</button>
        </div>
        <div class="divider"></div>
        <div class="label">Direct v-model on store property</div>
        <div class="row">
          <input type="text" v-model="counter.name" style="width: 200px" />
          <span style="color: var(--muted)">→</span>
          <span style="font-weight: 500">Hello, {{ counter.name }}!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>
