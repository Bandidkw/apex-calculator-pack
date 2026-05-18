<script setup lang="ts">
import { useTracker } from "../composables/useTracker";

const { state, totalPacks } = useTracker();

// Local validation for player level
const onLevelInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseInt(target.value, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 2000) val = 2000;
  state.playerLevel = val;
};

// Local validation for misc packs
const onMiscInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseInt(target.value, 10);
  if (isNaN(val) || val < 0) val = 0;
  state.miscPacks = val;
};

// Local validation for last heirloom pack
const onHeirloomInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseInt(target.value, 10);
  if (isNaN(val) || val < 0) val = 0;
  if (val > totalPacks.value) val = totalPacks.value;
  state.lastHeirloomPackCount = val;
};

// Custom level adjustment
const adjustLevel = (amount: number) => {
  let val = state.playerLevel + amount;
  if (val < 1) val = 1;
  if (val > 2000) val = 2000;
  state.playerLevel = val;
};

// Custom misc packs adjustment
const adjustMisc = (amount: number) => {
  let val = state.miscPacks + amount;
  if (val < 0) val = 0;
  state.miscPacks = val;
};

// Custom last heirloom pack adjustment
const adjustHeirloomPack = (amount: number) => {
  let val = state.lastHeirloomPackCount + amount;
  if (val < 0) val = 0;
  if (val > totalPacks.value) val = totalPacks.value;
  state.lastHeirloomPackCount = val;
};
</script>

