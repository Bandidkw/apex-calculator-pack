import { reactive, watch, computed } from "vue";
import { SEASON_MAPPINGS } from "../data/seasonMappings";

export interface OldSeason {
  played: boolean;
  bpLevel: number;
  isPremium: boolean;
  completedTreasure: boolean;
}

export interface NewSeason {
  s1Played: boolean;
  s1BpLevel: number;
  s1Premium: boolean;
  s1UltimatePlus: boolean;
  s2Played: boolean;
  s2BpLevel: number;
  s2Premium: boolean;
  s2UltimatePlus: boolean;
}

export interface TrackerState {
  playerLevel: number;
  miscPacks: number;
  hasHeirloomBefore: boolean;
  lastHeirloomPackCount: number;
  seasonsData: {
    [key: string]: OldSeason | NewSeason;
  };
}

const LOCAL_STORAGE_KEY = "apex_tracker_data";

// Helper to determine if a season is Old (1-21) or New (22+)
export const isOldSeason = (seasonNo: number): boolean => seasonNo <= 21;

// List of all seasons to support (1 to 29)
export const SEASONS_LIST = Array.from({ length: 29 }, (_, i) => i + 1);

// Helper to get max packs for UI display
export const getSeasonMaxPacks = (
  seasonNo: number,
): { free: number; premium: number } => {
  const mapping = SEASON_MAPPINGS[seasonNo];
  if (mapping) {
    return {
      free: mapping.freeTrack?.length ?? 5,
      premium: mapping.premiumTrack?.length ?? 7,
    };
  }
  return { free: 5, premium: 7 };
};

// Helper function to calculate packs from player level (up to level 2000 in 2026)
export function calculateLevelPacks(level: number): number {
  if (level < 1) return 0;
  let packs = 0;

  // Level 2 - 20: 1 pack per level (total 19 packs)
  const lvl20 = Math.min(level, 20);
  if (lvl20 >= 2) {
    packs += lvl20 - 1;
  }

  // Level 21 - 300: 1 pack every 2 levels (total 140 packs)
  if (level > 20) {
    const lvl300 = Math.min(level, 300);
    packs += Math.floor((lvl300 - 20) / 2);
  }

  // Level 301 - 500: 1 pack every 5 levels (total 40 packs)
  if (level > 300) {
    const lvl500 = Math.min(level, 500);
    packs += Math.floor((lvl500 - 300) / 5);
  }

  // Level 501 - 1000 (Prestige 1): 1 pack every 10 levels (total 50 packs)
  if (level > 500) {
    const lvl1000 = Math.min(level, 1000);
    packs += Math.floor((lvl1000 - 500) / 10);
  }

  // Level 1001 - 1500 (Prestige 2): 1 pack every 10 levels (total 50 packs)
  if (level > 1000) {
    const lvl1500 = Math.min(level, 1500);
    packs += Math.floor((lvl1500 - 1000) / 10);
  }

  // Level 1501 - 2000 (Prestige 3): 1 pack every 10 levels (total 50 packs)
  if (level > 1500) {
    const lvl2000 = Math.min(level, 2000);
    packs += Math.floor((lvl2000 - 1500) / 10);
  }

  return packs;
}

// Generate default state
function createDefaultState(): TrackerState {
  const seasonsData: { [key: string]: OldSeason | NewSeason } = {};

  SEASONS_LIST.forEach((season) => {
    if (isOldSeason(season)) {
      seasonsData[season.toString()] = {
        played: false,
        bpLevel: 110,
        isPremium: false,
        completedTreasure: false,
      };
    } else {
      seasonsData[season.toString()] = {
        s1Played: false,
        s1BpLevel: 60,
        s1Premium: false,
        s1UltimatePlus: false,
        s2Played: false,
        s2BpLevel: 60,
        s2Premium: false,
        s2UltimatePlus: false,
      };
    }
  });

  return {
    playerLevel: 1,
    miscPacks: 0,
    hasHeirloomBefore: false,
    lastHeirloomPackCount: 0,
    seasonsData,
  };
}

