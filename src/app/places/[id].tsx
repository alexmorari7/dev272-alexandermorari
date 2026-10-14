import { useJournalProgress } from "@/context/JournalProgressContext";
import { journalData } from "@/data/soccerJournal";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function JournalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = journalData.find((entry) => entry.id === id);
  const { isCompleted, toggleCompleted } = useJournalProgress();

  const listButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to journal list"
      onPress={() => (router.canGoBack() ? router.back() : router.replace("/(drawer)"))}
      style={styles.listButton}
    >
      <MaterialIcons name="format-list-bulleted" size={28} color="#1f2937" />
    </Pressable>
  );

  if (!item) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.title}>Entry not found</Text>
        <Text style={styles.value}>No journal item matches id "{id}".</Text>
        {listButton}
      </View>
    );
  }

  const complete = isCompleted(item.id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: item.category }} />
      <Text style={styles.title}>{item.category}</Text>
      <View style={styles.field}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{item.id}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Summary</Text>
        <Text style={styles.value}>{item.summary}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
      <Pressable
        style={[styles.button, complete && styles.buttonComplete]}
        onPress={() => toggleCompleted(item.id)}
      >
        <Text style={styles.buttonText}>{complete ? "Marked complete" : "Mark as complete"}</Text>
      </Pressable>
      {listButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  field: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 16,
    color: "#111827",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonComplete: {
    backgroundColor: "#16a34a",
  },
  listButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
