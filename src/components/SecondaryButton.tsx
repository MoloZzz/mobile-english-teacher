import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SecondaryButtonProps {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

export function SecondaryButton({
  children,
  onPress,
  disabled,
  style,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  disabled: {
    borderColor: "#64748B",
  },
  text: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#94A3B8",
  },
});
