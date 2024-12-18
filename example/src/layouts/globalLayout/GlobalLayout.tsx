import { SidebarProvider } from "@shadcn/components/ui/sidebar";
import AppSidebar from "@templates/appSideBar/AppSidebar";
import { PropsWithChildren } from "react";
const GlobalLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
};

export default GlobalLayout;
