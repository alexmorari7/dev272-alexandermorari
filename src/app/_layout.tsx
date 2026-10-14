import { JournalProgressProvider } from "@/context/JournalProgressContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <JournalProgressProvider>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="places/[id]" options={{ title: "Entry Details" }} />
      </Stack>
    </JournalProgressProvider>
  );
}