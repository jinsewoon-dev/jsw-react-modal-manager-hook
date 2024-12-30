import { ModalItem } from "../types";

const createStore = <T>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (newState: Partial<T>) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener); // 구독 취소
    },
  };
};

export const modalStore = createStore<{ modals: ModalItem[] }>({ modals: [] });
