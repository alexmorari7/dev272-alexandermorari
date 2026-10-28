import { loadJson, saveJson } from "@/lib/storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "journal.completedIds";

type JournalProgressContextValue = {
  completedIds: string[];
  isCompleted: (id: string) => boolean;
  toggleCompleted: (id: string) => void;
};

const JournalProgressContext = createContext<JournalProgressContextValue | undefined>(undefined);

export function JournalProgressProvider({ children }: { children: ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadJson<string[]>(STORAGE_KEY, []).then((saved) => {
      setCompletedIds(saved);
      setHydrated(true);
    });
  }, []);

  // Don't save until hydrated, or the empty initial state would overwrite what's stored.
  useEffect(() => {
    if (hydrated) {
      saveJson(STORAGE_KEY, completedIds).catch(console.error);
    }
  }, [completedIds, hydrated]);

  const toggleCompleted = useCallback((id: string) => {
    setCompletedIds((current) =>
      current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id]
    );
  }, []);

  const value = useMemo<JournalProgressContextValue>(
    () => ({
      completedIds,
      isCompleted: (id) => completedIds.includes(id),
      toggleCompleted,
    }),
    [completedIds, toggleCompleted]
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