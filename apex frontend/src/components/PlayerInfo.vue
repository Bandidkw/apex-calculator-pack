<script setup lang="ts">
import { useTracker } from "../composables/useTracker";

const { state } = useTracker();

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
      <!-- Player Level Field -->
      <div class="form-group">
        <label for="player-level" class="form-label">
          <span>เลเวลตัวละครของคุณ (Player Level)</span>
          <span class="badge">สูงสุด 2000</span>
        </label>
        <div class="input-with-limit">
          <input
            type="number"
            id="player-level"
            :value="state.playerLevel"
            @input="onLevelInput"
            min="1"
            max="2000"
            class="form-input text-highlight"
          />
          <span class="limit-indicator">LV. {{ state.playerLevel }}</span>
        </div>
        <p class="input-tip">
          คำนวณอัตโนมัติตามระดับ Prestige 1 - 3 (เลเวลสะสมเต็มจะได้ 349 กล่อง)
        </p>
      </div>

      <!-- Misc Packs Field -->
      <div class="form-group">
        <label for="misc-packs" class="form-label">
          <span>กล่องกิจกรรม / ซื้อเพิ่มจากร้านค้า (Miscellaneous Packs)</span>
        </label>
        <input
          type="number"
          id="misc-packs"
          :value="state.miscPacks"
          @input="onMiscInput"
          min="0"
          class="form-input text-highlight"
        />
        <p class="input-tip">
          กล่องจาก Event, โค้ดแลกฟรี, หรือ Twitch Prime Gaming
        </p>
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
      <ul>
        <li><strong>เลเวล 2 - 20:</strong> ได้ 1 กล่องต่อ 1 เลเวล (รวม 19 กล่อง)</li>
        <li><strong>เลเวล 22 - 300:</strong> ได้ 1 กล่องทุกๆ 2 เลเวล (รวม 140 กล่อง)</li>
        <li><strong>เลเวล 305 - 500:</strong> ได้ 1 กล่องทุกๆ 5 เลเวล (รวม 40 กล่อง)</li>
        <li><strong>เลเวล 501 - 1000:</strong> ได้ 1 กล่องทุกๆ 10 เลเวล (รวม 50 กล่อง)</li>
        <li><strong>เลเวล 1001 - 1500:</strong> ได้ 1 กล่องทุกๆ 15 เลเวล (รวม 50 กล่อง)</li>
        <li><strong>เลเวล 1501 - 2000:</strong> ได้ 1 กล่องทุกๆ 15 เลเวล (รวม 50 กล่อง)</li>
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

.input-with-limit {
  position: relative;
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
</style>
