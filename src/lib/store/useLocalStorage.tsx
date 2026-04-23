import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (valuetoStore: T) => void] {
  const getStoreValue = () => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const temp = localStorage.getItem(key);
      return temp ? (JSON.parse(temp) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoreValue);

  function updateStorage(valuetoStore: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(valuetoStore));
    setStoredValue(valuetoStore);
  }

  return [storedValue, updateStorage];
}
