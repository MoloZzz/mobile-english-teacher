import { StyleSheet } from "react-native";

/** Reused layout and form field styles across screens. */
export const layout = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0F172A",
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E2E8F0",
    marginBottom: 8,
  },
  inputMultiline: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    minHeight: 96,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    color: "#E2E8F0",
    textAlignVertical: "top",
  },
  inputSingle: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    fontSize: 16,
    color: "#E2E8F0",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  hGap: {
    width: 12,
  },
  vGap: {
    height: 12,
  },
});

export const typography = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E2E8F0",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E2E8F0",
    marginBottom: 8,
  },
  context: {
    fontSize: 20,
    color: "#E2E8F0",
    lineHeight: 28,
  },
  answer: {
    fontSize: 18,
    color: "#E2E8F0",
    lineHeight: 24,
  },
  secondary: {
    fontSize: 16,
    color: "#94A3B8",
  },
});
