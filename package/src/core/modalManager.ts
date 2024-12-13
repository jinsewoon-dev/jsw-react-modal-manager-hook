import { Modal } from "./modal";

export class ModalManager {
  delay?: number;
  constructor({ delay }: { delay?: number }) {
    this.delay = delay;
  }
  /** 모든 모달 닫기 */
  closeAllModals(): void {
    if (this.delay) {
      const timer = setTimeout(() => {
        Modal.closeAll();
      }, this.delay);
    } else {
      Modal.closeAll();
    }
  }

  /** 특정 조건에 따라 모달 닫기 */
  closeModalsByCondition(condition: (modal: Modal) => boolean): void {
    Modal.getAllModals().forEach((modal) => {
      if (condition(modal)) {
        this.closeAllModals();
        // modal.close();
      }
    });
  }
}
