import { createJournalItem, fetchJournalItem, fetchJournalItems } from "@/api/journalApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const JOURNAL_KEY = ["journalItems"] as const;

export function useJournalItems() {
  return useQuery({ queryKey: JOURNAL_KEY, queryFn: fetchJournalItems });
}

export function useJournalItem(id: string) {
  return useQuery({ queryKey: [...JOURNAL_KEY, id], queryFn: () => fetchJournalItem(id) });
}

export function useCreateJournalItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJournalItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: JOURNAL_KEY }),
  });
}