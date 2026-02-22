<template>
  <div>
    <div class="page-title">Setup Store (Composition API)</div>
    <div class="page-desc">
      An alternative to the Options API syntax. Use <code>ref</code> for state,
      <code>computed</code> for getters, and plain functions for actions.
      More flexible and better TypeScript support.
    </div>

    <div class="code-block">
      <div class="code-label">src/stores/timer.js — Setup Store syntax</div>
      <pre class="code"><span class="kw">import</span> { ref, computed } <span class="kw">from</span> <span class="str">'vue'</span>
<span class="kw">import</span> { defineStore } <span class="kw">from</span> <span class="str">'pinia'</span>

<span class="kw">export const</span> <span class="fn">useTimerStore</span> = <span class="fn">defineStore</span>(<span class="str">'timer'</span>, () => {
  <span class="cm">// ref()      → state</span>
  <span class="kw">const</span> seconds = <span class="fn">ref</span>(<span class="num">0</span>)
  <span class="kw">const</span> running = <span class="fn">ref</span>(<span class="kw">false</span>)

  <span class="cm">// computed() → getters</span>
  <span class="kw">const</span> formatted = <span class="fn">computed</span>(() => {
    <span class="kw">const</span> m = Math.<span class="fn">floor</span>(seconds.value / <span class="num">60</span>)
    <span class="kw">const</span> s = seconds.value % <span class="num">60</span>
    <span class="kw">return</span> <span class="str">`${m}:${String(s).padStart(2, '0')}`</span>
  })

  <span class="cm">// functions  → actions</span>
  <span class="kw">let</span> interval
  <span class="kw">function</span> <span class="fn">start</span>() { ... }
  <span class="kw">function</span> <span class="fn">stop</span>()  { ... }
  <span class="kw">function</span> <span class="fn">reset</span>() { <span class="fn">stop</span>(); seconds.value = <span class="num">0</span> }

  <span class="kw">return</span> { seconds, running, formatted, start, stop, reset }
})</pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo — Stopwatch</div>
      <div class="card-body" style="text-align:center;padding:28px">
        <div style="font-size:54px;font-weight:600;font-family:var(--mono);letter-spacing:-.02em">
          {{ timer.formatted }}
        </div>
        <div style="font-size:12px;color:var(--muted);margin:6px 0 20px;font-family:var(--mono)">
          {{ timer.running ? '▶ running' : '■ stopped' }} · {{ timer.seconds }}s
        </div>
        <div class="row" style="justify-content:center">
          <button class="btn btn-success" @click="timer.start()" :disabled="timer.running">Start</button>
          <button class="btn btn-default" @click="timer.stop()"  :disabled="!timer.running">Stop</button>
          <button class="btn btn-default" @click="timer.reset()">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimerStore } from '../stores/timer'
const timer = useTimerStore()
</script>
