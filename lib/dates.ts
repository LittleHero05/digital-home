const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Today's date in the visitor's own time zone, as "YYYY-MM-DD".
export function localIsoDate(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// "2026-09-23" -> "Wed · 23.09.2026"
export function formatNotebookDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday} · ${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

// Whole days from one "YYYY-MM-DD" to another.
export function daysBetween(fromIso: string, toIso: string) {
  const toUtc = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toUtc(toIso) - toUtc(fromIso)) / 86_400_000);
}
