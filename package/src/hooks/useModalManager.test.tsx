import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useModalManager } from "./useModalManager";

describe("useModalManager", () => {
  it("기본 상태를 반환한다", () => {
    const { result } = renderHook(() => useModalManager());

    expect(result.current.modals).toEqual([]);
    expect(result.current.openModal).toBeInstanceOf(Function);
    expect(result.current.closeModal).toBeInstanceOf(Function);
    expect(result.current.closeAllModals).toBeInstanceOf(Function);
  });

  it("openModal 호출 시 모달을 추가한다", async () => {
    const { result } = renderHook(() => useModalManager());

    await waitFor(() => {
      result.current.openModal(<div>Test Modal</div>);
    });

    expect(result.current.modals).toHaveLength(1);
    expect(result.current.modals[0]).toMatchObject({
      component: expect.any(Object), // ReactNode
      isVisible: true,
    });
  });

  it("closeModal 호출 시 마지막 모달을 닫는다", async () => {
    const { result } = renderHook(() => useModalManager(300)); // 300ms 딜레이 설정

    result.current.openModal(<div>First Modal</div>);
    result.current.openModal(<div>Second Modal</div>);

    await waitFor(() => {
      expect(result.current.modals).toHaveLength(2);
    });

    result.current.closeModal();

    await waitFor(() => {
      expect(result.current.modals[1].isVisible).toBe(false);
    });

    // 300ms 후 모달이 제거되었는지 확인
    await waitFor(
      () => {
        expect(result.current.modals).toHaveLength(1);
      },
      { timeout: 300 }
    );
  });

  it("closeAllModals 호출 시 모든 모달을 닫는다", async () => {
    const { result } = renderHook(() => useModalManager(300));

    result.current.openModal(<div>First Modal</div>);
    result.current.openModal(<div>Second Modal</div>);

    await waitFor(() => {
      expect(result.current.modals).toHaveLength(2);
    });

    result.current.closeAllModals();

    await waitFor(() => {
      result.current.modals.forEach((modal) => {
        expect(modal.isVisible).toBe(false);
      });
    });

    // 300ms 후 모든 모달이 제거되었는지 확인
    await waitFor(
      () => {
        expect(result.current.modals).toHaveLength(0);
      },
      { timeout: 300 }
    );
  });
});
