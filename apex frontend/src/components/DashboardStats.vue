<script setup lang="ts">
import { useTracker } from "../composables/useTracker";

const { state, levelPacks, seasonsPacks, totalPacks, guaranteeProgress } =
  useTracker();
</script>

<template>
  <section
    class="dashboard-panel glass-panel"
    :class="{ 'gold-glow': guaranteeProgress.reached }"
  >
    <div class="dashboard-header">
      <div class="progress-info">
        <h2 class="gaming-title">
          <span class="glow-text-gold" v-if="guaranteeProgress.reached"
            >✨ Heirloom Shards Guaranteed! ✨</span
          >
          <span class="glow-text-red" v-else
            >การันตี Heirloom Shards (500 กล่อง)</span
          >
        </h2>
        <p class="description-muted">
          ระบบคำนวณและประมวลผลข้อมูลบนเครื่องของผู้ใช้ 100%
          ข้อมูลบันทึกอัตโนมัติ
        </p>
      </div>
      <div class="total-badge" :style="state.hasHeirloomBefore ? 'display: flex; gap: 1rem; align-items: center; text-align: left;' : ''">
        <div :style="state.hasHeirloomBefore ? 'text-align: right;' : ''">
          <span class="label">{{ state.hasHeirloomBefore ? 'นับรอบการันตีถัดไป' : 'กล่องสะสมทั้งหมด' }}</span>
          <span class="number" :class="{ 'text-gold': guaranteeProgress.reached }"
            >{{ guaranteeProgress.basePacks }} <span class="max-val">/ 500</span></span
          >
        </div>
        <div v-if="state.hasHeirloomBefore" style="border-left: 1px solid var(--border-color); padding-left: 1rem; text-align: left;">
          <span class="label">สะสมรวมทั้งหมด</span>
          <span class="number" style="color: var(--text-secondary); font-size: 1.5rem;"
            >{{ totalPacks }}</span
          >
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-bar-container">
      <div
        class="progress-bar-fill"
        :style="{ width: `${guaranteeProgress.percentage}%` }"
        :class="{ 'bar-gold': guaranteeProgress.reached }"
      >
        <div class="progress-bar-light"></div>
      </div>
      <span class="progress-percentage-label"
        >{{ guaranteeProgress.percentage.toFixed(1) }}%</span
      >
    </div>

    <!-- Remaining Tracker / Quick Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="card-icon"
          ><svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style="width: 1.5rem; height: 1.5rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path></svg
        ></span>
        <div class="card-content">
          <span class="stat-val">{{ levelPacks }}</span>
          <span class="stat-lbl"
            >กล่องจาก Player Level (เลเวล {{ state.playerLevel }})</span
          >
        </div>
      </div>

      <div class="stat-card">
        <span class="card-icon"
          ><svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style="width: 1.5rem; height: 1.5rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path></svg
        ></span>
        <div class="card-content">
          <span class="stat-val">{{ seasonsPacks }}</span>
          <span class="stat-lbl">กล่องจากประวัติ Battle Pass ทุกซีซั่น</span>
        </div>
      </div>

      <div class="stat-card">
        <span class="card-icon"
          ><svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style="width: 1.5rem; height: 1.5rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path></svg
        ></span>
        <div class="card-content">
          <span class="stat-val">{{ state.miscPacks }}</span>
          <span class="stat-lbl">กล่องพิเศษอื่นๆ / กล่องที่ซื้อเพิ่ม</span>
        </div>
      </div>

      <div
        class="stat-card remaining-card"
        :class="{ 'guaranteed-glow': guaranteeProgress.reached }"
      >
        <span class="card-icon">
          <svg
            v-if="guaranteeProgress.reached"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style="width: 1.5rem; height: 1.5rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            ></path>
          </svg>
          <svg
            v-else
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style="width: 1.5rem; height: 1.5rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </span>
        <div class="card-content">
          <span
            class="stat-val"
            :class="{ 'text-gold': guaranteeProgress.reached }"
          >
            {{
              guaranteeProgress.reached
                ? "ครบแล้ว!"
                : `${guaranteeProgress.remaining} กล่อง`
            }}
          </span>
          <span class="stat-lbl">{{
            guaranteeProgress.reached
              ? "สามารถแลก Heirloom ได้ทันที!"
              : "เหลืออีกกี่กล่องจะครบการันตี"
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Dashboard Panel Styles */
.dashboard-panel {
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.dashboard-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-primary);
}

.dashboard-panel.gold-glow::before {
  background: var(--color-gold);
}

.dashboard-panel.gold-glow {
  box-shadow: var(--shadow-gold-glow);
  border-color: rgba(255, 176, 31, 0.4);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.gaming-title {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.glow-text-red {
  color: #fff;
  text-shadow: 0 0 12px rgba(255, 70, 85, 0.5);
}

.glow-text-gold {
  color: var(--color-gold);
  text-shadow: 0 0 12px var(--color-gold-glow);
}

.description-muted {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.total-badge {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  text-align: right;
}

.total-badge .label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.total-badge .number {
  font-family: var(--font-gaming);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.total-badge .number.text-gold {
  color: var(--color-gold);
}

.total-badge .max-val {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Progress Bar */
.progress-bar-container {
  height: 24px;
  width: 100%;
  background: #14151e;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 2rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #da292a, #ff4655);
  border-radius: 12px;
  position: relative;
  transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 0 12px rgba(255, 70, 85, 0.4);
}

.progress-bar-fill.bar-gold {
  background: linear-gradient(90deg, #d29411, #ffb01f);
  box-shadow: 0 0 15px rgba(255, 176, 31, 0.5);
}

.progress-bar-light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

.progress-percentage-label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-gaming);
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  pointer-events: none;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform var(--transition-fast);
}

.stat-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.04);
}

.stat-card .card-icon {
  font-size: 1.5rem;
}

.stat-card .stat-val {
  display: block;
  font-family: var(--font-gaming);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.stat-card .stat-lbl {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.remaining-card {
  border-color: rgba(255, 70, 85, 0.15);
  background: rgba(255, 70, 85, 0.02);
}

.remaining-card.guaranteed-glow {
  border-color: rgba(255, 176, 31, 0.25);
  background: rgba(255, 176, 31, 0.03);
}

.text-gold {
  color: var(--color-gold);
}
</style>
