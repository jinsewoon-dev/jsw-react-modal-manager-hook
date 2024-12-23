import { useModalIds } from "../hooks/useModalIds";
import { useModalById } from "../hooks/useModalById";
import { Fragment } from "react/jsx-runtime";

const ModalContainer = () => {
  const modals = useModalIds();
  return modals.map((id) => {
    const modal = useModalById(id);
    if (!modal?.id) return;
    return <Fragment>{modal?.component}</Fragment>;
  });
};

export default ModalContainer;
