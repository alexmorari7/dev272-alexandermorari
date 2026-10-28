import { useJournalItem } from "@/api/journalQueries";
import { useJournalProgress } from "@/context/JournalProgressContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function JournalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isCompleted, toggleCompleted } = useJournalProgress();
  const { data: item, isPending, isError, error, refetch } = useJournalItem(id);

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

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={styles.title}>Could not load entry</Text>
        <Text style={styles.value}>{error.message}</Text>
        <Pressable accessibilityRole="button" style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
        {listButton}
      </View>
    );
  }

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
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: item.category }} />
      <Text style={styles.title}>{item.category}</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Group</Text>
        <Text style={styles.value}>{item.group}</Text>
      </View>
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
      <View style={styles.field}>
        <Text style={styles.label}>Minutes</Text>
        <Text style={styles.value}>{item.minutes}</Text>
      </View>
      {item.location !== "" && (
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{item.location}</Text>
        </View>
      )}
      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Importance</Text>
        <Text style={styles.value}>{item.importance}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Productivity</Text>
        <Text style={styles.value}>{item.productivity} / 10</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Reminder</Text>
        <Text style={styles.value}>{item.remind ? "On" : "Off"}</Text>
      </View>
      <Pressable
        style={[styles.button, complete && styles.buttonComplete]}
        onPress={() => toggleCompleted(item.id)}
      >
        <Text style={styles.buttonText}>{complete ? "Marked complete" : "Mark as complete"}</Text>
      </Pressable>
      {listButton}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
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
