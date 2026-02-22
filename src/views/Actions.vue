<template>
  <div>
    <div class="page-title">Actions</div>
    <div class="page-desc">
      Actions can be synchronous or asynchronous. They use <code>this</code>
      to access state and call other actions.
    </div>

    <div class="code-block">
      <div class="code-label">src/stores/user.js — async action pattern</div>
      <pre class="code"><span class="fn">defineStore</span>(<span class="str">'user'</span>, {
  state: () => ({ data: <span class="kw">null</span>, loading: <span class="kw">false</span>, error: <span class="kw">null</span> }),
  actions: {
    <span class="kw">async</span> <span class="fn">fetchUser</span>(id) {
      <span class="kw">this</span>.loading = <span class="kw">true</span>
      <span class="kw">this</span>.error   = <span class="kw">null</span>
      <span class="kw">try</span> {
        <span class="kw">const</span> res  = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">`/api/users/${id}`</span>)
        <span class="kw">this</span>.data  = <span class="kw">await</span> res.<span class="fn">json</span>()
      } <span class="kw">catch</span> (e) {
        <span class="kw">this</span>.error = e.message
      } <span class="kw">finally</span> {
        <span class="kw">this</span>.loading = <span class="kw">false</span>
      }
    },
    <span class="cm">// Action calling another action</span>
    <span class="kw">async</span> <span class="fn">reload</span>() { <span class="kw">await this</span>.<span class="fn">fetchUser</span>(<span class="kw">this</span>.data?.id) }
  }
})</pre>
    </div>

    <div class="card">
      <div class="card-header">Live Demo — Simulated API Call</div>
      <div class="card-body">
        <div class="row">
          <button class="btn btn-primary" @click="user.fetchSimulated(true)" :disabled="user.loading">
            {{ user.loading ? 'Loading…' : 'Fetch User (success)' }}
          </button>
          <button class="btn btn-danger" @click="user.fetchSimulated(false)" :disabled="user.loading">
            Fetch (error)
          </button>
          <button class="btn btn-default" @click="user.$reset()">$reset()</button>
        </div>
        <div v-if="user.loading" class="alert alert-info">Fetching user data…</div>
        <div v-if="user.error"   class="alert alert-error">{{ user.error }}</div>
        <div v-if="user.data && !user.loading" class="alert alert-success">
          Loaded: <strong>{{ user.data.name }}</strong> — {{ user.data.email }}
          &nbsp;<span class="badge badge-blue">{{ user.data.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
const user = useUserStore()
</script>
