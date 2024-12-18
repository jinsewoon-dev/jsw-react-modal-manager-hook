import { TModalConfig, useModal } from "@jsw/react-modal-manager-hook";

// 사용자가 정의한 타입
export type CustomModalConfig = {
  type: "modal" | "dialog";
};

export const useCustomModal = () => {
  const modal = useModal<TModalConfig<CustomModalConfig>>({
    cleanupDelay: 300,
  });
  console.log({ modal: modal.lastedModal });
  return { ...modal };
};
