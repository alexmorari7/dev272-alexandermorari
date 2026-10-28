

export const IMPORTANCE_OPTIONS = ["Low", "Medium", "High", "Critical"] as const;
export type Importance = (typeof IMPORTANCE_OPTIONS)[number];

export const CATEGORY_GROUPS = {
  Physical: ["Practices", "Games", "Training", "Conditioning"],
  Feedback: ["Coach Feedback", "Film Study", "Team Performance"],
  Recovery: ["Nutrition & Recovery", "Sleep", "Injury & Rehab"],
  "Self-Assessment": ["Focus Items", "Goals", "Game Notes", "Practice Notes"],
} as const;
export type CategoryGroup = keyof typeof CATEGORY_GROUPS;
export const GROUP_OPTIONS = Object.keys(CATEGORY_GROUPS) as CategoryGroup[];

export type JournalItem = {
  id: string;
  group: CategoryGroup;
  category: string;
  summary: string;
  status: string;
  minutes: number;
  location: string;
  date: string;
  importance: Importance;
  remind: boolean;
  productivity: number;
};

export const STATUS_OPTIONS = [
  "Completed",
  "Recorded",
  "Updated",
  "In Progress",
  "Added",
  "Active",
  "Tracked",
] as const;

export type NewJournalItem = Omit<JournalItem, "id">;
