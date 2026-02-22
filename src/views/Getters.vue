<template>
  <div>
    <div class="page-title">Getters</div>
    <div class="page-desc">
      Computed properties on a store. Cached and reactive — re-evaluate only when their dependencies change.
    </div>

    <div class="code-block">
      <div class="code-label">src/stores/cart.js — getter patterns</div>
      <pre class="code"><span class="fn">defineStore</span>(<span class="str">'cart'</span>, {
  state: () => ({ items: [] }),
  getters: {
    <span class="cm">// 1. Simple getter</span>
    itemCount: (state) => state.items.length,

    <span class="cm">// 2. Getter using another getter via `this`</span>
    isEmpty() { <span class="kw">return this</span>.itemCount === <span class="num">0</span> },

    <span class="cm">// 3. Getter that accepts arguments (returns a function)</span>
    getById: (state) => (id) => state.items.<span class="fn">find</span>(i => i.id === id),

    <span class="cm">// 4. Derived computation</span>
    total: (state) => state.items.<span class="fn">reduce</span>((s, i) => s + i.price * i.qty, <span class="num">0</span>),
  }
})</pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo — Shopping Cart</div>
      <div class="card-body">
        <div class="col3" style="margin-bottom: 16px">
          <div class="stat">
            <div class="stat-val">{{ cart.itemCount }}</div>
            <div class="stat-lbl">itemCount</div>
          </div>
          <div class="stat">
            <div class="stat-val">${{ cart.total.toFixed(2) }}</div>
            <div class="stat-lbl">total</div>
          </div>
          <div class="stat">
            <div class="stat-val" :style="{ color: cart.isEmpty ? 'var(--muted)' : 'var(--green)' }">
              {{ cart.isEmpty ? '—' : 'Active' }}
            </div>
            <div class="stat-lbl">isEmpty</div>
          </div>
        </div>

        <div v-if="cart.items.length">
          <div class="list-row" v-for="item in cart.items" :key="item.id">
            <span style="flex:1;font-weight:500">{{ item.name }}</span>
            <span class="mono" style="color:var(--muted)">${{ item.price.toFixed(2) }} × {{ item.qty }}</span>
            <span class="badge badge-blue">${{ (item.price * item.qty).toFixed(2) }}</span>
            <button class="btn btn-default btn-sm" @click="cart.removeItem(item.id)">Remove</button>
          </div>
        </div>
        <div v-else style="color:var(--muted);font-size:13px;padding:6px 0">Cart is empty.</div>

        <div class="divider"></div>
        <div class="row">
          <button class="btn btn-primary btn-sm" @click="cart.addRandom()">+ Add Random Item</button>
          <span class="badge" :class="cart.getById(1) ? 'badge-green' : 'badge-gray'">
            getById(1): {{ cart.getById(1) ? cart.getById(1).name : 'not found' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>