// Load initial state from local storage or create default
const loadState = (): TrackerState => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const defaultState = createDefaultState();

      // Deep merge / fill missing keys to prevent breaking changes if data structure changes
      const mergedSeasons: { [key: string]: OldSeason | NewSeason } = {
        ...defaultState.seasonsData,
      };

      if (parsed.seasonsData) {
        Object.keys(parsed.seasonsData).forEach((key) => {
          if (mergedSeasons[key]) {
            mergedSeasons[key] = {
              ...mergedSeasons[key],
              ...parsed.seasonsData[key],
            };
          }
        });
      }

      return {
        playerLevel:
          typeof parsed.playerLevel === "number"
            ? parsed.playerLevel
            : defaultState.playerLevel,
        miscPacks:
          typeof parsed.miscPacks === "number"
            ? parsed.miscPacks
            : defaultState.miscPacks,
        hasHeirloomBefore:
          typeof parsed.hasHeirloomBefore === "boolean"
            ? parsed.hasHeirloomBefore
            : defaultState.hasHeirloomBefore,
        lastHeirloomPackCount:
          typeof parsed.lastHeirloomPackCount === "number"
            ? parsed.lastHeirloomPackCount
            : defaultState.lastHeirloomPackCount,
        seasonsData: mergedSeasons,
      };
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
  return createDefaultState();
};

// Global state instance shared across all components
const globalState = reactive<TrackerState>(loadState());

