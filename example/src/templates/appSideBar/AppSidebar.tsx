import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@shadcn/components/ui/sidebar";
import { ROUTER_PATHS } from "@constants/ROUTER_PATHS";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shadcn/components/ui/collapsible";
import { useState } from "react";
import SidebarCollapsibleMenu from "./components/SidebarCollapsibleMenu";

// Menu items.
const items = [
  {
    title: "Intro",
    url: ROUTER_PATHS.INTRO,
    icon: Home,
  },
  {
    title: "Basic",
    url: ROUTER_PATHS.BASIC,
    icon: Inbox,
  },
  //   {
  //     title: "Calendar",
  //     url: "#",
  //     icon: Calendar,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: Search,
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings,
  //   },
];

const AppSidebar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <SidebarCollapsibleMenu
          categoryData={{
            title: "category",
            icon: Calendar,
          }}
          subMenuData={items}
        />
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
