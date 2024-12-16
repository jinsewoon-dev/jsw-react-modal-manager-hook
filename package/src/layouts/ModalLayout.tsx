//  삭제 예정
// export const Modalayout = ({
//   children,
//   state = initialState!,
//   defaultConfig = initialConfigValue,
// }: ModalayoutProps) => {
//   const { modal, closeModal } = useModal();
//   const currentModal = modal;

//   console.log({ modal });
//   // backgroundColor 로직
//   const backgroundColor = (() => {
//     const hasDimDevalutValue = getOrDefault({
//       defaultValue: initialConfigValue.hasDim,
//       value: currentModal.config?.hasDim,
//     });
//     const hasDim = getOrDefault<boolean>({
//       defaultValue: hasDimDevalutValue,
//       value: defaultConfig.hasDim,
//     });

//     if (defaultConfig.customDimColor) {
//       if (currentModal.config?.hasDim === undefined) {
//         if (!defaultConfig.hasDim) {
//           logError({
//             type: "설정 오류",
//             message:
//               "ModalLayout의 defaultConfig에서 hasDim이 false이기 때문에 customDimColor가 표현되지 않습니다.",
//           });
//         }
//       } else {
//         if (!currentModal.config?.hasDim) {
//           logError({
//             type: "설정 오류",
//             message:
//               "useModal의 config에서 hasDim이 false이기 때문에 customDimColor가 표현되지 않습니다.",
//           });
//         }
//       }
//     }

//     if (hasDim) {
//       return getOrDefault({
//         defaultValue: initialConfigValue.customDimColor,
//         value: defaultConfig.customDimColor,
//       });
//     }
//     return "transparent";
//   })();
//   return (
//     <div
//       onClick={() =>
//         currentModal.config?.canDimClickClose ?? defaultConfig.canDimClickClose
//           ? closeModal()
//           : null
//       }
//       style={{
//         zIndex: defaultConfig.baseZindex + state.index,
//         backgroundColor,
//         ...(defaultConfig.initialStyle ?? initialConfigValue!.initialStyle),
//       }}
//       data-scrollable={
//         defaultConfig.scrollable === undefined
//           ? currentModal.config?.scrollable ?? initialConfigValue?.scrollable
//           : defaultConfig.scrollable
//       }
//     >
//       <div onClick={(e) => e.stopPropagation()}>{children}</div>
//     </div>
//   );
// };
