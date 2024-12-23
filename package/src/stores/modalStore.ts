// import { generateUniqueId } from "../lib/generateUniqueId";
// import { ModalState } from "../types";

import { generateUniqueId } from "../lib/generateUniqueId";

// type ModalStoreState = ModalState[];

// let currentState: ModalStoreState = [];

// // let cleanupDelay = 300; // 기본 cleanupDelay 설정

// // 상태 변경을 통지

// const listeners = new Set<() => void>();
// const notify = () => listeners.forEach((listener) => listener());
// // 모달 스토어
// export const modalStore = {
//   state:{
// modalIds :[] as string[] ,
// modal: {} as {
//   id:string,
//   component:React.ReactNode,
//   isVisible: boolean
// }
//   },
//   // 상태 구독
//   subscribe: (listener: () => void) => {
//     listeners.add(listener);
//     return () => listeners.delete(listener);
//   },

//   // 상태 가져오기
//   getSnapshot: () => currentState,

//   // cleanupDelay 설정
//   // setCleanupDelay: (delay: number) => {
//   //   cleanupDelay = delay;
//   // },

//   // 모달 열기
//   openModal: (component: React.ReactNode) => {
//     const id = generateUniqueId();
//     currentState = [
//       ...currentState,
//       {
//         id,
//         component,
//         isVisible: true,
//       },
//     ];
//     notify();
//   },

//   // 특정 또는 마지막 모달 닫기
//   closeModal: (id?: string) => {
//     const targetId = id || currentState[currentState.length - 1]?.id;
//     if (!targetId) return;

//     currentState = currentState.map((modal) =>
//       modal.id === targetId ? { ...modal, isVisible: false } : modal
//     );
//     notify();

//     // setTimeout(() => {
//     //   currentState = currentState.filter((modal) => modal.id !== targetId);
//     //   notify();
//     // }, cleanupDelay);
//   },

//   // 모든 모달 닫기
//   closeAllModals: () => {
//     currentState = currentState.map((modal) => ({
//       ...modal,
//       isVisible: false,
//     }));
//     notify();

//     // setTimeout(() => {
//     //   currentState = [];
//     //   notify();
//     // }, cleanupDelay);
//   },
// };

type ModalState = {
  id: string;
  index: number;
  component: React.ReactNode;
  isVisible: boolean;
};

type OpenModalConfig = {
  id?: string; //선택적으로 ID를 명시
};

class ModalStore {
  #modals: Map<string, ModalState> = new Map();
  #subscribers: Set<() => void> = new Set();
  #cachedModalIds: string[] | null = null;

  // Modal IDs 캐싱
  get modalIds(): string[] {
    if (!this.#cachedModalIds) {
      this.#cachedModalIds = Array.from(this.#modals.keys());
    }
    return this.#cachedModalIds;
  }

  // 전체 변경 알림
  #notify() {
    this.#cachedModalIds = null;
    this.#subscribers.forEach((callback) => callback());
  }

  subscribe(callback: () => void) {
    this.#subscribers.add(callback);
    return () => this.#subscribers.delete(callback);
  }

  // Modal IDs 구독
  getSnapshot() {
    return this.modalIds;
  }

  // 특정 모달 구독
  getModal(id: string): ModalState | undefined {
    return this.#modals.get(id);
  }

  openModal(component: React.ReactNode, config: OpenModalConfig = {}) {
    const id = config.id || generateUniqueId();
    const index = this.#modals.size;
    this.#modals.set(id, { id, component, index, isVisible: true });
    this.#notify();
  }
  // **마지막 모달 닫기** 또는 특정 모달 닫기
  closeModal(id?: string) {
    const targetId = id || Array.from(this.#modals.keys()).at(-1); // 마지막 ID 가져오기
    if (!targetId) return;

    const modal = this.#modals.get(targetId);
    if (modal) {
      modal.isVisible = false; // 상태 변경
      this.#notify();
    }
  }
  // **마지막 모달 제거** 또는 특정 모달 제거
  removeModal(id?: string) {
    const targetId = id || Array.from(this.#modals.keys()).at(-1); // 마지막 ID 가져오기
    if (!targetId) return;

    this.#modals.delete(targetId); // 모달 제거
    this.#notify();
  }

  // 모든 모달 닫기
  closeAllModals() {
    this.#modals.forEach((modal) => {
      modal.isVisible = false; // 모달 상태를 '닫힘'으로 변경
    });
    this.#notify(); // 구독자들에게 변경 알림
  }

  // 모든 모달 제거
  removeAllModals() {
    this.#modals.clear(); // 모든 모달 제거
    this.#notify(); // 구독자들에게 변경 알림
  }
}

export const modalStore = new ModalStore();
