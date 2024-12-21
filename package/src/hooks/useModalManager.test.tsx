import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ModalProvider, useModal } from "../context/ModalProvider";

describe("ModalProvider와 useModal", () => {
  it("ModalProvider가 Context를 올바르게 제공해야 한다", () => {
    let contextValues: ReturnType<typeof useModal> | undefined;

    const TestComponent = () => {
      contextValues = useModal(); // Context 값 저장
      return <div>Test Component</div>;
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(contextValues).toHaveProperty("modals");
    expect(contextValues).toHaveProperty("openModal");
    expect(contextValues).toHaveProperty("closeModal");
    expect(contextValues).toHaveProperty("closeAllModals");
    expect(contextValues?.modals).toEqual([]); // 초기값 확인
  });

  it("openModal과 closeModal이 모달 상태를 업데이트한다", () => {
    let modalManager: ReturnType<typeof useModal> | undefined;

    const TestComponent = () => {
      modalManager = useModal();
      return null;
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(modalManager?.modals).toHaveLength(0);

    modalManager?.openModal(<div>Test Modal</div>);
    expect(modalManager?.modals).toHaveLength(1);

    modalManager?.closeModal();
    expect(modalManager?.modals).toHaveLength(0);
  });

  it("모달이 children과 함께 렌더링되어야 한다", () => {
    const { container } = render(
      <ModalProvider>
        <div>Children Content</div>
      </ModalProvider>
    );

    expect(container).toHaveTextContent("Children Content");
  });
});
