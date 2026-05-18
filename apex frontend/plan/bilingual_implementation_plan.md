# 🌐 แผนการพัฒนาและปรับปรุงระบบ 2 ภาษา (Bilingual TH / EN Plan)
โปรแกรมคำนวณกล่องสุ่มและรอบการันตี **Apex Packs Calculator (2026)**

แผนงานนี้ได้รับการออกแบบมาเพื่อรองรับผู้ใช้งานทั้งชาวไทยและชาวต่างชาติแบบกึ่งสองภาษาสมบูรณ์ โดยการใช้แนวทาง **Lightweight Reactive Composable** ซึ่งทำงานได้รวดเร็วมาก มีขนาดเล็ก และไม่ต้องติดตั้งแพ็คเกจเพิ่มเติมภายนอก (Zero Dependency)

---

## 🎨 1. แนวทางการออกแบบ UI สำหรับการสลับภาษา (Language Switcher UI)
เราจะสร้างสวิตช์เลือกภาษาดีไซน์พรีเมียม สไตล์ **Glassmorphism Switch** ไว้บนมุมขวาบนของหน้าเว็บ (ข้างปุ่มล้างข้อมูลรีเซ็ต)
* **การแสดงผล:** เป็นปุ่มสไลด์สวยงาม มีไอคอนธงชาติ 🇹🇭 (TH) และ 🇬🇧 (EN) 
* **Micro-animation:** เมื่อสลับภาษา หน้าเว็บจะมีการ Fade-transition เบาๆ เพื่อให้เนื้อหาแสดงผลได้อย่างลื่นไหลและพรีเมียมที่สุด

---

## 🛠️ 2. กลไกการทำระบบภาษา (Technical Architecture)

เราจะสร้างระบบภาษาแบบ **Reactive State** ที่ใช้งานง่ายและสอดคล้องกับโครงสร้าง Vue 3 และ TypeScript ของเดิม ดังนี้:

### ขั้นตอนที่ 1: สร้าง Composable ภาษา `src/composables/useLanguage.ts`
ไฟล์นี้จะเก็บภาษากลางที่กำลังเปิดใช้ลงใน `localStorage` เพื่อให้จำค่าภาษาเดิมของผู้ใช้ไว้แม้จะกดรีเพรชหน้าจอ

```typescript
import { ref, computed } from "vue";

export type Language = "th" | "en";

// ภาษาเริ่มต้น (ดึงจาก localStorage หรือ Default เป็น 'th')
const currentLang = ref<Language>(
  (localStorage.getItem("apex_lang") as Language) || "th"
);

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLang.value = lang;
    localStorage.setItem("apex_lang", lang);
  };

  const toggleLanguage = () => {
    setLanguage(currentLang.value === "th" ? "en" : "th");
  };

  const isEn = computed(() => currentLang.value === "en");
  const isTh = computed(() => currentLang.value === "th");

  return {
    lang: currentLang,
    isEn,
    isTh,
    setLanguage,
    toggleLanguage,
  };
}
```

---

### ขั้นตอนที่ 2: สร้างพจนานุกรมคีย์แปลภาษา `src/data/translations.ts`
รวบรวมคำศัพท์ ข้อความ และกฎของโปรแกรมทั้งหมดเป็นตารางแปลภาษา เพื่อความง่ายต่อการเพิ่ม-ลดคำแปลในอนาคต

