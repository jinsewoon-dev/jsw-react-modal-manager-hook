import { PropsWithChildren } from "react";

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full p-[40px] ">
      <div className="w-[min(960px,calc(100%-80px))] h-full mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
