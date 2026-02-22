<template>
  <aside>
    <div class="nav-group-label">Patterns</div>
    <RouterLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      active-class="active"
    >
      <span class="nav-num">{{ item.n }}</span>
      {{ item.label }}
    </RouterLink>
  </aside>
</template>

<script setup>
const navItems = [
  { path: '/basic-state',   n: '01', label: 'Basic State' },
  { path: '/getters',       n: '02', label: 'Getters' },
  { path: '/actions',       n: '03', label: 'Actions' },
  { path: '/setup-store',   n: '04', label: 'Setup Store' },
  { path: '/plugins',       n: '05', label: 'Plugins' },
  { path: '/subscriptions', n: '06', label: '$subscribe' },
  { path: '/composition',   n: '07', label: 'Composition' },
  { path: '/store-to-refs', n: '08', label: 'storeToRefs' },
  { path: '/testing',       n: '09', label: 'HMR & Testing' },
]
</script>

<style scoped>
aside {
  border-right: 1px solid var(--border);
  padding: 16px 0;
  position: sticky;
  top: 52px;
  height: calc(100vh - 52px);
  overflow-y: auto;
  background: var(--bg2);
}
.nav-group-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
  padding: 0 16px;
  margin-bottom: 8px;
  margin-top: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 13px;
  color: var(--muted);
  border-left: 2px solid transparent;
  text-decoration: none;
  transition: all 0.1s;
  user-select: none;
}
.nav-item:hover { color: var(--text); background: var(--bg3); }
.nav-item.active {
  color: var(--accent);
  background: var(--accent-light);
  border-left-color: var(--accent);
  font-weight: 500;
}
.nav-num {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--border2);
  min-width: 14px;
}
.nav-item.active .nav-num { color: var(--accent-border); }
</style>