```typescript
export const TRANSLATIONS = {
  th: {
    // Header
    appTitle: "APEX LEGENDS",
    appSubtitle: "โปรแกรมคำนวณ Apex Pack และรอบการันตี",
    resetBtn: "รีเซ็ตข้อมูลทั้งหมด",

    // Dashboard Stats
    statsTotalTitle: "กล่องสะสมรวมทั้งหมด",
    statsGuaranteedTitle: "รอบการันตีถัดไปของคุณ",
    statsLevelPacks: "จากเลเวลผู้เล่น",
    statsSeasonPacks: "จากเลเวล Battle Pass",
    statsMiscPacks: "กล่องระบุเพิ่ม/กิจกรรม",
    packsCount: "กล่อง",
    noHeirloomYet: "ยังไม่มีประวัติการได้ชิ้นส่วน",
    heirloomProgress: "สะสมไปแล้ว {progress}/500 กล่อง",

    // Player Info Form
    playerLevelLabel: "ระดับเลเวลผู้เล่นสะสม:",
    miscPacksLabel: "กล่องจากกิจกรรม/ควิซ (ระบุเพิ่ม):",
    heirloomToggleLabel: "เคยได้ Heirloom Shards แล้ว?",
    heirloomInputLabel: "ได้ชิ้นล่าสุดที่กล่องสะสมที่เท่าไหร่?",
    heirloomTip: "* การันตีรอบถัดไปจะเริ่มนับจากกล่องที่ {next} (นับแล้ว {count} กล่อง)",

    // Seasons Tab & Shortcuts
    oldTabTitle: "ซีซั่นเก่า (Season 1 - 21)",
    newTabTitle: "ซีซั่นยุคใหม่ (Season 22+)",
    shortcutTitle: "ปุ่มลัดซีซั่น 1 - 21:",
    shortcutFreePass: "พาสฟรีทั้งหมด",
    shortcutBuyPass: "ซื้อพาสทั้งหมด",
    shortcutTreasureMax: "Treasure ครบ",
    shortcutTreasureClear: "ล้าง Treasure",
    shortcutNoPlayAll: "ไม่เล่นทั้งหมด",

    // Old Season Cards
    playedThisSeason: "เล่นซีซั่นนี้",
    purchasedPremium: "ซื้อพรีเมียมพาส",
    treasureComplete: "เก็บ Treasure Pack ครบ (+1)",
    bpLevelLabel: "เลเวล Battle Pass:",

    // New Season Cards
    newNotPlayed: "ไม่ได้เล่น",
    newNoPass: "ไม่ได้ซื้อพาส",
    newPremium: "Premium (950 Coins)",
    newUltimate: "Ultimate / Ultimate+",
    levelSplit1: "เลเวล Split 1:",
    levelSplit2: "เลเวล Split 2:",

    // Modal Rules
    rulesTitle: "กฎการได้รับกล่องจากเลเวล",
    rulesDesc: "การได้รับกล่องสุ่ม Apex Packs จากการอัปเลเวลตัวละครจะแบ่งเป็นระดับสะสมดังนี้:",
    levelRange1: "เลเวล 2 - 20",
    levelRange2: "เลเวล 22 - 300",
    levelRange3: "เลเวล 305 - 500",
    levelPrestige: "เลเวล จุติใหม่ (Prestige 1 - 3)",
    prestigeDesc: "เมื่อผู้เล่นเลเวลถึง 500 จะมีระบบจุติ (เลเวล 501 - 2000) แชร์รอบละ 500 เลเวล ได้รับสูงสุด 103 กล่องต่อรอบการจุติ ดังนี้:",
    modalSummary: "🏆 หากจุติระดับสะสมเลเวลเต็ม 2000 (Prestige 3 Max) จะได้รับรวมทั้งหมด 538 กล่อง!",
    closeBtn: "ปิดหน้าต่าง",
  },
  en: {
    // Header
    appTitle: "APEX LEGENDS",
    appSubtitle: "Apex Pack & Next Guaranteed Shards Calculator",
    resetBtn: "Reset All Data",

    // Dashboard Stats
    statsTotalTitle: "Total Packs Collected",
    statsGuaranteedTitle: "Your Next Guaranteed Shards",
    statsLevelPacks: "From Player Level",
    statsSeasonPacks: "From Battle Pass Level",
    statsMiscPacks: "From Events & Misc Packs",
    packsCount: "Packs",
    noHeirloomYet: "No heirloom history yet",
    heirloomProgress: "Collected {progress}/500 Packs",

    // Player Info Form
    playerLevelLabel: "Player Account Level:",
    miscPacksLabel: "Packs from Events/Packs (Custom Add):",
    heirloomToggleLabel: "Unlocked Heirloom Shards before?",
    heirloomInputLabel: "At which collected pack number did you unlock it?",
    heirloomTip: "* Next guarantee starts from pack #{next} (Progress: {count} packs)",

    // Seasons Tab & Shortcuts
    oldTabTitle: "Old Seasons (S1 - S21)",
    newTabTitle: "Modern Seasons (S22+)",
    shortcutTitle: "S1 - S21 Quick Tools:",
    shortcutFreePass: "Free Pass All",
    shortcutBuyPass: "Buy Pass All",
    shortcutTreasureMax: "Max Treasure",
    shortcutTreasureClear: "Clear Treasure",
    shortcutNoPlayAll: "Skip Play All",

    // Old Season Cards
    playedThisSeason: "Played This Season",
    purchasedPremium: "Purchased Premium Pass",
    treasureComplete: "Max Treasure Pack (+1 Pack)",
    bpLevelLabel: "Battle Pass Level:",

    // New Season Cards
    newNotPlayed: "Not Played",
    newNoPass: "Free Pass Only",
    newPremium: "Premium (950 Coins)",
    newUltimate: "Ultimate / Ultimate+",
    levelSplit1: "Split 1 Level:",
    levelSplit2: "Split 2 Level:",

    // Modal Rules
    rulesTitle: "Player Level Pack Rules",
    rulesDesc: "Apex Packs rewarded from leveling up your account are scaled as follows:",
    levelRange1: "Level 2 - 20",
    levelRange2: "Level 22 - 300",
    levelRange3: "Level 305 - 500",
    levelPrestige: "Prestige Account Levels (Prestige 1 - 3)",
    prestigeDesc: "After Level 500, prestige rolls over (Levels 501 - 2000) every 500 levels. Earn up to 103 Packs per prestige cycle:",
    modalSummary: "🏆 Reaching max account level 2000 (Prestige 3 Max) rewards a total of 538 Packs!",
    closeBtn: "Close Window",
  }
};
```

