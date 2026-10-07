// src/data/soccerJournal.ts

export type JournalItem = {
  id: string;
  category: string;
  summary: string;
  status: string;
};

export const journalData: JournalItem[] = [
  {
    id: "1",
    category: "Practices",
    summary: "Worked on passing accuracy and defensive shape",
    status: "Completed",
  },
  {
    id: "2",
    category: "Games",
    summary: "Match vs. Skyline High, decent midfield performance",
    status: "Recorded",
  },
  {
    id: "3",
    category: "Conditioning",
    summary: "Sprint intervals and combination of plyometrics with sprinting",
    status: "Completed",
  },
  {
    id: "4",
    category: "Team Performance",
    summary: "Energy level high, good communication and positive attitude",
    status: "Updated",
  },
  {
    id: "5",
    category: "Film Study",
    summary: "Reviewed positioning and mistakes",
    status: "In Progress",
  },
  {
    id: "6",
    category: "Game Notes",
    summary: "Need quicker decision making under pressure",
    status: "Added",
  },
  {
    id: "7",
    category: "Practice Notes",
    summary: "Improve first touch and ball control",
    status: "Added",
  },
  {
    id: "8",
    category: "Focus Items",
    summary: "Stay composed, scan the field more often",
    status: "Active",
  },
  {
    id: "9",
    category: "Nutrition & Recovery",
    summary: "Hydration good, slept 8 hours, light soreness in legs",
    status: "Tracked",
  },
  {
    id: "10",
    category: "Coach Feedback",
    summary: "Coach says to work on first touch under pressure",
    status: "Updated",
  },
];
