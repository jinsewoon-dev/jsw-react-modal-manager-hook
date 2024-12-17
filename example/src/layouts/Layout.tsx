import { SidebarProvider } from "@shadcn/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Layout;
