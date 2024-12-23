import { useSyncExternalStore } from "react";
import { modalStore } from "../stores/modalStore";

export const useModalById = (id: string) => {
  return useSyncExternalStore(
    (callback) => {
      const unsubscribe = modalStore.subscribe(callback);
      return () => unsubscribe();
    },
    () => modalStore.getModal(id),
    () => undefined
  );
};
