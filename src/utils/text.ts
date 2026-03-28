/** Split a comma-separated list; trims entries and drops empties. */
export function splitCommaSeparated(raw: string): string[] {
  return raw.split(',').map((part) => part.trim()).filter(Boolean);
}
