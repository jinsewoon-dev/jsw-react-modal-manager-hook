type TModalConfig = {
  /**딤 효과를 사용할 것인지 여부 */
  useDim: boolean;
  /** 딤을 클릭하면 닫힐지 여부 */
  closeOnDimClick: boolean;
  /** 배경 스크롤 허용 여부 */
  enableBackgroundScroll: boolean;
};
type TModal<T = {}> = {
  child: React.ReactNode;
  config: T;
};
export class Modal<T = {}> {
  static #modals: Set<Modal<any>> = new Set(); // 프라이빗 정적 필드로 모든 Modal 인스턴스를 관리
  #child: React.ReactNode;
  #config: T;
  #isOpen: boolean;
  constructor({ child, config }: TModal<T>) {
    this.#child = child;
    this.#config = config;
    this.#isOpen = false;

    Modal.#modals.add(this);
  }

  open() {
    this.#isOpen = true;
  }

  close() {
    this.#isOpen = false;
  } /** 모달 상태 확인 */
  get isOpen(): boolean {
    return this.#isOpen;
  }

  /** 모달의 자식 콘텐츠 반환 */
  get child(): React.ReactNode {
    return this.#child;
  }

  /** 모달 설정 반환 */
  get config(): T {
    return this.#config;
  }

  /** 모든 Modal 인스턴스를 반환 */
  static getModals(): Modal[] {
    return Array.from(Modal.#modals);
  }

  /** 모든 Modal 인스턴스 닫기 */
  static closeAll(): void {
    Modal.#modals.forEach((modal) => modal.close());
  }
}
