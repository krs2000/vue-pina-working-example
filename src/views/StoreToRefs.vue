<template>
  <div>
    <div class="page-title">storeToRefs & Destructuring</div>
    <div class="page-desc">
      Destructuring a store directly breaks reactivity. Use <code>storeToRefs</code>
      to keep state and getters reactive while destructuring.
    </div>

    <div class="code-block">
      <div class="code-label">Reactive destructuring</div>
      <pre class="code"><span class="kw">import</span> { storeToRefs } <span class="kw">from</span> <span class="str">'pinia'</span>

<span class="kw">const</span> counter = <span class="fn">useCounterStore</span>()

<span class="cm">// ✗ WRONG — loses reactivity</span>
<span class="kw">const</span> { count, name } = counter

<span class="cm">// ✓ CORRECT — stays reactive</span>
<span class="kw">const</span> { count, name } = <span class="fn">storeToRefs</span>(counter)

<span class="cm">// Actions are not refs — destructure directly</span>
<span class="kw">const</span> { increment, reset } = counter</pre>
    </div>

    <div class="code-block">
      <div class="code-label">Options API map helpers</div>
      <pre class="code"><span class="kw">import</span> { mapStores, mapState, mapActions } <span class="kw">from</span> <span class="str">'pinia'</span>

<span class="kw">export default</span> {
  computed: {
    ...<span class="fn">mapStores</span>(useCounterStore, useUserStore), <span class="cm">// → this.counterStore</span>
    ...<span class="fn">mapState</span>(useCounterStore, [<span class="str">'count'</span>, <span class="str">'name'</span>]),
    ...<span class="fn">mapState</span>(useCounterStore, {
      myCount: <span class="str">'count'</span>,
      doubled: state => state.count * <span class="num">2</span>
    }),
  },
  methods: {
    ...<span class="fn">mapActions</span>(useCounterStore, [<span class="str">'increment'</span>, <span class="str">'reset'</span>]),
  }
}</pre>
    </div>

    <div class="card">
      <div class="card-header">Live — Reactive Values via storeToRefs</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Ref name</th>
              <th>Current value</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">count</td>
              <td><strong>{{ count }}</strong></td>
              <td class="mono" style="color:var(--muted)">storeToRefs(counterStore)</td>
            </tr>
            <tr>
              <td class="mono">name</td>
              <td><strong>{{ name }}</strong></td>
              <td class="mono" style="color:var(--muted)">storeToRefs(counterStore)</td>
            </tr>
            <tr>
              <td class="mono">itemCount</td>
              <td><strong>{{ itemCount }}</strong></td>
              <td class="mono" style="color:var(--muted)">storeToRefs(cartStore)</td>
            </tr>
            <tr>
              <td class="mono">total</td>
              <td><strong>${{ total.toFixed(2) }}</strong></td>
              <td class="mono" style="color:var(--muted)">storeToRefs(cartStore)</td>
            </tr>
          </tbody>
        </table>
        <div class="divider"></div>
        <div class="row">
          <button class="btn btn-default btn-sm" @click="increment()">counter.increment()</button>
          <button class="btn btn-default btn-sm" @click="cart.addRandom()">cart.addRandom()</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { useCartStore } from '../stores/cart'

const counterStore = useCounterStore()
const cart         = useCartStore()

// ✓ Reactive state and getters
const { count, name }      = storeToRefs(counterStore)
const { itemCount, total } = storeToRefs(cart)

// Actions destructured directly (not refs)
const { increment } = counterStore
</script>
