<template>
  <div>
    <div class="page-title">Store Composition</div>
    <div class="page-desc">
      Stores can import and use other stores inside their actions,
      creating a reactive dependency graph.
    </div>

    <div class="code-block">
      <div class="code-label">src/stores/order.js — cross-store usage</div>
      <pre class="code"><span class="kw">import</span> { <span class="fn">useCartStore</span> } <span class="kw">from</span> <span class="str">'./cart'</span>
<span class="kw">import</span> { <span class="fn">useUserStore</span> } <span class="kw">from</span> <span class="str">'./user'</span>

<span class="kw">export const</span> <span class="fn">useOrderStore</span> = <span class="fn">defineStore</span>(<span class="str">'order'</span>, {
  actions: {
    <span class="kw">async</span> <span class="fn">checkout</span>() {
      <span class="cm">// Call other stores inside an action</span>
      <span class="kw">const</span> cart = <span class="fn">useCartStore</span>()
      <span class="kw">const</span> user = <span class="fn">useUserStore</span>()

      <span class="kw">if</span> (cart.isEmpty) <span class="kw">throw new</span> Error(<span class="str">'Cart is empty'</span>)

      <span class="kw">await</span> <span class="fn">submitOrder</span>({ userId: user.data.id, items: cart.items })
      cart.<span class="fn">clear</span>()  <span class="cm">// mutate another store</span>
    }
  }
})</pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo — Cross-Store Checkout</div>
      <div class="card-body">
        <div class="col2" style="margin-bottom:16px">
          <div class="stat">
            <div class="stat-val">{{ cart.itemCount }}</div>
            <div class="stat-lbl">cart.itemCount</div>
            <div class="progress">
              <div class="progress-fill" :style="{ width: Math.min(cart.itemCount * 20, 100) + '%' }"></div>
            </div>
          </div>
          <div class="stat">
            <div class="stat-val" style="font-size:16px;padding-top:6px">{{ user.data?.name || 'Guest' }}</div>
            <div class="stat-lbl">user.data.name</div>
          </div>
        </div>

        <div class="row">
          <button class="btn btn-primary" @click="doCheckout">Checkout</button>
          <button class="btn btn-default btn-sm" @click="cart.addRandom()">+ Cart Item</button>
          <button class="btn btn-default btn-sm" @click="user.fetchSimulated(true)">Load User</button>
        </div>

        <div v-if="checkoutMsg" class="alert" :class="checkoutMsg.ok ? 'alert-success' : 'alert-error'">
          {{ checkoutMsg.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const cart = useCartStore()
const user = useUserStore()

const checkoutMsg = ref(null)

async function doCheckout() {
  checkoutMsg.value = null
  if (cart.isEmpty) {
    checkoutMsg.value = { ok: false, text: 'Cart is empty — add items first.' }
    return
  }
  if (!user.data) {
    checkoutMsg.value = { ok: false, text: 'No user loaded — click "Load User" first.' }
    return
  }
  await new Promise(r => setTimeout(r, 500))
  checkoutMsg.value = {
    ok: true,
    text: `Order placed for ${user.data.name} — ${cart.itemCount} item(s), $${cart.total.toFixed(2)}.`,
  }
  cart.clear()
}
</script>
