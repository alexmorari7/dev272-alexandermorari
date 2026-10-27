
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

export const journalData: JournalItem[] = [
  {
    id: "1",
    group: "Physical",
    category: "Practices",
    summary: "Worked on passing accuracy and defensive shape",
    status: "Completed",
    minutes: 90,
    location: "Home field",
    date: "2026-10-01",
    importance: "Medium",
    remind: false,
    productivity: 6,
  },
  {
    id: "2",
    group: "Physical",
    category: "Games",
    summary: "Match vs. Skyline High, decent midfield performance",
    status: "Recorded",
    minutes: 80,
    location: "Skyline High",
    date: "2026-10-03",
    importance: "High",
    remind: true,
    productivity: 8,
  },
  {
    id: "3",
    group: "Physical",
    category: "Conditioning",
    summary: "Sprint intervals and combination of plyometrics with sprinting",
    status: "Completed",
    minutes: 45,
    location: "Track",
    date: "2026-10-05",
    importance: "Medium",
    remind: false,
    productivity: 9,
  },
  {
    id: "4",
    group: "Feedback",
    category: "Team Performance",
    summary: "Energy level high, good communication and positive attitude",
    status: "Updated",
    minutes: 90,
    location: "",
    date: "2026-10-07",
    importance: "Low",
    remind: false,
    productivity: 5,
  },
  {
    id: "5",
    group: "Feedback",
    category: "Film Study",
    summary: "Reviewed positioning and mistakes",
    status: "In Progress",
    minutes: 30,
    location: "Home",
    date: "2026-10-09",
    importance: "Medium",
    remind: true,
    productivity: 3,
  },
  {
    id: "6",
    group: "Self-Assessment",
    category: "Game Notes",
    summary: "Need quicker decision making under pressure",
    status: "Added",
    minutes: 20,
    location: "",
    date: "2026-10-11",
    importance: "High",
    remind: true,
    productivity: 7,
  },
  {
    id: "7",
    group: "Self-Assessment",
    category: "Practice Notes",
    summary: "Improve first touch and ball control",
    status: "Added",
    minutes: 15,
    location: "",
    date: "2026-10-13",
    importance: "Medium",
    remind: false,
    productivity: 6,
  },
  {
    id: "8",
    group: "Self-Assessment",
    category: "Focus Items",
    summary: "Stay composed, scan the field more often",
    status: "Active",
    minutes: 10,
    location: "",
    date: "2026-10-15",
    importance: "High",
    remind: true,
    productivity: 4,
  },
  {
    id: "9",
    group: "Recovery",
    category: "Nutrition & Recovery",
    summary: "Hydration good, slept 8 hours, light soreness in legs",
    status: "Tracked",
    minutes: 15,
    location: "",
    date: "2026-10-17",
    importance: "Low",
    remind: false,
    productivity: 2,
  },
  {
    id: "10",
    group: "Feedback",
    category: "Coach Feedback",
    summary: "Coach says to work on first touch under pressure",
    status: "Updated",
    minutes: 10,
    location: "Practice field",
    date: "2026-10-19",
    importance: "Critical",
    remind: true,
    productivity: 5,
  },
];
