import { createContext, useContext } from "react";

type ModalStateConfig = {
  useDim?: boolean;
  allowDimClickClose?: boolean;
  allowBackgroundScroll?: boolean;
};

type ModalState = {
  //   component: React.ReactNode; // 렌더링할 컴포넌트
  config?: ModalStateConfig;
};

const ModalContext = createContext<ModalStateConfig | null>(null);

const Root = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ModalStateConfig;
}) => {
  return (
    <ModalContext.Provider value={config}>{children}</ModalContext.Provider>
  );
};

//variant를 가져와서 쓰기위한 훅
const useValue = () => {
  const value = useContext(ModalContext);

  if (!value) {
    throw new Error(
      `[Modal Error]: Overlay,Content 컴포넌트는 Modal.Root 안에서만 사용해야 합니다.`
    );
  }

  return value;
};

const Overlay = () => {
  const config = useValue();

  return <div></div>;
};
const Content = () => {
  const config = useValue();
  return <div></div>;
};

export const Modal = {
  Root,
  Overlay,
  Content,
};
