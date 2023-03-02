import { StorageKeys, TableKey } from "../contracts/keys";

import { UserSetting } from "../contracts/user";

export function useUserSetting(key: TableKey) {
  const json = localStorage.getItem(StorageKeys.userSettings);

  console.log({ json });
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
  }: {
    key: string;
    value: string;
  }) {
    const json = localStorage.getItem(StorageKeys.userSettings);
    const settings = json
      ? (JSON.parse(json) as unknown as UserSetting[])
      : null;
    localStorage.setItem(
      StorageKeys.userSettings,
      JSON.stringify(
        settings?.map((d) => (d.key === `${d.userId}-${key}` ? value : d))
      )
    );
    return value;
  }

  return { updateUserSetting };
}
