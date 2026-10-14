import { useJournalProgress } from "@/context/JournalProgressContext";
import { journalData } from "@/data/soccerJournal";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const { completedCount } = useJournalProgress();
  const remaining = journalData.length - completedCount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this app</Text>
      <Text style={styles.body}>
        This soccer journal tracks training and game reflections. Use the list to open each entry and
        mark progress.
      </Text>
      <View style={styles.card}>
        <Text style={styles.metric}>Completed: {completedCount}</Text>
        <Text style={styles.metric}>Remaining: {remaining}</Text>
      </View>
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
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
  },
  card: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    gap: 6,
  },
  metric: {
    fontSize: 15,
    fontWeight: "600",
  },
});