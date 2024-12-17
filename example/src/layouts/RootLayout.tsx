import AppSideBar from "@components/appSideBar/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@shadcn/components/ui/sidebar";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSideBar />{" "}
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
