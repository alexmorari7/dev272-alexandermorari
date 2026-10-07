import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { journalData, JournalItem } from "../data/soccerJournal";

const Row = ({ item }: { item: JournalItem }) => (
  <View style={styles.row}>
    <Text style={styles.rowTitle}>{item.category}</Text>
    <Text style={styles.rowSubtitle}>{item.summary}</Text>
  </View>
);

export default function Index() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query:", query);
  };

  return (
    <FlatList
      data={journalData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Row item={item} />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Alexander's Soccer Journal</Text>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />

            <Pressable style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Go</Text>
            </Pressable>
          </View>
        </View>
      }
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  rowSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
