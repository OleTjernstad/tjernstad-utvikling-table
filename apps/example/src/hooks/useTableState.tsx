// credits to https://usehooks.com/useLocalStorage/

import { useEffect, useState } from "react";

import { TableKey } from "../contracts/keys";
import { UserSetting } from "../contracts/user";
import { useDebounce } from "./useDebounce";

export function useTableState<T>(key: TableKey, initialValue: T) {
  const userSettingData = useUserSetting(key);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Parse stored json or if none return initialValue
      return userSettingData ? (userSettingData.value as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  // /**Save table settings to localStorage */
  const debouncedState = useDebounce<T>(storedValue, 1500);

  function saveSetting(val: T) {
    localStorage.setItem(key, JSON.stringify({ value: val, key }));
  }

  useEffect(() => {
    const val = debouncedState;

    saveSetting(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedState, key]);

  return [storedValue, setValue] as const;
}

function useUserSetting(key: TableKey) {
  const json = localStorage.getItem(key);

  if (json !== undefined && json !== null && json !== "undefined") {
    const data = json
      ? (JSON.parse(json ?? "{}") as unknown as UserSetting)
      : undefined;

    return data;
  }
  return undefined;
}
