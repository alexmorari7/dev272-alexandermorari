import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type JournalProgressContextValue = {
  completedIds: string[];
  completedCount: number;
  isCompleted: (id: string) => boolean;
  toggleCompleted: (id: string) => void;
};

const JournalProgressContext = createContext<JournalProgressContextValue | undefined>(undefined);

export function JournalProgressProvider({ children }: { children: ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const value = useMemo<JournalProgressContextValue>(
    () => ({
      completedIds,
      completedCount: completedIds.length,
      isCompleted: (id: string) => completedIds.includes(id),
      toggleCompleted: (id: string) => {
        setCompletedIds((current) =>
          current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id]
        );
      },
    }),
    [completedIds]
  );

  return <JournalProgressContext.Provider value={value}>{children}</JournalProgressContext.Provider>;
}

export function useJournalProgress() {
  const context = useContext(JournalProgressContext);
  if (!context) {
    throw new Error("useJournalProgress must be used within a JournalProgressProvider.");
  }

  return context;
}