<script setup lang="ts">
import { ref } from "vue";
import {
  useTracker,
} from "./composables/useTracker";
import DashboardStats from "./components/DashboardStats.vue";
import PlayerInfo from "./components/PlayerInfo.vue";
import OldSeasonsGrid from "./components/OldSeasonsGrid.vue";

import NewSeasonsGrid from "./components/NewSeasonsGrid.vue";

const { resetAll } = useTracker();

const seasonEraTab = ref<"old" | "new">("old");
</script>

<template>
  <div class="app-wrapper">
    <!-- Header -->
    <header class="app-header container">
      <div class="logo-area">
        <svg
          class="apex-symbol"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-primary)"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="
            width: 2.2rem;
            height: 2.2rem;
            filter: drop-shadow(0 0 8px rgba(255, 70, 85, 0.4));
          "
        >
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 8l-4 8h8l-4-8z" fill="var(--color-primary)" />
        </svg>
        <div class="logo-text">
          <h1>APEX LEGENDS</h1>
          <p class="subtitle">PACKS CALCULATOR (2026)</p>
        </div>
      </div>
      <div class="actions-area">
        <button
          class="btn btn-danger"
          @click="resetAll"
          title="Reset all data to default"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          รีเซ็ตข้อมูลทั้งหมด
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container main-container">
      <!-- Top Dashboard: Progress & Quick Statistics -->
      <!-- Top Dashboard: Progress & Quick Statistics -->
      <DashboardStats />

      <!-- Sub Sections Split Grid -->
      <div class="content-split-grid">
        <!-- Left Panel: Profile, Level, & Misc Inputs -->
        <PlayerInfo />

        <!-- Right Panel: Seasonal Tracking System -->
        <div class="right-control-panel glass-panel">
          <div class="panel-header-tabs">
            <h3
              class="panel-title"
              style="display: flex; align-items: center; gap: 0.5rem"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style="width: 1.25rem; height: 1.25rem"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              บันทึกข้อมูลและประวัติรายซีซั่น
            </h3>

            <div class="tabs-nav">
              <button
                class="tab-btn"
                :class="{ active: seasonEraTab === 'old' }"
                @click="seasonEraTab = 'old'"
              >
                ซีซั่นเก่า (S1 - S21)
              </button>
              <button
                class="tab-btn"
                :class="{ active: seasonEraTab === 'new' }"
                @click="seasonEraTab = 'new'"
              >
                ซีซั่นใหม่ (S22+)
              </button>
            </div>
          </div>

          <!-- TAB 1: OLD ERA (Season 1 - 21) -->
          <OldSeasonsGrid v-if="seasonEraTab === 'old'" />

          <!-- TAB 2: NEW ERA (Season 22 - 29) -->
          <NewSeasonsGrid v-else />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>
        © 2026 Apex Legends Packs Tracker. Developed for calculations based on
        the latest Season metrics.
      </p>
      <p class="privacy-note">
        All data is kept on your device, no telemetry or third-party cookies
        used.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding: 1.5rem 1.5rem;
  background: rgba(12, 13, 18, 0.6);
  backdrop-filter: blur(8px);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.apex-symbol {
  font-size: 2.2rem;
  line-height: 1;
  text-shadow: 0 0 10px rgba(255, 70, 85, 0.4);
}

.logo-text h1 {
  font-size: 1.6rem;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.logo-text .subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  font-weight: 700;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Split content grid */
.content-split-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .content-split-grid {
    grid-template-columns: 1fr;
  }
}

.panel-title {
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

/* Right Panel Style Details */
.right-control-panel {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.panel-header-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.panel-header-tabs .panel-title {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.tabs-nav {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-gaming);
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  color: white;
}

.tab-btn.active {
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

/* Footer styles */
.app-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding: 2rem 1rem;
  text-align: center;
  background: rgba(8, 9, 13, 0.8);
}

.app-footer p {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.privacy-note {
  font-style: italic;
}
</style>
