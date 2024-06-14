import { toast, Slide } from "react-toastify";
import WebApp from "@twa-dev/sdk";

let lastNotificationTime = 0;
export const copyToClipboard = (text: string, notifyMessage: string) => {
  navigator.clipboard.writeText(text);

  const currentTime = Date.now();

  // Prevent spamming notifications
  // show only one notification every 20 seconds
  if (currentTime - lastNotificationTime > 3000) {
    notifySuccess(notifyMessage);
    WebApp.HapticFeedback.impactOccurred("light");

    lastNotificationTime = currentTime;
  }
};

export const truncateAddress = (
  address: string,
  startChars: number = 4,
  endChars: number = 4
): string => {
  if (!address) return "";
  const start = address.slice(0, startChars);
  const end = address.slice(-endChars);
  return `${start}...${end}`;
};

// Toast notifications

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

export function formatNumber(value: number): string {
  if (value >= 1000) {
    const suffixes = ["", "k", "M", "B", "T"];
    const suffixIndex = Math.floor(Math.log10(value) / 3);
    const shortValue =
      Math.floor((value / Math.pow(1000, suffixIndex)) * 10) / 10;

    return `${shortValue}${suffixes[suffixIndex]}`;
  }

  return value.toString();
}

export const formatDate = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}.${minutes}`;
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
