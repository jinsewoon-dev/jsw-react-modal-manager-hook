import { ModalayoutProps } from "../model";

export const initialModalConfig = {
  allowDimClickClose: true,
  useDim: true,
  allowBackgroundScroll: false,
};
export const initialConfigValue: Required<ModalayoutProps["defaultConfig"]> = {
  baseZindex: 10000,
  customDimColor: "rgba(0,0,0,0.5)",
  className: "",
  initialStyle: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ...initialModalConfig,
};
