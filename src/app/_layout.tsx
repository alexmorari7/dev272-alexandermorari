import { JournalProgressProvider } from "@/context/JournalProgressContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <JournalProgressProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="add" options={{ title: "Add Entry", headerBackTitle: "Journal" }} />
          <Stack.Screen name="places/[id]" options={{ title: "Entry Details", headerBackTitle: "Journal" }} />
        </Stack>
      </JournalProgressProvider>
    </QueryClientProvider>
  );
}