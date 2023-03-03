// credits to https://usehooks.com/useLocalStorage/

import { useEffect, useState } from "react";
import { useUpdateUserSetting, useUserSetting } from "../api/useUserSetting";

import { TableKey } from "../contracts/keys";
import { useDebounce } from "./useDebounce";

export function useTableState<T>(
  key: TableKey,
  initialValue: T,
  userId: number
) {
  const userSettingData = useUserSetting(key);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Parse stored json or if none return initialValue
      console.log(JSON.parse(userSettingData?.value ?? "[]"));
      return userSettingData
        ? (JSON.parse(userSettingData.value) as T)
        : initialValue;
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

  const settingMutation = useUpdateUserSetting();

  // /**Save table settings to localStorage */
  const debouncedState = useDebounce<T>(storedValue, 1500);

  function saveSetting(val: T) {
    settingMutation.updateUserSetting({
      key,
      value: JSON.stringify(val),
      userId,
    });
  }

  useEffect(() => {
    const val = debouncedState;

    saveSetting(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedState, key]);

  return [storedValue, setValue] as const;
}
