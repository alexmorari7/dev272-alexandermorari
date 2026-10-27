import { GROUP_OPTIONS, IMPORTANCE_OPTIONS, STATUS_OPTIONS } from "@/data/soccerJournal";
import { z } from "zod";

export function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const entryValidationSchema = z.object({
  group: z.enum(GROUP_OPTIONS, { message: "Pick a group" }),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(30, "Category must be 30 characters or fewer"),
  summary: z
    .string()
    .trim()
    .min(10, "Summary must be at least 10 characters")
    .max(200, "Summary must be 200 characters or fewer"),
  status: z.enum(STATUS_OPTIONS, { message: "Pick a status" }),
  minutes: z
    .string()
    .trim()
    .min(1, "Minutes is required")
    .regex(/^\d+$/, "Minutes must be a whole number")
    .refine((value) => Number(value) >= 1 && Number(value) <= 300, "Minutes must be between 1 and 300"),
  location: z.string().trim().max(40, "Location must be 40 characters or fewer"),
  importance: z.enum(IMPORTANCE_OPTIONS, { message: "Pick an importance level" }),
  remind: z.boolean(),
  productivity: z
    .string()
    .trim()
    .min(1, "Productivity is required")
    .regex(/^\d+$/, "Productivity must be a whole number")
    .refine((value) => Number(value) >= 1 && Number(value) <= 10, "Productivity must be between 1 and 10"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")
    .refine((value) => value <= toISODate(new Date()), "Date can't be in the future"),
});

export type EntryFormValues = z.infer<typeof entryValidationSchema>;