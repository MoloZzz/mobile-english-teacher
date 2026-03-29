import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RatingButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant: "dontKnow" | "know";
  style?: any;
}

export function RatingButton({
  children,
  onPress,
  variant,
  style,
}: RatingButtonProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "dontKnow":
        return "#EF4444";
      case "know":
        return "#10B981";
      default:
        return "#3B82F6";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
  },
});
