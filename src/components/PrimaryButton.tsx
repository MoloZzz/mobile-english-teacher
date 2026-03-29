import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PrimaryButtonProps {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

export function PrimaryButton({
  children,
  onPress,
  disabled,
  style,
}: PrimaryButtonProps) {
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
    backgroundColor: "#3B82F6",
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
  disabled: {
    backgroundColor: "#64748B",
  },
  text: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#94A3B8",
  },
});
