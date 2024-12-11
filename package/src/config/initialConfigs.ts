import { ModalayoutProps } from "../model";

export const initialState: ModalayoutProps["state"] = { id: "uuid", index: 0 };

export const initialModalConfig = {
  canDimClickClose: true,
  hasDim: true,
  scrollable: false,
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
