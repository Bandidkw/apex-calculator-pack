<script setup lang="ts">
import {
  useTracker,
  SEASONS_LIST,
  isOldSeason,
  type NewSeason,
} from "../composables/useTracker";

const { state, setPremiumAllNew } = useTracker();

const getNewSeason = (seasonNo: number | string): NewSeason => {
  return state.seasonsData[seasonNo.toString()] as NewSeason;
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
        ปุ่มลัดซีซั่น 22+:
      </span>
      <div class="buttons-group">
        <button
          class="btn btn-secondary btn-sm"
          @click="setPremiumAllNew('none')"
        >
          พาสฟรีทั้งหมด
        </button>
        <button
          class="btn btn-secondary btn-sm"
          @click="setPremiumAllNew('premium')"
        >
          ซื้อ Premium ทั้งหมด
        </button>
        <button
          class="btn btn-gold btn-sm"
          @click="setPremiumAllNew('ultimate')"
        >
          ซื้อ Ultimate+ ทั้งหมด
        </button>
      </div>
    </div>

    <!-- Seasons Grid S22+ -->
    <div class="scrollable-grid">
      <div class="seasons-grid">
        <div
          v-for="season in SEASONS_LIST.filter((s) => !isOldSeason(s))"
          :key="season"
          class="season-card new-season-card"
        >
          <div class="season-card-header">
            <span class="season-number">Season {{ season }}</span>
            <span class="badge-era">2 Splits Era</span>
          </div>

          <div class="splits-wrapper">
            <!-- SPLIT 1 -->
            <div class="split-section">
              <div class="split-header">
                <span>SPLIT 1</span>
              </div>
              <div class="split-options-grid">
                <!-- Dropdown/Buttons for Split 1 Selection -->
                <button
                  class="btn-option"
                  :class="{ active: !getNewSeason(season).s1Played }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s1Played = false;
                      s.s1Premium = false;
                      s.s1UltimatePlus = false;
                    }
                  "
                >
                  ไม่ได้เล่น (Not Played)
                </button>
                <button
                  class="btn-option"
                  :class="{
                    active:
                      getNewSeason(season).s1Played &&
                      !getNewSeason(season).s1Premium &&
                      !getNewSeason(season).s1UltimatePlus,
                  }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s1Played = true;
                      s.s1Premium = false;
                      s.s1UltimatePlus = false;
                    }
                  "
                >
                  ไม่ได้ซื้อพาส (No Pass)
                </button>
                <button
                  class="btn-option option-premium"
                  :class="{ active: getNewSeason(season).s1Premium }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s1Played = true;
                      s.s1Premium = true;
                      s.s1UltimatePlus = false;
                    }
                  "
                >
                  Premium (950 Coins)
                </button>
                <button
                  class="btn-option option-ultimate"
                  :class="{ active: getNewSeason(season).s1UltimatePlus }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s1Played = true;
                      s.s1Premium = false;
                      s.s1UltimatePlus = true;
                    }
                  "
                >
                  Ultimate / Ultimate+
                </button>
              </div>

              <!-- BP Level Slider Split 1 -->
              <div
                class="bp-level-control"
                v-if="getNewSeason(season).s1Played"
              >
                <div class="slider-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <label>เลเวล Split 1 (Split 1 Level):</label>
                  <div class="bp-level-input-wrapper" style="display: flex; align-items: center; gap: 0.25rem;">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      :value="getNewSeason(season).s1BpLevel ?? 60"
                      @input="(e) => {
                        let val = parseInt((e.target as HTMLInputElement).value, 10);
                        if (isNaN(val)) return;
                        if (val < 1) val = 1;
                        if (val > 60) val = 60;
                        getNewSeason(season).s1BpLevel = val;
                      }"
                      @blur="(e) => {
                        let val = parseInt((e.target as HTMLInputElement).value, 10);
                        if (isNaN(val) || val < 1) val = 60;
                        if (val > 60) val = 60;
                        getNewSeason(season).s1BpLevel = val;
                      }"
                      class="bp-number-input"
                    />
                    <span class="text-muted" style="font-size: 0.8rem;">/ 60</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  :value="getNewSeason(season).s1BpLevel ?? 60"
                  @input="
                    (e) =>
                      (getNewSeason(season).s1BpLevel = parseInt(
                        (e.target as HTMLInputElement).value,
                        10,
                      ))
                  "
                  class="bp-slider"
                />
              </div>
            </div>

            <!-- SPLIT 2 -->
            <div class="split-section">
              <div class="split-header">
                <span>SPLIT 2</span>
              </div>
              <div class="split-options-grid">
                <!-- Dropdown/Buttons for Split 2 Selection -->
                <button
                  class="btn-option"
                  :class="{ active: !getNewSeason(season).s2Played }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s2Played = false;
                      s.s2Premium = false;
                      s.s2UltimatePlus = false;
                    }
                  "
                >
                  ไม่ได้เล่น (Not Played)
                </button>
                <button
                  class="btn-option"
                  :class="{
                    active:
                      getNewSeason(season).s2Played &&
                      !getNewSeason(season).s2Premium &&
                      !getNewSeason(season).s2UltimatePlus,
                  }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s2Played = true;
                      s.s2Premium = false;
                      s.s2UltimatePlus = false;
                    }
                  "
                >
                  ไม่ได้ซื้อพาส (No Pass)
                </button>
                <button
                  class="btn-option option-premium"
                  :class="{ active: getNewSeason(season).s2Premium }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s2Played = true;
                      s.s2Premium = true;
                      s.s2UltimatePlus = false;
                    }
                  "
                >
                  Premium (950 Coins)
                </button>
                <button
                  class="btn-option option-ultimate"
                  :class="{ active: getNewSeason(season).s2UltimatePlus }"
                  @click="
                    () => {
                      const s = state.seasonsData[
                        season.toString()
                      ] as NewSeason;
                      s.s2Played = true;
                      s.s2Premium = false;
                      s.s2UltimatePlus = true;
                    }
                  "
                >
                  Ultimate / Ultimate+
                </button>
              </div>

              <!-- BP Level Slider Split 2 -->
              <div
                class="bp-level-control"
                v-if="getNewSeason(season).s2Played"
              >
                <div class="slider-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <label>เลเวล Split 2 (Split 2 Level):</label>
                  <div class="bp-level-input-wrapper" style="display: flex; align-items: center; gap: 0.25rem;">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      :value="getNewSeason(season).s2BpLevel ?? 60"
                      @input="(e) => {
                        let val = parseInt((e.target as HTMLInputElement).value, 10);
                        if (isNaN(val)) return;
                        if (val < 1) val = 1;
                        if (val > 60) val = 60;
                        getNewSeason(season).s2BpLevel = val;
                      }"
                      @blur="(e) => {
                        let val = parseInt((e.target as HTMLInputElement).value, 10);
                        if (isNaN(val) || val < 1) val = 60;
                        if (val > 60) val = 60;
                        getNewSeason(season).s2BpLevel = val;
                      }"
                      class="bp-number-input"
                    />
                    <span class="text-muted" style="font-size: 0.8rem;">/ 60</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  :value="getNewSeason(season).s2BpLevel ?? 60"
                  @input="
                    (e) =>
                      (getNewSeason(season).s2BpLevel = parseInt(
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
    </div>
  </div>
</template>

<style scoped>
.tab-content-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
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
  max-height: 580px;
  overflow-y: auto;
  padding: 0.25rem 1rem 1.5rem 0.25rem;
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

.badge-era {
  background: rgba(255, 176, 31, 0.15);
  color: var(--color-gold);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
}

/* Season 22+ (Splits) Special cards */
.new-season-card {
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.02);
}

.splits-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .splits-wrapper {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.split-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.split-header {
  font-family: var(--font-gaming);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 70, 85, 0.3);
  padding-bottom: 0.35rem;
  margin-bottom: 0.35rem;
  text-shadow: 0 0 8px rgba(255, 70, 85, 0.4);
}

.split-options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.btn-option {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  padding: 0.4rem 0.25rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.btn-option:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.btn-option.active {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--text-primary);
  color: white;
}

.btn-option.option-premium.active {
  background: rgba(255, 70, 85, 0.15);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 8px rgba(255, 70, 85, 0.25);
}

.btn-option.option-ultimate.active {
  background: rgba(255, 176, 31, 0.15);
  border-color: var(--color-gold);
  color: var(--color-gold);
  box-shadow: 0 0 8px rgba(255, 176, 31, 0.25);
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

/* Precise Battle Pass Number Input */
.bp-number-input {
  width: 3rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-gold);
  font-weight: 700;
  border-radius: 4px;
  padding: 0.1rem 0.25rem;
  text-align: center;
  font-family: var(--font-gaming);
  font-size: 0.8rem;
  outline: none;
  transition: all var(--transition-fast);
}

.bp-number-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 5px rgba(255, 70, 85, 0.3);
  background: rgba(0, 0, 0, 0.6);
}

/* Remove spinners for number input */
.bp-number-input::-webkit-outer-spin-button,
.bp-number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.bp-number-input {
  -moz-appearance: textfield;
}
</style>
