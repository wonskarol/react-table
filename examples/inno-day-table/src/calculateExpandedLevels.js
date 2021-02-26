export function calculateExpandedLevels(expanded) {
  const rowIds = Object.keys(expanded);
  if (rowIds.length === 0) {
    return 0;
  }

  return Math.max(...rowIds.map((rowId) => rowId.split(".").length))
}