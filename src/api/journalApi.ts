import { supabase } from "@/lib/supabase";
import { JournalItem, NewJournalItem } from "@/types/journal";

const TABLE = "journal_items";
const COLUMNS = "id,group,category,summary,status,minutes,location,date,importance,remind,productivity";

export async function fetchJournalItems(): Promise<JournalItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<JournalItem[]>();
  if (error) throw error;
  return data;
}

export async function fetchJournalItem(id: string): Promise<JournalItem | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle<JournalItem>();
  if (error) throw error;
  return data;
}

// The id is omitted because the database generates it with gen_random_uuid().
export async function createJournalItem(input: NewJournalItem): Promise<JournalItem> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select(COLUMNS)
    .single<JournalItem>();
  if (error) throw error;
  return data;
}

// TEMPORARY smoke test to print the number of records
fetchJournalItems()
  .then((rows) => console.log(rows.length, "journal items"))
  .catch(console.error);