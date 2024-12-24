import { SidebarProvider, SidebarTrigger } from "@shadcn/components/ui/sidebar";
import AppSidebar from "@templates/appSideBar/AppSidebar";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />{" "}
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;