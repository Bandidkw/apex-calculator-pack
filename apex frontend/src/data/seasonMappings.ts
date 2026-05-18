export interface SplitPackMapping {
  freeTrack: number[];
  premiumTrack: number[]; // เลเวลที่ได้จากพรีเมียม (หรือรวม Ultimate+)
  maxLevel: number;
}

export interface SeasonPackMapping {
  // สำหรับซีซั่น 1 - 21
  freeTrack?: number[];
  premiumTrack?: number[];
  maxLevel?: number;
  // สำหรับซีซั่น 22+ ที่มี 2 Split
  split1?: SplitPackMapping;
  split2?: SplitPackMapping;
}

// ฐานข้อมูลเงื่อนไขการได้รับกล่องของแต่ละซีซั่น (Exact Levels Mapping)
// หากซีซั่นไหนมีข้อมูลอยู่ในนี้ ระบบจะดึงเลเวลไปคำนวณเป๊ะๆ ตามที่ผู้เล่นกรอก
// หากยังไม่มี จะใช้ระบบเฉลี่ย (Proportional) จนกว่าจะมีการเพิ่มข้อมูล
export const SEASON_MAPPINGS: Record<number, SeasonPackMapping> = {
  1: {
    freeTrack: [2, 12, 24, 34, 46],
    premiumTrack: [26, 43, 53, 73, 83, 86, 93],
    maxLevel: 110,
  },
  2: {
    freeTrack: [12, 14, 16, 18, 20], // ได้กล่องธรรมดาหรือฟ้า
    premiumTrack: [5, 12, 22, 32, 50, 82, 92], // รวมกล่องม่วง, ธรรมดา, ทอง
    maxLevel: 110,
  },
  3: {
    freeTrack: [15, 19, 23, 27, 31],
    premiumTrack: [3, 5, 9, 22, 60, 69, 89],
    maxLevel: 110,
  },
  4: {
    freeTrack: [17, 21, 25, 29, 33],
    premiumTrack: [4, 6, 8, 16, 40, 48, 77],
    maxLevel: 110,
  },
  5: {
    freeTrack: [3, 7, 11, 17, 25, 32, 45],
    premiumTrack: [2, 5, 26, 56, 81, 88, 97],
    maxLevel: 110,
  },
  6: {
    freeTrack: [5, 8, 11, 17, 23, 29, 45],
    premiumTrack: [2, 5, 7, 72, 80, 88, 97],
    maxLevel: 110,
  },
  7: {
    freeTrack: [6, 9, 12, 18, 24, 30, 37, 45],
    premiumTrack: [2, 5, 16, 32, 40, 80, 97],
    maxLevel: 110,
  },
  8: {
    freeTrack: [5, 13, 21, 29, 37, 45, 61],
    premiumTrack: [2, 5, 32, 39, 69, 97, 98],
    maxLevel: 110,
  },
  9: {
    freeTrack: [13, 21, 29, 33, 37, 61, 77],
    premiumTrack: [2, 5, 40, 44, 57, 69, 97, 98],
    maxLevel: 110,
  },
  10: {
    freeTrack: [13, 21, 28, 37, 46, 72, 78],
    premiumTrack: [3, 7, 17, 35, 65, 92, 99],
    maxLevel: 110,
  },
  11: {
    freeTrack: [13, 21, 29, 37, 68, 86, 94],
    premiumTrack: [3, 17, 35, 61, 76, 77, 98],
    maxLevel: 110,
  },
};
