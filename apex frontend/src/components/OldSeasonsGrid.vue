<script setup lang="ts">
import {
  useTracker,
  SEASONS_LIST,
  isOldSeason,
  type OldSeason,
} from "../composables/useTracker";
import { useToast } from "../composables/useToast";
import { SEASON_MAPPINGS } from "../data/seasonMappings";

const { state, setPlayedAllOld, setPremiumAllOld, setTreasureAllOld } = useTracker();
const { addToast } = useToast();

const getOldSeason = (seasonNo: number | string): OldSeason => {
  return state.seasonsData[seasonNo.toString()] as OldSeason;
};

const handleOldToggle = (seasonNo: number, type: 'played' | 'premium' | 'treasure') => {
  if (!SEASON_MAPPINGS[seasonNo]) {
    addToast(`ยังไม่มีข้อมูลทางการสำหรับ Season ${seasonNo} ระบบจึงป้องกันไม่ให้เลือกเพื่อป้องกันการคำนวณผิดพลาดครับ`, "warning");
    return;
  }

  const seasonStr = seasonNo.toString();
  const season = state.seasonsData[seasonStr] as OldSeason;

  if (type === 'played') {
    season.played = !season.played;
    if (!season.played) {
      season.isPremium = false;
      season.completedTreasure = false;
    }
  } else if (type === 'premium') {
    if (!season.played) season.played = true;
    season.isPremium = !season.isPremium;
  } else if (type === 'treasure') {
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
        <button class="btn btn-secondary btn-sm" @click="setPlayedAllOld(true)">
          พาสฟรีทั้งหมด
        </button>
        <button
          class="btn btn-secondary btn-sm"
          @click="setPremiumAllOld(true)"
        >
          ซื้อพาสทั้งหมด
        </button>
        <button
          class="btn btn-gold btn-sm"
          @click="setTreasureAllOld(true)"
        >
          Treasure ครบ
        </button>
        <button
          class="btn btn-secondary btn-sm"
          @click="setTreasureAllOld(false)"
        >
          ล้าง Treasure
        </button>
        <button class="btn btn-danger btn-sm" @click="setPlayedAllOld(false)">
          ไม่เล่นทั้งหมด
        </button>
      </div>
    </div>

    <!-- Seasons Grid S1 - S21 -->
    <div class="scrollable-grid">
      <div class="seasons-grid">
        <div
          v-for="season in SEASONS_LIST.filter(isOldSeason)"
          :key="season"
          class="season-card"
          :class="{ 'card-active': getOldSeason(season).played }"
        >
          <div class="season-card-header">
            <span class="season-number">Season {{ season }}</span>
            <div v-if="!SEASON_MAPPINGS[season]" class="warning-badge" title="ยังไม่มีข้อมูลทางการ ใช้การคำนวณแบบสัดส่วน">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              สัดส่วน
            </div>
          </div>

          <div class="season-card-controls">
            <!-- Checkbox: Played -->
            <div
              class="checkbox-card"
              :class="{ 
                active: getOldSeason(season).played,
                locked: !SEASON_MAPPINGS[season]
              }"
              @click="handleOldToggle(season, 'played')"
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
              <span class="lbl">เล่นซีซั่นนี้ (Played)</span>
            </div>

            <!-- Checkbox: Premium -->
            <div
              class="checkbox-card"
              :class="{
                active: getOldSeason(season).isPremium,
                disabled: !getOldSeason(season).played,
                locked: !SEASON_MAPPINGS[season]
              }"
              @click="handleOldToggle(season, 'premium')"
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
              <span class="lbl">ซื้อพรีเมียมพาส (Premium Pass)</span>
            </div>

            <!-- Checkbox: Treasure -->
            <div
              class="checkbox-card"
              :class="{
                'active-gold': getOldSeason(season).completedTreasure,
                disabled: !getOldSeason(season).played,
                locked: !SEASON_MAPPINGS[season]
              }"
              @click="handleOldToggle(season, 'treasure')"
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
              <span class="lbl text-gold">เก็บ Treasure Pack ครบ (Treasure Pack) (+1)</span>
            </div>

            <!-- BP Level Slider Old -->
            <div class="bp-level-control" v-if="getOldSeason(season).played">
              <div
                class="slider-header"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <label>เลเวล Battle Pass (BP Level):</label>
                <div
                  class="bp-level-input-wrapper"
                  style="display: flex; align-items: center; gap: 0.25rem"
                >
                  <input
                    type="number"
                    min="1"
                    max="110"
                    :value="getOldSeason(season).bpLevel ?? 110"
                    @input="
                      (e) => {
                        let val = parseInt(
                          (e.target as HTMLInputElement).value,
                          10,
                        );
                        if (isNaN(val)) return;
                        if (val < 1) val = 1;
                        if (val > 110) val = 110;
                        getOldSeason(season).bpLevel = val;
                      }
                    "
                    @blur="
                      (e) => {
                        let val = parseInt(
                          (e.target as HTMLInputElement).value,
                          10,
                        );
                        if (isNaN(val) || val < 1) val = 110;
                        if (val > 110) val = 110;
                        getOldSeason(season).bpLevel = val;
                      }
                    "
                    class="bp-number-input"
                  />
                  <span class="text-muted" style="font-size: 0.8rem"
                    >/ 110</span
                  >
                </div>
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

.checkbox-card.locked {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(0.5);
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
