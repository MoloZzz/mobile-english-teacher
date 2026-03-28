import { StyleSheet } from 'react-native';

/** Reused layout and form field styles across screens. */
export const layout = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    minHeight: 96,
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  inputSingle: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginBottom: 24,
    padding: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hGap: {
    width: 16,
  },
});
