import React, { ComponentPropsWithRef, PropsWithChildren } from "react";

interface ModalOverlayProps extends ComponentPropsWithRef<"div"> {}

const ModalOverlay = ({ ...rest }: ModalOverlayProps) => {
  return <div {...rest} />;
};

export default ModalOverlay;
