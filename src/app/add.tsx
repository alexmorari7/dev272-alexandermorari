import { useJournalProgress } from "@/context/JournalProgressContext";
import { CATEGORY_GROUPS, GROUP_OPTIONS, IMPORTANCE_OPTIONS, STATUS_OPTIONS } from "@/data/soccerJournal";
import { EntryFormValues, entryValidationSchema, toISODate } from "@/utils/entryValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AddEntryScreen() {
  const router = useRouter();
  const { addItem } = useJournalProgress();
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entryValidationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      group: undefined,
      category: "",
      summary: "",
      status: undefined,
      minutes: "",
      location: "",
      importance: undefined,
      remind: false,
      productivity: "",
      date: toISODate(new Date()),
    },
  });

  const selectedGroup = watch("group");

  const onSubmit = (values: EntryFormValues) => {
    addItem({
      group: values.group,
      category: values.category,
      summary: values.summary.trim(),
      status: values.status,
      minutes: Number(values.minutes),
      location: values.location.trim(),
      importance: values.importance,
      remind: values.remind,
      productivity: Number(values.productivity),
      date: values.date,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Controller
          control={control}
          name="group"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Group</Text>
              <View style={styles.chips}>
                {GROUP_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    onPress={() => {
                      onChange(option);
                      onBlur();
                    }}
                    style={[styles.chip, value === option && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, value === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.group && <Text style={styles.error}>{errors.group.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={[styles.input, errors.category && styles.inputError]}
                placeholder={selectedGroup ? "Type or tap a suggestion" : "e.g. Practices"}
                autoCapitalize="words"
                returnKeyType="next"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {selectedGroup && (
                <View style={styles.chips}>
                  {CATEGORY_GROUPS[selectedGroup].map((option) => (
                    <Pressable
                      key={option}
                      accessibilityRole="button"
                      onPress={() => {
                        onChange(option);
                        onBlur();
                      }}
                      style={[styles.chip, value === option && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, value === option && styles.chipTextSelected]}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
              {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="summary"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Summary</Text>
              <TextInput
                style={[styles.input, styles.multiline, errors.summary && styles.inputError]}
                placeholder="Describe this entry"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoCapitalize="sentences"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {errors.summary && <Text style={styles.error}>{errors.summary.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="minutes"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Minutes (1-300)</Text>
              <TextInput
                style={[styles.input, errors.minutes && styles.inputError]}
                placeholder="e.g. 60"
                keyboardType="number-pad"
                maxLength={3}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {errors.minutes && <Text style={styles.error}>{errors.minutes.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <View style={styles.switchRow}>
                <Text style={styles.label}>Date</Text>
                {Platform.OS === "ios" ? (
                  <DateTimePicker
                    value={new Date(`${value}T12:00:00`)}
                    mode="date"
                    maximumDate={new Date()}
                    onChange={(_, selected) => {
                      if (selected) onChange(toISODate(selected));
                      onBlur();
                    }}
                  />
                ) : (
                  <Pressable style={styles.chip} onPress={() => setShowAndroidPicker(true)}>
                    <Text style={styles.chipText}>{value}</Text>
                  </Pressable>
                )}
              </View>
              {showAndroidPicker && (
                <DateTimePicker
                  value={new Date(`${value}T12:00:00`)}
                  mode="date"
                  maximumDate={new Date()}
                  onChange={(_, selected) => {
                    setShowAndroidPicker(false);
                    if (selected) onChange(toISODate(selected));
                    onBlur();
                  }}
                />
              )}
              {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="productivity"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Productivity (1-10)</Text>
              <TextInput
                style={[styles.input, errors.productivity && styles.inputError]}
                placeholder="How productive was it?"
                keyboardType="number-pad"
                maxLength={2}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {errors.productivity && <Text style={styles.error}>{errors.productivity.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Location (optional)</Text>
              <TextInput
                style={[styles.input, errors.location && styles.inputError]}
                placeholder="e.g. Home field"
                autoCapitalize="words"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.chips}>
                {STATUS_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    onPress={() => {
                      onChange(option);
                      onBlur();
                    }}
                    style={[styles.chip, value === option && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, value === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="importance"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Importance</Text>
              <View style={styles.chips}>
                {IMPORTANCE_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    onPress={() => {
                      onChange(option);
                      onBlur();
                    }}
                    style={[styles.chip, value === option && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, value === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.importance && <Text style={styles.error}>{errors.importance.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="remind"
          render={({ field: { onChange, value } }) => (
            <View style={[styles.field, styles.switchRow]}>
              <Text style={styles.label}>Remind me</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />

        <Pressable style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, gap: 16, paddingBottom: 40 },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: "600", color: "#111827" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  multiline: { minHeight: 90 },
  inputError: { borderColor: "#dc2626" },
  error: { color: "#dc2626", fontSize: 13 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
  },
  chipSelected: { backgroundColor: "#2563eb" },
  chipText: { fontSize: 14, fontWeight: "600", color: "#111827" },
  chipTextSelected: { color: "#fff" },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});