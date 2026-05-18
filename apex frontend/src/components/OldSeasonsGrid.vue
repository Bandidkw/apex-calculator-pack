<script setup lang="ts">
import {
  useTracker,
  SEASONS_LIST,
  isOldSeason,
  type OldSeason,
} from "../composables/useTracker";

const { state, setPlayedAllOld, setPremiumAllOld } = useTracker();

const getOldSeason = (seasonNo: number | string): OldSeason => {
  return state.seasonsData[seasonNo.toString()] as OldSeason;
};

// Season Helper Toggles
const toggleOldPlayed = (seasonStr: string) => {
  const season = state.seasonsData[seasonStr];
  if ("played" in season) {
    season.played = !season.played;
    if (!season.played) {
      season.isPremium = false;
      season.completedTreasure = false;
    }
  }
};

const toggleOldPremium = (seasonStr: string) => {
  const season = state.seasonsData[seasonStr];
  if ("isPremium" in season && "played" in season) {
    if (!season.played) season.played = true;
    season.isPremium = !season.isPremium;
  }
};

const toggleOldTreasure = (seasonStr: string) => {
  const season = state.seasonsData[seasonStr];
  if ("completedTreasure" in season && "played" in season) {
    if (!season.played) season.played = true;
    season.completedTreasure = !season.completedTreasure;
  }
};
</script>

<template>
  <div class="tab-content-container">
    <!-- Quick Actions -->
    <div class="quick-actions-bar">
      <span
        class="bar-title"
        style="display: flex; align-items: center; gap: 0.25rem"
      >
        <svg
          fill="none"
          stroke="var(--color-primary)"
          viewBox="0 0 24 24"
          style="width: 1rem; height: 1rem"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        ปุ่มลัดซีซั่น 1 - 21:
      </span>
      <div class="buttons-group">
        <button
          class="btn btn-secondary btn-sm"
          @click="setPlayedAllOld(true)"
        >
          ไม่ได้ซื้อพาสทุกซีซั่น
        </button>
        <button
          class="btn btn-secondary btn-sm"
          @click="setPremiumAllOld(true)"
        >
          ซื้อพรีเมียมทุกซีซั่น
        </button>
        <button
          class="btn btn-danger btn-sm"
          @click="setPlayedAllOld(false)"
        >
          ไม่เล่นทุกซีซั่น
        </button>
      </div>
    </div>

    <!-- Seasons Grid S1 - S21 -->
    <div class="seasons-grid scrollable-grid">
      <div
        v-for="season in SEASONS_LIST.filter(isOldSeason)"
        :key="season"
        class="season-card"
        :class="{ 'card-active': getOldSeason(season).played }"
      >
        <div class="season-card-header">
          <span class="season-number">Season {{ season }}</span>
        </div>

        <div class="season-card-controls">
          <!-- Checkbox: Played -->
          <div
            class="checkbox-card"
            :class="{ active: getOldSeason(season).played }"
            @click="toggleOldPlayed(season.toString())"
          >
            <div class="checkbox-inner">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="lbl">เล่นซีซั่นนี้</span>
          </div>

          <!-- Checkbox: Premium -->
          <div
            class="checkbox-card"
            :class="{
              active: getOldSeason(season).isPremium,
              disabled: !getOldSeason(season).played,
            }"
            @click="toggleOldPremium(season.toString())"
          >
            <div class="checkbox-inner">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="lbl">ซื้อพรีเมียมพาส</span>
          </div>

          <!-- Checkbox: Treasure -->
          <div
            class="checkbox-card"
            :class="{
              'active-gold': getOldSeason(season).completedTreasure,
              disabled: !getOldSeason(season).played,
            }"
            @click="toggleOldTreasure(season.toString())"
          >
            <div class="checkbox-inner">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="lbl text-gold">เก็บ Treasure Pack ครบ (+1)</span>
          </div>

          <!-- BP Level Slider Old -->
          <div
            class="bp-level-control"
            v-if="getOldSeason(season).played"
          >
            <div class="slider-header">
              <label>เลเวล Battle Pass:</label>
              <span class="text-gold"
                >{{ getOldSeason(season).bpLevel ?? 110 }} / 110</span
              >
            </div>
            <input
              type="range"
              min="1"
              max="110"
              :value="getOldSeason(season).bpLevel ?? 110"
              @input="
                (e) =>
                  (getOldSeason(season).bpLevel = parseInt(
                    (e.target as HTMLInputElement).value,
                    10,
                  ))
              "
              class="bp-slider"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-content-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-actions-bar .bar-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.buttons-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
}

/* Seasons Scrollable Grid */
.scrollable-grid {
  max-height: 480px;
  overflow-y: auto;
  padding: 0.25rem 1rem 0.25rem 0.25rem;
}

.seasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.season-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all var(--transition-fast);
}

.season-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.season-card.card-active {
  border-color: rgba(255, 70, 85, 0.15);
  background: rgba(255, 70, 85, 0.01);
}

.season-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.season-number {
  font-family: var(--font-gaming);
  font-weight: 700;
  font-size: 1rem;
  color: white;
}

.season-card-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-card.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.checkbox-card .lbl {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Slider Controls */
.bp-level-control {
  margin-top: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.slider-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.text-gold {
  color: var(--color-gold);
}

.bp-slider {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
}

.bp-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  margin-top: -6px;
  box-shadow: 0 0 10px rgba(255, 70, 85, 0.5);
}

.bp-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.bp-slider:focus {
  outline: none;
}
</style>
