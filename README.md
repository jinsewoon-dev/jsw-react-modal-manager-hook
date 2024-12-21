<!--
| Props | 필수여부 | 타입 | 설명 | 초기값 |
| -- | :--: | -- | -- | :--: |
 -->

<!-- [useSyncExternalStore]: (https://ko.react.dev/reference/react/useSyncExternalStore) -->

# @jinsewoon/react-modal-manager-hook

React 애플리케이션에서 동적 모달 관리를 간단하게 구현할 수 있도록 설계된 커스텀 훅입니다. 배열 상태로 모달을 관리하며, 다중 모달을 처리할 수 있도록 설계되어 동일한 모달을 중복 렌더링하거나 여러 모달을 동시에 띄우는 것이 가능합니다. 가장 최근에 추가된 모달은 항상 최상단에 표시되며, 단일 모달 닫기와 모든 모달 초기화 기능을 제공합니다.

## 이 라이브러리의 특징 🚀

## 1.ModalProvider

### 사용 방법

`ModalProvider`는 `@jsw/react-modal-manager-hook` 라이브러리의 모달 상태와 컨테이너를 관리하는 **핵심 컴포넌트**입니다. 모든 하위 컴포넌트에서 모달 상태에 접근하려면 <span style="color:#0056b3;background-color:#f0f7ff;padding:2px 6px;border-radius:4px; font-weight:700">반드시 ModalProvider로 앱을 감싸야 합니다.</span>

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

| Props      | 필수여부 | 타입              | 설명                                         | 초기값 |
| ---------- | :------: | ----------------- | -------------------------------------------- | :----: |
| `children` |   필수   | `React.ReactNode` | ModalProvider 하위에 렌더링될 React 컴포넌트 |  없음  |

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

`@jsw/react-modal-manager-hook`에서 제공하는 <span style="color:#0056b3;background-color:#f0f7ff;padding:2px 6px;border-radius:4px; font-weight:700">기본 ModalLayout 컴포넌트</span>입니다.  
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
| `children`      |   선택   | `ReactNode`           | DefaultModalLayout 하위에 렌더링될 React 컴포넌트 |  없음  |
| `defaultConfig` |   선택   | `TModalDefaultConfig` | 모달 레이아웃의 기본 설정을 정의하는 객체         |   {}   |

#### **`defaultConfig` 객체 구조**

| Props                              | 필수여부 | 타입                                      | 설명                                             |      초기값       |
| ---------------------------------- | :------: | ----------------------------------------- | ------------------------------------------------ | :---------------: |
| `baseZindex`                       |   선택   | `number`                                  | 모달의 기본 `z-index` 값을 설정합니다.           |      `10000`      |
| `customDimColor`                   |   선택   | `CSSProperties`<br/>`["backgroundColor"]` | 모달 딤(Dim) 영역의 배경 색상을 설정합니다.      | `rgba(0,0,0,0.5)` |
| `className`                        |   선택   | `string`                                  | 모달 레이아웃에 적용할 커스텀 클래스 이름입니다. |       없음        |
| `initialStyle`                     |   선택   | `CSSProperties`                           | 초기 스타일을 적용할 수 있는 스타일 객체입니다.  |       없음        |
| `...Required`<br/>`<TModalConfig>` |   필수   | -                                         | `TModalConfig`의 필수 설정값들입니다.            |

1.  기본 설정:
    defaultConfig는 모달의 동작과 스타일을 손쉽게 제어할 수 있도록 기본 설정값을 제공합니다.
2.  커스텀 확장:
    TModalConfig를 통해 필요에 따라 사용자 정의 설정을 확장할 수 있습니다.
3.  유연한 확장:
    DefaultModalLayout을 커스텀 컴포넌트로 래핑하면 일관된 설정과 반복 코드 작성 부담을 줄일 수 있습니다.

## 3.useModal

`useModal`은 `@jsw/react-modal-manager-hook` 라이브러리에서 제공하는 모달 상태 관리를 위한 <span style="color:#0056b3;background-color:#f0f7ff;padding:2px 6px;border-radius:4px; font-weight:700">핵심 커스텀 훅</span>입니다. 이 훅을 통해 모달을 열고 닫는 메서드와 현재 모달 상태에 접근할 수 있습니다.

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

위 코드에서 `<CustomModalContent/>`과 `<NestedModal/>`은 중첩으로 렌더링 될수있으며 CloseAllModals 매서드를 통해서 모든 모달을 닫을수 있다.

| 매서드/값        | 타입                                                   | 설명                                    |
| ---------------- | ------------------------------------------------------ | --------------------------------------- |
| `latestModal`    | `TModalObject<T>`                                      | 가장 최근에 열린 **모달 객체**입니다.   |
| `modals`         | `TModalObject<T>[]`                                    | 현재 열린 **모든 모달들의 배열**입니다. |
| `openModal`      | `(content: ReactNode,`<br/>` config?: object) => void` | 새로운 모달을 추가합니다.               |
| `closeModal`     | `VoidFunction`                                         | **최상단에 있는 모달**을 닫습니다.      |
| `closeAllModals` | `VoidFunction`                                         | **모든 모달**을 닫습니다.               |

### 제네릭 확장을 통한 커스텀 훅

`useModal`은 제네릭 타입을 지원하므로 **사용자 정의 설정**을 확장할 수 있습니다.
커스텀 훅으로 래핑하면 **타입 안정성**을 유지하면서 유연하게 사용할 수 있습니다.

```tsx
import { TModalConfig, useModal } from "@jsw/react-modal-manager-hook";

// 사용자 정의 모달 설정 타입
export type CustomModalConfig = {
  type: "modal" | "dialog"; // 모달 타입
  animationDuration?: number; // 애니메이션 지속 시간
};

// 커스텀 훅으로 래핑
export const useCustomModal = () => {
  const { latestModal, modals, openModal, closeModal, closeAllModals } =
    //CustomModalConfig을 TModalConfig의 제네릭으로 전달
    useModal<TModalConfig<CustomModalConfig>>();

  return { latestModal, modals, openModal, closeModal, closeAllModals };
};
```

#### 커스텀 훅 사용법

```tsx
import { useCustomModal } from "./useCustomModal";

function App() {
  const { openModal, closeModal } = useCustomModal();

  const handleOpenCustomModal = () => {
    openModal(
      <div>
        <h2>Custom Modal</h2>
        <p>이 모달은 사용자 정의 타입을 사용합니다.</p>
        <button onClick={closeModal}>Close</button>
      </div>,
      { type: "dialog", animationDuration: 300 }
    );
  };

  return (
    <div>
      <button type="button" onClick={handleOpenCustomModal}>
        Open Custom Modal
      </button>
    </div>
  );
}
```

useModal은 모달 상태 관리를 위한 강력한 도구로, 제네릭 타입과 커스텀 훅을 활용해 **확장성과 유연성**을 극대화할 수 있습니다.
**커스텀 설정**을 통해 프로젝트 요구사항에 맞게 모달 시스템을 커스터마이징하세요. 🚀
