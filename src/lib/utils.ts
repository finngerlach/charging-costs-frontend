import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Duration } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPaddedDuration(duration: Duration): string {
  return `${String(duration.hours || 0).padStart(2, "0")}:${String(
    duration.minutes || 0,
  ).padStart(2, "0")}:${String(duration.seconds || 0).padStart(2, "0")}`
}

export function formatPaddedDateTime(date: Date): string {
  return `${formatPaddedDate(date)} ${formatPaddedTime(date)}`
}

export function formatPaddedDate(date: Date): string {
  return date.toLocaleString(window.navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function formatPaddedTime(date: Date): string {
  return date.toLocaleString(window.navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}
