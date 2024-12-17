<style>
      h2 {
    }

  h3 {
    
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
  }

  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  table th {
    color:#030712;
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: center;
  }
    .highlight{
color:#0056b3;background-color:#f0f7ff;padding:2px 6px;border-radius:4px; font-weight:700
    }
    /**
   | Props | 필수여부 | 타입 | 설명 | 초기값 | 
   | -- | :--: | -- | -- | :--: |
    */

</style>

[useSyncExternalStore]: (https://ko.react.dev/reference/react/useSyncExternalStore)

# @jsw/react-modal-manager-hook

React 애플리케이션에서 동적 모달 관리를 간단하게 구현할 수 있도록 설계된 커스텀 훅입니다. 배열 상태로 모달을 관리하며, 다중 모달을 처리할 수 있도록 설계되어 동일한 모달을 중복 렌더링하거나 여러 모달을 동시에 띄우는 것이 가능합니다. 가장 최근에 추가된 모달은 항상 최상단에 표시되며, 단일 모달 닫기와 모든 모달 초기화 기능을 제공합니다. 스타일과 UI는 완전히 커스터마이징할 수 있어 다양한 요구 사항에 유연하게 대응할 수 있습니다.

## 이 라이브러리의 특징 🚀

### **1. 독립적인 전역 상태 관리**

내부 Store 클래스를 통해 외부 라이브러리에 의존하지 않고도 <span class="highlight">Redux, Zustand와 유사한 전역 상태 관리 구조를 구현</span>합니다.

### **2. React 최적화 및 SSR 지원**

React 18+의 [useSyncExternalStore]를 사용해 상태 구독과 <span class="highlight">서버 사이드 렌더링(SSR)</span>을 안정적으로 지원합니다.

### **3. 유연한 확장성과 커스터마이징**

`제네릭 타입(TModalConfig)`을 활용하여 다양한 **모달 설정을 유연하게 정의**할 수 있으며,
`openModal`, `closeModal`, `closeAllModal` 메서드를 통해 직관적이고 간편하게 모달을 제어할 수 있습니다.

<!-- # 특징
>1.	독립적인 상태 관리
	Store 클래스를 통해 전역 상태와 구독을 직접 관리합니다.
	외부 라이브러리에 의존하지 않고도 Redux, Zustand와 같은 구조를 구현할 수 있습니다.
>2.	유연한 구독 및 선택적 상태 반환
	useSyncExternalStore를 사용해 React의 동기적 상태 업데이트와 SSR을 지원합니다.
	selector를 통해 필요한 상태만 반환하므로 성능 최적화가 가능합니다.
>3.	모달 관리의 확장성
	TModalConfig와 제네릭 타입을 통해 다양한 모달 설정과 사용자 정의가 가능합니다.
	openModal, closeModal, closeAllModal 메서드로 간단하고 직관적으로 모달을 제어할 수 있습니다. -->

## 1.ModalProvider

### 사용 방법

`ModalProvider`는 `@jsw/react-modal-manager-hook` 라이브러리의 모달 상태와 컨테이너를 관리하는 **핵심 컴포넌트**입니다. 모든 하위 컴포넌트에서 모달 상태에 접근하려면 <span class="highlight">반드시 ModalProvider로 앱을 감싸야 합니다.</span>

```tsx
import { ModalProvider } from "@jsw/react-modal-manager-hook";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>
);
```

| Props                  | 필수여부 | 타입              | 설명                                                          | 초기값 |
| ---------------------- | :------: | ----------------- | ------------------------------------------------------------- | :----: |
| `children`             |   필수   | `React.ReactNode` | ModalProvider 하위에 렌더링될 React 컴포넌트                  |  없음  |
| `customModalContainer` |   선택   | `React.ReactNode` | 기본 ModalContainer 대신 사용할 커스텀 모달 컨테이너 컴포넌트 |  없음  |

#### customModalContainer 사용 예시

```tsx
import { useModalState } from "@jsw/react-modal-manager-hook";

export const CustomModalContainer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>{modal.content}</Fragment>
  ));
};

//main.tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider customModalContainer={<CustomModalContainer />}>
      <App />
    </ModalProvider>
  </StrictMode>
);
```

`ModalContainer와` `App` 간의 **z-index와 위계 구조를 유연하게 조정할 수 있도록 설계되었습니다.**
상황에 따라 `customModalContainer`를 활용하거나, `App` 및 그 내부 컴포넌트의 구조를 유연하게 구성하여 **모달의 레이아웃과 스타일이 자연스럽게 어우러지도록 설정할 수 있습니다.**

## 2.DefaultModalLayout

`@jsw/react-modal-manager-hook`에서 제공하는 <span class="highlight">기본 ModalLayout 컴포넌트</span>입니다.  
모달 레이아웃의 기본 동작과 스타일을 설정하며, `useModal` 훅과 함께 사용됩니다.

### 사용법

```tsx
import { DefaultModalLayout, useModal } from "@jsw/react-modal-manager-hook";
function App() {
  const { openModal, closeModal } = useModal();
  const handleOpenModal = () => {
    openModal(
      <DefaultModalLayout
        defaultConfig={{
          useDim: true,
          allowDimClickClose: false,
          allowBackgroundScroll: false,
        }}
      >
        <div>
          <h2>Modal Content</h2>
          <button type="button" onClick={closeModal}>
            Close Modal
          </button>
        </div>
      </DefaultModalLayout>
    );
  };
  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        Open Modal
      </button>
    </div>
  );
}
```

`DefaultModalLayout`을 사용자가 유연하게 확장하는 것을 추천합니다.
아래와 같이 `DefaultModalLayout`을 커스텀 컴포넌트로 래핑하면 **반복 설정을 줄이고 재사용성**을 높일 수 있습니다.

```tsx
import { DefaultModalLayout } from "@jsw/react-modal-manager-hook";
const CustomModalLayout = ({ children }: PropsWithChildren) => {
  return (
    <DefaultModalLayout
      defaultConfig={{
        useDim: true,
        allowDimClickClose: true,
        allowBackgroundScroll: false,
      }}
    >
      {children}
    </DefaultModalLayout>
  );
};
```

#### **Props** 테이블

| Props           | 필수여부 | 타입                  | 설명                                              | 초기값 |
| --------------- | :------: | --------------------- | ------------------------------------------------- | :----: |
| `children`      |   선택   | `React.ReactNode`     | DefaultModalLayout 하위에 렌더링될 React 컴포넌트 |  없음  |
| `defaultConfig` |   선택   | `TModalDefaultConfig` | 모달 레이아웃의 기본 설정을 정의하는 객체         |   {}   |

#### **`defaultConfig` 객체 구조**

| Props                       | 필수여부 | 타입                                     | 설명                                             |      초기값       |
| --------------------------- | :------: | ---------------------------------------- | ------------------------------------------------ | :---------------: |
| `baseZindex`                |   선택   | `number`                                 | 모달의 기본 `z-index` 값을 설정합니다.           |      `10000`      |
| `customDimColor`            |   선택   | `React.CSSProperties["backgroundColor"]` | 모달 딤(Dim) 영역의 배경 색상을 설정합니다.      | `rgba(0,0,0,0.5)` |
| `className`                 |   선택   | `string`                                 | 모달 레이아웃에 적용할 커스텀 클래스 이름입니다. |       없음        |
| `initialStyle`              |   선택   | `React.CSSProperties`                    | 초기 스타일을 적용할 수 있는 스타일 객체입니다.  |       없음        |
| `...Required<TModalConfig>` |   필수   | -                                        | `TModalConfig`의 필수 설정값들입니다.            |

1.  기본 설정:
    defaultConfig는 모달의 동작과 스타일을 손쉽게 제어할 수 있도록 기본 설정값을 제공합니다.
2.  커스텀 확장:
    TModalConfig를 통해 필요에 따라 사용자 정의 설정을 확장할 수 있습니다.
3.  유연한 확장:
    DefaultModalLayout을 커스텀 컴포넌트로 래핑하면 일관된 설정과 반복 코드 작성 부담을 줄일 수 있습니다.

## 3.useModal

`useModal`은 `@jsw/react-modal-manager-hook` 라이브러리에서 제공하는 모달 상태 관리를 위한 <span class="highlight">핵심 커스텀 훅</span>입니다. 이 훅을 통해 모달을 열고 닫는 메서드와 현재 모달 상태에 접근할 수 있습니다.

### 사용법

```tsx
import { useModal } from "@jsw/react-modal-manager-hook";

//중첩 모달
const NestedModal = () => {
  const { openModal, closeAllMcloseAllModalsodal } = useModal();
  return (
    <div>
      <h2>Nested Modal Content</h2>
      <button type="button" onClick={closeAllModals}>
        Close Modal
      </button>
    </div>
  );
};

const CustomModalContent = () => {
  const { openModal, closeModal } = useModal();
  const handleNestedModal = () => {
    openModal(<NestedModal />);
  };
  return (
    <div>
      <h2>Modal Content</h2>
      <div>
        <button type="button" onClick={handleNestedModal}>
          Open Nested Modal
        </button>
        <button type="button" onClick={closeModal}>
          Close Modal
        </button>
      </div>
    </div>
  );
};

function App() {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal(
      <CustomModalLayout>
        <CustomModalContent />
      </CustomModalLayout>
    );
  };
  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        Open Modal
      </button>
    </div>
  );
}
```

| 매서드/값        | 타입                                                  | 설명                                    |
| ---------------- | ----------------------------------------------------- | --------------------------------------- |
| `latestModal`    | `TModalObject<T>`                                     | 가장 최근에 열린 **모달 객체**입니다.   |
| `modals`         | `TModalObject<T>[]`                                   | 현재 열린 **모든 모달들의 배열**입니다. |
| `openModal`      | `(content: React.ReactNode, config?: object) => void` | 새로운 모달을 추가합니다.               |
| `closeModal`     | `VoidFunction`                                        | **최상단에 있는 모달**을 닫습니다.      |
| `closeAllModals` | `VoidFunction`                                        | **모든 모달**을 닫습니다.               |

#### 중첩 모달 사용 예
