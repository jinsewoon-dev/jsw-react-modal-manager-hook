import { useSyncExternalStore } from "react";
import { modalStore } from "../stores/modalStore";

export const useModalIds = () => {
  return useSyncExternalStore(
    (callback) => modalStore.subscribe(callback),
    () => modalStore.getSnapshot(),
    () => []
  );
};