export function useTracker() {
  const state = globalState;

  // Save to localStorage on change
  watch(
    state,
    (newState) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    },
    { deep: true },
  );

  // Computeds for calculation
  const levelPacks = computed(() => calculateLevelPacks(state.playerLevel));

  const seasonsPacks = computed(() => {
    let total = 0;
    Object.keys(state.seasonsData).forEach((key) => {
      const seasonNo = parseInt(key, 10);
      const data = state.seasonsData[key];

      if (isOldSeason(seasonNo)) {
        const oldData = data as OldSeason;
        if (oldData.played) {
          const bpLevel = oldData.bpLevel ?? 110;
          const mapping = SEASON_MAPPINGS[seasonNo];

          if (mapping && mapping.freeTrack && mapping.premiumTrack) {
            total += mapping.freeTrack.filter((lvl) => bpLevel >= lvl).length;
            if (oldData.isPremium) {
              total += mapping.premiumTrack.filter(
                (lvl) => bpLevel >= lvl,
              ).length;
            }
          } else {
            total += Math.floor((bpLevel / 110) * 7); // Free Track
            if (oldData.isPremium) total += Math.floor((bpLevel / 110) * 8); // Premium Track
          }
          if (oldData.completedTreasure) total += 1; // Treasure Pack
        }
      } else {
        const newData = data as NewSeason;
        const mapping = SEASON_MAPPINGS[seasonNo];
        // Split 1
        if (newData.s1Played) {
          const bpLevel = newData.s1BpLevel ?? 60;
          if (mapping && mapping.split1) {
            total += mapping.split1.freeTrack.filter(
              (lvl) => bpLevel >= lvl,
            ).length;
            if (newData.s1Premium || newData.s1UltimatePlus) {
              total += mapping.split1.premiumTrack.filter(
                (lvl) => bpLevel >= lvl,
              ).length;
            }
            if (newData.s1UltimatePlus) total += 7; // Ultimate+ extra packs
          } else {
            total += Math.floor((bpLevel / 60) * 7); // Free Split 1
            if (newData.s1UltimatePlus) {
              total += Math.floor((bpLevel / 60) * 14); // Ultimate+
            } else if (newData.s1Premium) {
              total += Math.floor((bpLevel / 60) * 7); // Premium
            }
          }
        }
        // Split 2
        if (newData.s2Played) {
          const bpLevel = newData.s2BpLevel ?? 60;
          if (mapping && mapping.split2) {
            total += mapping.split2.freeTrack.filter(
              (lvl) => bpLevel >= lvl,
            ).length;
            if (newData.s2Premium || newData.s2UltimatePlus) {
              total += mapping.split2.premiumTrack.filter(
                (lvl) => bpLevel >= lvl,
              ).length;
            }
            if (newData.s2UltimatePlus) total += 7; // Ultimate+ extra packs
          } else {
            total += Math.floor((bpLevel / 60) * 7); // Free Split 2
            if (newData.s2UltimatePlus) {
              total += Math.floor((bpLevel / 60) * 14); // Ultimate+
            } else if (newData.s2Premium) {
              total += Math.floor((bpLevel / 60) * 7); // Premium
            }
          }
        }
      }
    });
    return total;
  });

  const totalPacks = computed(() => {
    return levelPacks.value + seasonsPacks.value + state.miscPacks;
  });

  const guaranteeProgress = computed(() => {
    const total = totalPacks.value;
    const basePacks = state.hasHeirloomBefore
      ? Math.max(0, total - state.lastHeirloomPackCount)
      : total;

    const maxGuarantee = 500;
    const percentage = Math.min((basePacks / maxGuarantee) * 100, 100);
    const remaining = Math.max(maxGuarantee - basePacks, 0);

    return {
      percentage,
      remaining,
      reached: basePacks >= maxGuarantee,
      basePacks,
    };
  });

  // Helper actions
  const resetAll = () => {
    const defaults = createDefaultState();
    state.playerLevel = defaults.playerLevel;
    state.miscPacks = defaults.miscPacks;
    state.hasHeirloomBefore = defaults.hasHeirloomBefore;
    state.lastHeirloomPackCount = defaults.lastHeirloomPackCount;
    Object.keys(defaults.seasonsData).forEach((key) => {
      state.seasonsData[key] = defaults.seasonsData[key];
    });
  };

  const setPremiumAllOld = (premium: boolean) => {
    Object.keys(state.seasonsData).forEach((key) => {
      const seasonNo = parseInt(key, 10);
      if (isOldSeason(seasonNo)) {
        const oldData = state.seasonsData[key] as OldSeason;
        oldData.played = true;
        oldData.isPremium = premium;
      }
    });
  };

  const setPlayedAllOld = (played: boolean) => {
    Object.keys(state.seasonsData).forEach((key) => {
      const seasonNo = parseInt(key, 10);
      if (isOldSeason(seasonNo)) {
        const oldData = state.seasonsData[key] as OldSeason;
        oldData.played = played;
      }
    });
  };

  const setPremiumAllNew = (premiumType: "none" | "premium" | "ultimate") => {
    Object.keys(state.seasonsData).forEach((key) => {
      const seasonNo = parseInt(key, 10);
      if (!isOldSeason(seasonNo)) {
        const newData = state.seasonsData[key] as NewSeason;
        newData.s1Played = true;
        newData.s2Played = true;

        if (premiumType === "none") {
          newData.s1Premium = false;
          newData.s1UltimatePlus = false;
          newData.s2Premium = false;
          newData.s2UltimatePlus = false;
        } else if (premiumType === "premium") {
          newData.s1Premium = true;
          newData.s1UltimatePlus = false;
          newData.s2Premium = true;
          newData.s2UltimatePlus = false;
        } else if (premiumType === "ultimate") {
          newData.s1Premium = false;
          newData.s1UltimatePlus = true;
          newData.s2Premium = false;
          newData.s2UltimatePlus = true;
        }
      }
    });
  };

  return {
    state,
    levelPacks,
    seasonsPacks,
    totalPacks,
    getSeasonMaxPacks,
    guaranteeProgress,
    resetAll,
    setPremiumAllOld,
    setPlayedAllOld,
    setPremiumAllNew,
  };
}