<template>
  <div class="left-control-panel glass-panel">
    <h3 class="panel-title" style="display: flex; align-items: center; gap: 0.5rem">
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
      ข้อมูลผู้เล่นและเลเวล
    </h3>

    <div class="inputs-stack">
      <!-- Player Level Field with Custom Stepper Buttons -->
      <div class="form-group">
        <label for="player-level" class="form-label">
          <span>เลเวลตัวละครของคุณ (Player Level)</span>
          <span class="badge">สูงสุด 2000</span>
        </label>
        
        <div class="custom-numeric-picker">
          <button
            type="button"
            class="picker-btn"
            @click="adjustLevel(-1)"
            :disabled="state.playerLevel <= 1"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <div class="input-container">
            <input
              type="number"
              id="player-level"
              :value="state.playerLevel"
              @input="onLevelInput"
              min="1"
              max="2000"
              class="form-input text-highlight text-center"
            />
            <span class="limit-indicator">LV. {{ state.playerLevel }}</span>
          </div>

          <button
            type="button"
            class="picker-btn"
            @click="adjustLevel(1)"
            :disabled="state.playerLevel >= 2000"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <!-- Quick Level Presets -->
        <div class="preset-buttons">
          <button type="button" class="preset-btn" @click="adjustLevel(10)">+10</button>
          <button type="button" class="preset-btn" @click="adjustLevel(100)">+100</button>
          <button type="button" class="preset-btn" @click="adjustLevel(500)">+500</button>
          <button type="button" class="preset-btn preset-max" @click="state.playerLevel = 2000">MAX</button>
        </div>

        <p class="input-tip" style="margin-top: 0.25rem">
          คำนวณอัตโนมัติตามระดับ Prestige 1 - 3 (เลเวลสะสมเต็มจะได้ 538 กล่อง)
        </p>
      </div>

      <!-- Misc Packs Field with Custom Stepper Buttons -->
      <div class="form-group">
        <label for="misc-packs" class="form-label">
          <span>กล่องกิจกรรม / ซื้อเพิ่มจากร้านค้า (Miscellaneous Packs)</span>
        </label>
        
        <div class="custom-numeric-picker">
          <button
            type="button"
            class="picker-btn"
            @click="adjustMisc(-1)"
            :disabled="state.miscPacks <= 0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <div class="input-container">
            <input
              type="number"
              id="misc-packs"
              :value="state.miscPacks"
              @input="onMiscInput"
              min="0"
              class="form-input text-highlight text-center"
            />
          </div>

          <button
            type="button"
            class="picker-btn"
            @click="adjustMisc(1)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <!-- Quick Misc Presets -->
        <div class="preset-buttons">
          <button type="button" class="preset-btn" @click="adjustMisc(5)">+5</button>
          <button type="button" class="preset-btn" @click="adjustMisc(10)">+10</button>
          <button type="button" class="preset-btn" @click="adjustMisc(50)">+50</button>
          <button type="button" class="preset-btn preset-reset" @click="state.miscPacks = 0">ล้าง</button>
        </div>

        <p class="input-tip" style="margin-top: 0.25rem">
          กล่องจาก Event, โค้ดแลกฟรี, หรือ Twitch Prime Gaming
        </p>
      </div>

      <!-- Heirloom Setting Field -->
      <div class="form-group heirloom-group">
        <div class="heirloom-checkbox-wrapper" @click="state.hasHeirloomBefore = !state.hasHeirloomBefore">
          <div class="heirloom-checkbox" :class="{ active: state.hasHeirloomBefore }">
            <svg
              v-if="state.hasHeirloomBefore"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="heirloom-label">
            <span class="main-lbl">เคยได้ Heirloom Shards แล้ว?</span>
            <span class="sub-lbl text-red-glow">รีเซ็ตการนับรอบการันตีใหม่</span>
          </div>
        </div>

        <transition name="fade-slide">
          <div v-if="state.hasHeirloomBefore" class="heirloom-input-block">
            <label class="form-label" for="last-heirloom-pack">
              <span>ได้ชิ้นล่าสุดที่กล่องสะสมที่เท่าไหร่?</span>
              <span class="badge text-gold" style="color: var(--color-gold); background: rgba(255, 176, 31, 0.15);">สูงสุด {{ totalPacks }}</span>
            </label>
            <div class="custom-numeric-picker">
              <button
                type="button"
                class="picker-btn"
                @click="adjustHeirloomPack(-1)"
                :disabled="state.lastHeirloomPackCount <= 0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>

              <div class="input-container">
                <input
                  type="number"
                  id="last-heirloom-pack"
                  :value="state.lastHeirloomPackCount"
                  @input="onHeirloomInput"
                  min="0"
                  :max="totalPacks"
                  class="form-input text-highlight text-center"
                />
              </div>

              <button
                type="button"
                class="picker-btn"
                @click="adjustHeirloomPack(1)"
                :disabled="state.lastHeirloomPackCount >= totalPacks"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>

            <!-- Quick Heirloom Presets -->
            <div class="preset-buttons">
              <button type="button" class="preset-btn" @click="adjustHeirloomPack(10)">+10</button>
              <button type="button" class="preset-btn" @click="adjustHeirloomPack(100)">+100</button>
              <button type="button" class="preset-btn preset-max" @click="state.lastHeirloomPackCount = totalPacks">กล่องล่าสุด</button>
            </div>

            <p class="input-tip alert-tip">
              * การันตีรอบถัดไปจะเริ่มนับจากกล่องที่ {{ state.lastHeirloomPackCount + 1 }} 
              (นับแล้ว {{ Math.max(0, totalPacks - state.lastHeirloomPackCount) }} กล่อง)
            </p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Informational Rule Card -->
    <div class="info-rules-card">
      <h4
        style="
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        "
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
        กฎการได้รับกล่องจากเลเวล (Player Level Rules):
      </h4>
      <ul style="display: flex; flex-direction: column; gap: 0.4rem;">
        <li><strong>เลเวล 2 - 20:</strong> ได้ 1 กล่องต่อ 1 เลเวล (รวม 19 กล่อง)</li>
        <li><strong>เลเวล 22 - 300:</strong> ได้ 1 กล่องทุกๆ 2 เลเวล (รวม 140 กล่อง)</li>
        <li><strong>เลเวล 305 - 500:</strong> ได้ 1 กล่องทุกๆ 5 เลเวล (รวม 40 กล่อง)</li>
        <li style="border-top: 1px dashed rgba(255, 255, 255, 0.08); padding-top: 0.4rem; margin-top: 0.2rem;">
          <strong>เลเวล Prestige (501 - 2000):</strong> รอบละ 500 เลเวล (รีเซ็ตทุกขั้นสะสม 113 × 3 = 339 กล่อง)
          <ul style="margin-left: 1rem; margin-top: 0.25rem; list-style: circle; display: flex; flex-direction: column; gap: 0.2rem;">
            <li style="font-size: 0.72rem;"><strong>เลเวล 1 - 100 ของขั้น:</strong> ได้ 1 กล่องทุกๆ 10 เลเวล (10 กล่อง)</li>
            <li style="font-size: 0.72rem;"><strong>เลเวล 101 - 200 ของขั้น:</strong> ได้ 1 กล่องทุกๆ 8 เลเวล (12 กล่อง)</li>
            <li style="font-size: 0.72rem;"><strong>เลเวล 201 - 300 ของขั้น:</strong> ได้ 1 กล่องทุกๆ 6 เลเวล (16 กล่อง)</li>
            <li style="font-size: 0.72rem;"><strong>เลเวล 301 - 400 ของขั้น:</strong> ได้ 1 กล่องทุกๆ 4 เลเวล (25 กล่อง)</li>
            <li style="font-size: 0.72rem;"><strong>เลเวล 401 - 500 ของขั้น:</strong> ได้ 1 กล่องทุกๆ 2 เลเวล (50 กล่อง)</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.panel-title {
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

/* Left panel style details */
.left-control-panel {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
}

.inputs-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label .badge {
  background: rgba(255, 70, 85, 0.15);
  color: var(--color-primary);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

/* Custom Numeric Picker Styles */
.custom-numeric-picker {
  display: flex;
  align-items: center;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.custom-numeric-picker:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 70, 85, 0.15);
}

.picker-btn {
  background: rgba(255, 255, 255, 0.02);
  border: none;
  color: var(--text-secondary);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.picker-btn:hover:not(:disabled) {
  background: rgba(255, 70, 85, 0.1);
  color: var(--color-primary);
}

.picker-btn:active:not(:disabled) {
  background: rgba(255, 70, 85, 0.2);
  transform: scale(0.95);
}

.picker-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.picker-btn svg {
  width: 1rem;
  height: 1rem;
}

.input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-container .form-input {
  border: none;
  background: transparent;
  text-align: center;
  height: 44px;
  padding: 0;
  border-radius: 0;
  width: 100%;
}

.input-container .form-input:focus {
  border: none;
  box-shadow: none;
  outline: none;
}

/* Hide standard HTML5 number input spinners */
.input-container input[type="number"]::-webkit-outer-spin-button,
.input-container input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-container input[type="number"] {
  -moz-appearance: textfield;
}

.limit-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-gaming);
  font-size: 0.8rem;
  color: var(--text-muted);
  pointer-events: none;
}

