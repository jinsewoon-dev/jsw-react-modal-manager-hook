const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      flex justify-center items-center
   fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[10000]
  "
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalLayout;
