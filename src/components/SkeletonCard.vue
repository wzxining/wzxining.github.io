<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton skeleton-poster"></div>
    <div class="skeleton-info">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-meta"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: var(--color-bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}
.skeleton-poster {
  aspect-ratio: 2 / 3;
  width: 100%;
}
.skeleton-info {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.skeleton-title {
  height: 18px;
  width: 80%;
  border-radius: 4px;
}
.skeleton-meta {
  height: 14px;
  width: 60%;
  border-radius: 4px;
}
</style>
