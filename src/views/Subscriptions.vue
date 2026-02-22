<template>
  <div>
    <div class="page-title">$subscribe & $onAction</div>
    <div class="page-desc">
      Listen to state mutations and action calls. Useful for side effects,
      audit logs, and undo/redo systems.
    </div>

    <div class="code-block">
      <div class="code-label">$subscribe — watch state changes</div>
      <pre class="code">store.<span class="fn">$subscribe</span>((mutation, state) => {
  console.<span class="fn">log</span>(mutation.type)    <span class="cm">// 'direct' | 'patch object' | 'patch function'</span>
  console.<span class="fn">log</span>(mutation.storeId) <span class="cm">// 'myStore'</span>
  console.<span class="fn">log</span>(state)            <span class="cm">// full current state snapshot</span>
}, { detached: <span class="kw">true</span> })           <span class="cm">// survives component unmount</span></pre>
    </div>

    <div class="code-block">
      <div class="code-label">$onAction — watch actions</div>
      <pre class="code"><span class="kw">const</span> unsub = store.<span class="fn">$onAction</span>(({ name, args, after, onError }) => {
  <span class="cm">// Runs synchronously BEFORE the action executes</span>

  <span class="fn">after</span>(result => { <span class="cm">/* runs after action resolves */</span> })
  <span class="fn">onError</span>(error => { <span class="cm">/* runs if action throws */</span> })
})

unsub() <span class="cm">// call to remove the listener</span></pre>
    </div>

    <div class="card">
      <div class="card-header">Live Event Log</div>
      <div class="card-body">
        <div class="row" style="margin-bottom:14px">
          <button class="btn btn-primary btn-sm" @click="counter.increment()">increment()</button>
          <button class="btn btn-default btn-sm" @click="counter.decrement()">decrement()</button>
          <button class="btn btn-default btn-sm" @click="counter.$patch({ count: 42 })">$patch object</button>
          <button class="btn btn-default btn-sm" @click="counter.$patch(s => s.count += 5)">$patch fn</button>
          <button class="btn btn-danger  btn-sm" @click="eventLog = []">Clear log</button>
        </div>

        <div style="border:1px solid var(--border);border-radius:5px;overflow:hidden;max-height:260px;overflow-y:auto">
          <table class="table" style="margin:0">
            <thead>
              <tr>
                <th>Type</th>
                <th>Detail</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="eventLog.length === 0">
                <td colspan="3" style="color:var(--muted)">No events yet — trigger actions above.</td>
              </tr>
              <tr v-for="(ev, i) in [...eventLog].reverse()" :key="i">
                <td>
                  <span class="badge" :class="ev.kind === 'action' ? 'badge-blue' : 'badge-green'">
                    {{ ev.kind }}
                  </span>
                </td>
                <td class="mono">{{ ev.msg }}</td>
                <td class="mono" style="color:var(--muted)">{{ ev.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useCounterStore } from '../stores/counter'

const counter  = useCounterStore()
const eventLog = ref([])

const fmt = () => new Date().toLocaleTimeString('en', { hour12: false })

const unsubState = counter.$subscribe((mutation, state) => {
  eventLog.value.push({
    kind: 'state',
    msg:  `type=${mutation.type}  count=${state.count}`,
    time: fmt(),
  })
})

const unsubAction = counter.$onAction(({ name }) => {
  eventLog.value.push({ kind: 'action', msg: `${name}()`, time: fmt() })
})

// Clean up listeners when component is unmounted
onUnmounted(() => {
  unsubState()
  unsubAction()
})
</script>