---

## 🚀 3. ขั้นตอนการลงมือแปลงระบบ (Implementation Steps)

### 1️⃣ ขั้นที่ 1: เพิ่มฟังก์ชันตัวแปลคำศัพท์ระดับคอมโพเนนต์
สร้างฟังก์ชันช่วยดึงคำศัพท์แปลแบบ Dynamic:
```typescript
import { computed } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { TRANSLATIONS } from "../data/translations";

export function useTranslate() {
  const { lang } = useLanguage();
  
  const t = computed(() => {
    return TRANSLATIONS[lang.value];
  });
  
  return { t };
}
```

### 2️⃣ ขั้นที่ 2: ผูกข้อความคงที่ใน UI ด้วยฟังก์ชัน `t`
เปลี่ยนข้อความต่างๆ จากข้อความภาษาไทยธรรมดา ให้ใช้ตัวแปร `t` ที่ Reactive แทน:
* **ตัวอย่างเดิม:** `<h1>โปรแกรมคำนวณ apex pack</h1>`
* **ตัวอย่างใหม่:** `<h1>{{ t.appSubtitle }}</h1>`

### 3️⃣ ขั้นที่ 3: ออกแบบสวิตช์เลือกภาษาใน Header (`App.vue`)
นำเข้าสวิตช์ 🇹🇭 / 🇬🇧 วางไว้ส่วนหัวของหน้าเว็บ ด้วยการผูกค่าคลิกผ่านฟังก์ชัน `toggleLanguage()` พร้อมอนิเมชันปุ่มสไลด์สวยงาม

---

## 📈 ประโยชน์จากการอัปเกรดแผนนี้:
1. **โค้ดสะอาดยืดหยุ่น:** สามารถเพิ่มภาษาที่ 3 (เช่น 🇯🇵 ภาษาญี่ปุ่น) ได้อย่างรวดเร็วเพียงแค่เพิ่มคีย์แปลในชุดข้อมูล
2. **ประสิทธิภาพสูงสุด:** การสลับภาษารีแอกทีฟทำงานได้ทันทีโดยไม่ต้องโหลดหน้าเว็บใหม่
3. **ดีไซน์ตอบโจทย์ระดับสากล:** เป็นการยกระดับโปรแกรมเครื่องมือชิ้นนี้ให้เป็นเครื่องมือมาตรฐานระดับโลกอย่างสมบูรณ์แบบ!
