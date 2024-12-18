import { initialConfigValue } from "../config/initialConfigs";
import { useModal } from "../hooks/useModal";
import { getOrDefault } from "../lib/getOrDefault";
import { logError } from "../lib/logError";
import { ModalayoutProps, TModalLayoutState } from "../model";

const BASE_ZINDEX = 10000;
export const DefaultModalLayout = <T,>({
  children,
  state,
  defaultConfig = { ...initialConfigValue!, baseZindex: BASE_ZINDEX },
}: ModalayoutProps<T>) => {
  const { modals, closeModal } = useModal({
    cleanupDelay: defaultConfig.cleanupDelay,
  });
  const currentModal = modals[state?.index ?? 0];

  if (
    defaultConfig.useDim === undefined ||
    defaultConfig.allowDimClickClose === undefined ||
    defaultConfig.allowBackgroundScroll === undefined
  ) {
    logError({
      type: "설정 오류",
      message:
        "DefaultModalLayout에서 필수값인 useDim,allowDimClickClose,allowBackgroundScroll 값이 제대로 설정되지않았습니다.",
    });
    return;
  }
  // backgroundColor 로직
  const backgroundColor = (() => {
    const hasDimDevalutValue = getOrDefault<boolean>({
      defaultValue: defaultConfig.useDim,
      value: currentModal.config?.useDim,
    });
    const useDim = getOrDefault<boolean>({
      defaultValue: hasDimDevalutValue,
      value: defaultConfig.useDim,
    });

    if (defaultConfig.customDimColor) {
      if (currentModal.config?.useDim === undefined) {
        if (!defaultConfig.useDim) {
          logError({
            type: "설정 오류",
            message:
              "ModalLayout의 defaultConfig에서 hasDim이 false이기 때문에 customDimColor가 표현되지 않습니다.",
          });
        }
      } else {
        if (!currentModal.config?.useDim) {
          logError({
            type: "설정 오류",
            message:
              "useModal의 config에서 hasDim이 false이기 때문에 customDimColor가 표현되지 않습니다.",
          });
        }
      }
    }

    if (useDim) {
      return getOrDefault({
        defaultValue: initialConfigValue!.customDimColor,
        value: defaultConfig.customDimColor,
      });
    }
    return "transparent";
  })();

  console.log({ useDim: currentModal.config?.useDim, backgroundColor });
  return (
    <div
      className={defaultConfig.className}
      onClick={() =>
        currentModal.config?.allowDimClickClose ??
        defaultConfig.allowDimClickClose
          ? closeModal()
          : null
      }
      style={{
        zIndex:
          defaultConfig.baseZindex ?? BASE_ZINDEX + currentModal.state.index,
        backgroundColor,
        ...(defaultConfig.initialStyle ?? initialConfigValue!.initialStyle),
      }}
      data-allow-background-scroll={
        defaultConfig.allowBackgroundScroll === undefined
          ? currentModal.config?.allowBackgroundScroll ??
            initialConfigValue?.allowBackgroundScroll
          : defaultConfig.allowBackgroundScroll
      }
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
