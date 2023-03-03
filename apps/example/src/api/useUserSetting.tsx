import { StorageKeys, TableKey } from "../contracts/keys";

import { UserSetting } from "../contracts/user";

export function useUserSetting(key: TableKey) {
  const json = localStorage.getItem(StorageKeys.userSettings);

  if (json !== undefined && json !== null && json !== "undefined") {
    const data = json
      ? (JSON.parse(json ?? "{}") as unknown as UserSetting[])
      : null;

    return data?.find((d) => d.key === `${d.userId}-${key}`);
  }
  return undefined;
}

export function useUpdateUserSetting() {
  async function updateUserSetting({
    key,
    value,
    userId,
  }: {
    key: string;
    value: string;
    userId: number;
  }) {
    console.log({ value, key, userId });
    const json = localStorage.getItem(StorageKeys.userSettings);
    let settings: UserSetting[] | null = [
      { value, key: `${userId}-${key}`, userId },
    ];

    if (json !== undefined && json !== null && json !== "undefined") {
      settings = json ? (JSON.parse(json) as unknown as UserSetting[]) : [];
      if (!settings?.find((d) => d.key === `${d.userId}-${key}`)) {
        settings = [...settings, { value, key: `${userId}-${key}`, userId }];
      }
    }

    localStorage.setItem(
      StorageKeys.userSettings,
      JSON.stringify(
        settings?.map((d) =>
          d.key === `${d.userId}-${key}`
            ? { value, key: `${d.userId}-${key}`, userId }
            : d
        )
      )
    );
    return { value, key, userId };
  }

  return { updateUserSetting };
}
