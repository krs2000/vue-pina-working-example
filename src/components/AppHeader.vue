<template>
  <header>
    <div class="header-logo">
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" color="#2563eb">
        <path d="M16 2L2 9v14l14 7 14-7V9L16 2z" fill="currentColor" opacity=".15"/>
        <path d="M16 2L2 9v14l14 7 14-7V9L16 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M2 9l14 7 14-7M16 16v7" stroke="currentColor" stroke-width="2"/>
      </svg>
      Vue 3 + Pinia
    </div>
    <div class="header-sep"></div>
    <span class="header-sub">Complete Working Reference</span>
    <div class="spacer"></div>
    <span class="header-badge">vue@3.4</span>
    <span class="header-badge">pinia@2.1</span>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 100;
}
.header-logo {
  font-weight: 600;
  font-size: 15px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-sep  { width: 1px; height: 20px; background: var(--border); }
.header-sub  { color: var(--muted); font-size: 13px; }
.spacer      { flex: 1; }
.header-badge {
  font-family: var(--mono);
  font-size: 11px;
  padding: 2px 8px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--muted);
}
</style>
