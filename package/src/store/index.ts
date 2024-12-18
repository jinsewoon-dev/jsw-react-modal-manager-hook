// 상태 저장소와 구독 관리
type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  // 상태 읽기
  getState = () => this.state;

  // 상태 업데이트
  setState = (updater: (prevState: T) => T) => {
    this.state = updater(this.state);
    this.notify();
  };
  // //기존 상태와 병합가능함
  // updateState = (updater: (prevState: T) => T) => {
  //   this.state = { ...this.state, ...updater(this.state) }; // 상태 불변성 보장
  //   this.notify();
  // };
  updateState = (updater: (prevState: T) => T) => {
    const nextState = updater(this.state);

    if (Array.isArray(this.state) && Array.isArray(nextState)) {
      // 배열 상태는 그대로 교체
      this.state = nextState as T;
    } else if (
      typeof this.state === "object" &&
      typeof nextState === "object"
    ) {
      // 객체 상태는 병합
      this.state = { ...this.state, ...nextState };
    } else {
      // 단순 값인 경우 대체
      this.state = nextState;
    }

    this.notify();
  };

  // 구독 추가
  subscribe = (listener: Listener<T>) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  // 구독자들에게 상태 변경 알림
  private notify = () => {
    this.listeners.forEach((listener) => listener(this.state));
  };
}

// Store를 생성하는 함수
export const createStore = <T>(initialState: T) => new Store<T>(initialState);
