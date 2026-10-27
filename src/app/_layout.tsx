import { JournalProgressProvider } from "@/context/JournalProgressContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <JournalProgressProvider>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="add" options={{ title: "Add Entry", headerBackTitle: "Journal" }} />
        <Stack.Screen name="places/[id]" options={{ title: "Entry Details", headerBackTitle: "Journal" }} />
      </Stack>
    </JournalProgressProvider>
  );
}