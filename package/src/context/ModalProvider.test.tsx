import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ModalProvider, useModal } from "./ModalProvider";

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

  it("openModal과 closeModal이 모달 상태를 업데이트한다", async () => {
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
    // 초기 상태 확인
    expect(modalManager?.modals).toHaveLength(0);
    // 모달 열기
    modalManager?.openModal(<div>Test Modal</div>);
    // 상태 업데이트 기다리기
    await waitFor(() => {
      expect(modalManager?.modals).toHaveLength(1);
    });
    // 모달 닫기
    modalManager?.closeModal();
    // 상태 업데이트 기다리기
    await waitFor(() => {
      expect(modalManager?.modals).toHaveLength(0);
    });
  });

  it("openModal과 closeAllModals가 모든 모달을 닫는다", async () => {
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

    // 초기 상태 확인
    expect(modalManager?.modals).toHaveLength(0);

    // 모달 여러 개 열기
    modalManager?.openModal(<div>Modal 1</div>);
    modalManager?.openModal(<div>Modal 2</div>);
    modalManager?.openModal(<div>Modal 3</div>);

    // 상태 업데이트 기다리기
    await waitFor(() => {
      expect(modalManager?.modals).toHaveLength(3);
    });

    // closeAllModals 호출
    modalManager?.closeAllModals();

    // 모든 모달 닫힘 확인
    await waitFor(() => {
      expect(modalManager?.modals).toHaveLength(0);
    });
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
