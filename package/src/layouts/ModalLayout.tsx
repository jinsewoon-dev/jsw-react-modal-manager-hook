import { useModal } from "../hooks/useModal";
import { initialConfigValue, initialState } from "../lib/constant";
import { ModalayoutProps } from "../types";

export const Modalayout = ({
  children,
  state = initialState!,
  config = initialConfigValue!,
}: ModalayoutProps) => {
  const { modals, closeModal } = useModal();
  const currentModal = modals[state.index];
  // backgroundColor 로직
  console.log({ currentModal });
  const backgroundColor = (() => {
    const hasDim =
      config.hasDim === undefined
        ? currentModal.config?.hasDim ?? initialConfigValue?.hasDim
        : config.hasDim;
    if (hasDim) {
      // `hasDim`이 true일 경우
      return config.customDimColor ?? initialConfigValue!.customDimColor;
    }
    return "transparent"; // 그 외는 "transparent"
  })();
  return (
    <div
      onClick={() =>
        currentModal.config?.canDimClickCLose ?? config.canDimClickCLose
          ? closeModal()
          : null
      }
      style={{
        zIndex: config.baseZindex + state.index,

        backgroundColor,

        ...(config.initialStyle ?? initialConfigValue!.initialStyle),
      }}
      data-custom-dim-color={
        config.customDimColor ?? initialConfigValue!.customDimColor
      }
      data-has-dim={
        config.hasDim === undefined
          ? currentModal.config?.hasDim ?? initialConfigValue?.hasDim
          : config.hasDim
      }
      data-scrollable={
        config.scrollable === undefined
          ? currentModal.config?.scrollable ?? initialConfigValue?.scrollable
          : config.scrollable
      }
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
