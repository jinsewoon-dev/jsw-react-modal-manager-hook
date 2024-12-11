import React, { createContext, useContext, useSyncExternalStore } from "react";
import { ModalRenderer } from "../layouts/ModalRenderer";
import { Store } from "../store";
import { modalStore } from "../store/modalStore";

// React Context 생성
const ModalContext = createContext<Store<any> | null>(null);

// Provider 컴포넌트
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={modalStore}>
      <ModalRenderer />
      {children}
    </ModalContext.Provider>
  );
};

// 전역 상태를 사용하는 커스텀 훅
export const useStore = <T,>(selector: (state: T) => any): any => {
  const store = useContext(ModalContext);

  if (!store) {
    throw new Error("useStore must be used within a ModalProvider");
  }

  // 상태를 선택하고 구독
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState())
  );
};
