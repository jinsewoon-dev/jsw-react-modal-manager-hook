import { useModalIds } from "../hooks/useModalIds";
import { useModalById } from "../hooks/useModalById";

export const ModalContainer = () => {
  const modals = useModalIds();
  return modals.map((id) => {
    return <Modal key={id} id={id} />;
  });
};

const Modal = ({ id }: { id: string }) => {
  const modal = useModalById(id);
  return modal?.component;
};
