import { generateUniqueId } from "../lib/generateUniqueId";
import { ModalState } from "../types";

type OpenModalConfig = {
  id?: string; //선택적으로 ID를 명시
};

export class ModalStore {
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

  getModals() {
    return this.#modals;
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
  // // **마지막 모달 제거** 또는 특정 모달 제거
  // removeModal(id?: string) {
  //   const targetId = id || Array.from(this.#modals.keys()).at(-1); // 마지막 ID 가져오기
  //   if (!targetId) return;

  //   this.#modals.delete(targetId); // 모달 제거
  //   this.#notify();
  // }

  // 모든 모달 닫기
  closeAllModals() {
    this.#modals.forEach((modal) => {
      modal.isVisible = false; // 모달 상태를 '닫힘'으로 변경
    });
    this.#notify(); // 구독자들에게 변경 알림
  }

  // // 모든 모달 제거
  // removeAllModals() {
  //   this.#modals.clear(); // 모든 모달 제거
  //   this.#notify(); // 구독자들에게 변경 알림
  // }

  // 닫힌 모달들 제거
  cleanupModals() {
    this.#modals.forEach((modal, id) => {
      if (!modal.isVisible) {
        this.#modals.delete(id); // 닫힌 모달 제거
      }
    });
    this.#notify(); // 구독자들에게 변경 알림
  }
}

export const modalStore = new ModalStore();
