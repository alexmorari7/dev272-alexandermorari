import { useJournalProgress } from "@/context/JournalProgressContext";
import { JournalItem } from "@/data/soccerJournal";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type RowProps = {
  item: JournalItem;
  isCompleted: boolean;
  onToggleCompleted: () => void;
};

function Row({ item, isCompleted, onToggleCompleted }: RowProps) {
  return (
    <Link href={{ pathname: "/places/[id]", params: { id: item.id } }} asChild>
      <Pressable style={styles.row}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowTitle}>{item.category}</Text>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onToggleCompleted();
            }}
            style={[styles.statusChip, isCompleted && styles.statusChipComplete]}
          >
            <Text style={styles.statusChipText}>{isCompleted ? "Complete" : "Mark done"}</Text>
          </Pressable>
        </View>
        <Text style={styles.rowSubtitle}>{item.summary}</Text>
        <Text style={styles.rowStatus}>Status: {item.status}</Text>
      </Pressable>
    </Link>
  );
}

export default function JournalListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { items, completedCount, isCompleted, toggleCompleted } = useJournalProgress();

  const filteredData = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    if (!lowered) {
      return items;
    }

    return items.filter((item) => {
      const searchableText = `${item.category} ${item.summary} ${item.status}`.toLowerCase();
      return searchableText.includes(lowered);
    });
  }, [items, query]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Row
            item={item}
            isCompleted={isCompleted(item.id)}
            onToggleCompleted={() => toggleCompleted(item.id)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Alexander's Soccer Journal</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add entry"
                onPress={() => router.push("/add")}
                style={styles.addButton}
              >
                <MaterialIcons name="add" size={28} color="#fff" />
              </Pressable>
            </View>
            <Text style={styles.progressText}>
              Completed entries: {completedCount} / {items.length}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Search entries..."
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            <Text style={styles.resultsText}>Results: {filteredData.length}</Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: "700",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
  },
  progressText: {
    fontSize: 14,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  resultsText: {
    fontSize: 13,
    color: "#4b5563",
  },
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  rowSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },
  rowStatus: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
  statusChip: {
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  statusChipComplete: {
    backgroundColor: "#bfdbfe",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

