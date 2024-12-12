import { useContext, useSyncExternalStore } from "react";
import { ModalContext } from "../context/ModalProvider";
import { ModalManager } from "../model";

// 전역 상태를 사용하는 커스텀 훅
export const useStore = <T>(selector: (state: T) => any): any => {
  const store = useContext(ModalContext);

  if (!store) {
    throw new Error("useStore must be used within a ModalProvider");
  }

  // 상태를 선택하고 구독
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState())
  );
};