.text-highlight {
  font-weight: 600;
  font-family: var(--font-gaming);
  letter-spacing: 0.05em;
  padding-right: 4.5rem; /* Make room for the indicator */
}

.input-tip {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Presets wrapper styling */
.preset-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.preset-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: var(--text-secondary);
  font-family: var(--font-gaming);
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0.4rem 0.25rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.preset-btn:hover {
  background: rgba(255, 70, 85, 0.08);
  border-color: rgba(255, 70, 85, 0.2);
  color: white;
}

.preset-btn.preset-max:hover {
  background: rgba(255, 176, 31, 0.12);
  border-color: rgba(255, 176, 31, 0.3);
  color: var(--color-gold);
}

.preset-btn.preset-reset:hover {
  background: rgba(220, 38, 38, 0.15);
  border-color: rgba(220, 38, 38, 0.3);
  color: #fca5a5;
}

.info-rules-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

.info-rules-card h4 {
  font-size: 0.8rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.info-rules-card ul {
  list-style: none;
}

.info-rules-card li {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  position: relative;
  padding-left: 0.75rem;
}

.info-rules-card li::before {
  content: "•";
  color: var(--color-primary);
  position: absolute;
  left: 0;
}

/* Heirloom Shards Field Styles */
.heirloom-group {
  margin-top: 0.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  padding-top: 1.25rem;
}

.heirloom-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  background: rgba(255, 70, 85, 0.03);
  border: 1px solid rgba(255, 70, 85, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all var(--transition-fast);
}

.heirloom-checkbox-wrapper:hover {
  background: rgba(255, 70, 85, 0.06);
  border-color: rgba(255, 70, 85, 0.2);
}

.heirloom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid rgba(255, 70, 85, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  color: white;
}

.heirloom-checkbox.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 10px rgba(255, 70, 85, 0.4);
}

.heirloom-checkbox svg {
  width: 12px;
  height: 12px;
}

.heirloom-label {
  display: flex;
  flex-direction: column;
}

.heirloom-label .main-lbl {
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
}

.heirloom-label .sub-lbl {
  font-size: 0.7rem;
  color: var(--color-primary);
  font-family: var(--font-gaming);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.heirloom-input-block {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid rgba(255, 70, 85, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alert-tip {
  color: #fca5a5 !important;
  font-weight: 600;
}

/* Animations for picker container */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
